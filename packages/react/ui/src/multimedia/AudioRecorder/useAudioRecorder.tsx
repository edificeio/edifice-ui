import { useCallback, useEffect, useReducer, useRef } from "react";

import {
  Pause,
  PlayFilled,
  Record,
  RecordPause,
  Refresh,
  Restart,
  Save,
} from "@edifice-ui/icons";
import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import { ToolbarItem } from "../../components";
import { useWorkspaceFile } from "../../core";

export type RecordState =
  | "IDLE"
  | "RECORDING"
  | "PAUSED"
  | "RECORDED"
  | "SAVING"
  | "SAVED";

export type PlayState = "IDLE" | "PLAYING" | "PAUSED";

type AudioReducerState = {
  recordState: RecordState;
  playState: PlayState;

  mediaRecorder?: MediaRecorder;
  micStream?: MediaStream;
  audioChunks: Blob[];
  recordedTime?: number;
  recordingTime?: number;

  encoderWorker?: Worker;

  // max duration in s (3 minutes by default)
  maxDuration: number;
};

export default function useAudioRecorder(
  onSaveSuccess?: (resource: WorkspaceElement) => void,
  onUpdateRecord?: (audioUrl?: string) => void,
  hideSaveAction: boolean = false,
  visibility: WorkspaceVisibility = "protected",
  application: string = "media-library",
) {
  function audioReducer(
    state: AudioReducerState,
    action: {
      updatedState?: Partial<AudioReducerState>;
    },
  ): AudioReducerState {
    return { ...state, ...action.updatedState };
  }

  const [
    {
      recordState,
      playState,
      mediaRecorder,
      micStream,
      audioChunks,
      maxDuration,
      recordedTime,
      recordingTime,
      encoderWorker,
    },
    dispatch,
  ] = useReducer(audioReducer, {
    recordState: "IDLE",
    playState: "IDLE",
    audioChunks: [],
    maxDuration: 180000, // max duration in s (3 minutes by default)
  });
  const audioNameRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { t } = useTranslation();

  const { create } = useWorkspaceFile();

  const BUFFER_SIZE: number = 512;
  const DEFAULT_SAMPLE_RATE: number = 48000;

  function initEncoderWorker() {
    const encoderWorker = new Worker("/infra/public/js/audioEncoder.js");
    dispatch({
      updatedState: { encoderWorker: encoderWorker },
    });
    encoderWorker.postMessage(["init", DEFAULT_SAMPLE_RATE]);
  }

  useEffect(() => {
    initEncoderWorker();

    return () => {
      // Close opened audio stream and clean channels
      closeAudioStream();
      encoderWorker?.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recordState === "RECORDING" && mediaRecorder?.state === "recording") {
      const startedAt = Date.now();
      const timer = window.setInterval(
        // Compute exact elapsed time by diffing the start time.
        () =>
          dispatch({
            updatedState: {
              recordingTime: Date.now() - startedAt,
            },
          }),
        500,
      );
      return () => window.clearInterval(timer);
    }
  }, [recordState, mediaRecorder?.state]);

  useEffect(() => {
    if (recordState === "PAUSED" && recordingTime) {
      dispatch({
        updatedState: {
          recordedTime: (recordedTime || 0) + recordingTime,
          recordingTime: 0,
        },
      });
    }
  }, [recordState, recordedTime, recordingTime]);

  /**
   * Close opened audio stream and clean channels
   */
  const closeAudioStream = useCallback(() => {
    // Close audio stream
    micStream?.getTracks().forEach((track) => track.stop());
  }, [micStream]);

  const handleRecord = useCallback(async () => {
    if (recordState === "PAUSED") {
      dispatch({
        updatedState: { recordState: "RECORDING", playState: "IDLE" },
      });
      mediaRecorder?.resume();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      const micStream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      dispatch({
        updatedState: { micStream },
      });

      // Create the microphone recorder
      const mediaRecorder = new MediaRecorder(micStream);
      dispatch({
        updatedState: {
          mediaRecorder,
          recordState: "RECORDING",
          playState: "IDLE",
          recordedTime: 0,
          audioChunks: [] as Blob[], // Reset audio chunks
        },
      });
      mediaRecorder.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        audioChunks.push(event.data);
        dispatch({ updatedState: { audioChunks } });
      };

      mediaRecorder.start(BUFFER_SIZE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordState, audioRef, micStream, audioChunks, mediaRecorder]);

  const handleRecordPause = useCallback(async () => {
    dispatch({ updatedState: { recordState: "PAUSED", playState: "IDLE" } });
    mediaRecorder?.pause();

    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }
    if (onUpdateRecord) {
      onUpdateRecord(audioUrl);
    }
  }, [mediaRecorder, audioChunks, onUpdateRecord]);

  const handlePlay = useCallback(() => {
    dispatch({ updatedState: { playState: "PLAYING" } });
    if (audioRef?.current?.currentTime) {
      audioRef.current.play();
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [audioRef]);

  const handlePlayPause = useCallback(() => {
    audioRef?.current?.pause();
    dispatch({ updatedState: { playState: "PAUSED" } });
  }, [audioRef]);

  const handleReset = useCallback(() => {
    dispatch({
      updatedState: {
        playState: "IDLE",
        recordState: "IDLE",
        audioChunks: [],
        mediaRecorder: undefined,
      },
    });

    if (onUpdateRecord) {
      onUpdateRecord(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeAudioStream, onUpdateRecord]);

  async function getAudioBufferFromChunk(audioChunks: Blob[]) {
    const audioBlob = new Blob(audioChunks, {
      type: "audio/webm;codecs=opus",
    });
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext();
    return await audioContext.decodeAudioData(arrayBuffer);
  }

  const handleSave: () => Promise<WorkspaceElement | undefined> =
    useCallback(async () => {
      const audioName = audioNameRef.current?.value;
      if (!audioName) {
        console.error("Audio name is required");
        return;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      dispatch({ updatedState: { recordState: "SAVING", playState: "IDLE" } });
      const audioBuffer = await getAudioBufferFromChunk(audioChunks);

      return new Promise<WorkspaceElement | undefined>((resolve, reject) => {
        try {
          if (encoderWorker) {
            encoderWorker.postMessage([
              "mp3",
              [audioBuffer.getChannelData(0)],
              audioBuffer.numberOfChannels > 1
                ? [audioBuffer.getChannelData(1)]
                : [audioBuffer.getChannelData(0)],
              audioBuffer.length,
            ]);

            encoderWorker.onmessage = async (event: MessageEvent) => {
              if (event.data instanceof Blob) {
                const file = new File([event.data], audioName!, {
                  type: "audio/mp3",
                });

                const resourceAudio = await create(file, {
                  application,
                  visibility,
                });

                if (resourceAudio && onSaveSuccess) {
                  onSaveSuccess(resourceAudio);
                }

                dispatch({
                  updatedState: { recordState: "SAVED" },
                });

                resolve(resourceAudio);
              }
            };
          }
        } catch (error) {
          dispatch({
            updatedState: { playState: "IDLE", recordState: "IDLE" },
          });
          console.error("Error while saving", error);
          reject();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      recordState,
      onSaveSuccess,
      closeAudioStream,
      audioChunks,
      audioNameRef,
    ]);

  const handlePlayStop = useCallback(() => {
    // Stop Playing the record
    if (audioRef?.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    dispatch({ updatedState: { playState: "IDLE" } });
  }, [audioRef]);

  const handlePlayEnded = useCallback(() => {
    dispatch({ updatedState: { playState: "PAUSED" } });
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [audioRef]);

  /**
   * Auto-stop recording when max allowed duration is reached.
   */
  useEffect(() => {
    if (
      recordState === "RECORDING" &&
      recordedTime &&
      recordedTime >= maxDuration
    ) {
      handleRecordPause();
    }
  }, [handleRecordPause, maxDuration, recordState, recordedTime]);

  const recordText =
    recordState === "IDLE"
      ? t("bbm.audio.record.start")
      : t("bbm.audio.record.resume");

  const toolbarItems: ToolbarItem[] = [
    {
      type: "icon",
      name: "record",
      visibility: recordState === "RECORDING" ? "hide" : "show",
      props: {
        icon: <Record />,
        color: "danger",
        disabled:
          recordState !== "IDLE" &&
          recordState !== "PAUSED" &&
          (!recordedTime || recordedTime >= maxDuration),
        onClick: handleRecord,
        "aria-label": recordText,
      },
      tooltip: recordText,
    },
    {
      type: "icon",
      name: "recordPause",
      visibility: recordState === "RECORDING" ? "show" : "hide",
      props: {
        icon: <RecordPause />,
        color: "danger",
        disabled: recordState !== "RECORDING",
        onClick: handleRecordPause,
        "aria-label": t("bbm.audio.record.pause"),
      },
      tooltip: t("bbm.audio.record.pause"),
    },
    { type: "divider" },
    {
      type: "icon",
      name: "play",
      visibility: playState === "PLAYING" ? "hide" : "show",
      props: {
        icon: <PlayFilled />,
        disabled:
          recordState !== "RECORDED" &&
          recordState !== "PAUSED" &&
          recordState !== "SAVED" &&
          playState !== "PAUSED",
        onClick: handlePlay,
        "aria-label": t("bbm.audio.play.start"),
      },
      tooltip: t("bbm.audio.play.start"),
    },
    {
      type: "icon",
      name: "playPause",
      visibility: playState === "PLAYING" ? "show" : "hide",
      props: {
        icon: <Pause />,
        disabled: playState !== "PLAYING",
        onClick: handlePlayPause,
        "aria-label": t("bbm.audio.play.pause"),
      },
      tooltip: t("bbm.audio.play.pause"),
    },
    {
      type: "icon",
      name: "stop",
      props: {
        icon: <Restart />,
        disabled: playState !== "PLAYING" && playState !== "PAUSED",
        onClick: handlePlayStop,
        "aria-label": t("bbm.audio.play.stop"),
      },
      tooltip: t("bbm.audio.play.stop"),
    },
    { type: "divider" },
    {
      type: "icon",
      name: "reset",
      props: {
        icon: <Refresh />,
        disabled:
          recordState !== "RECORDED" &&
          playState !== "PLAYING" &&
          playState !== "PAUSED" &&
          recordState !== "PAUSED",
        onClick: handleReset,
        "aria-label": t("bbm.audio.record.reset"),
      },
      tooltip: t("bbm.audio.record.reset"),
    },
    {
      type: "icon",
      name: "save",
      visibility: hideSaveAction ? "hide" : "show",
      props: {
        icon: <Save />,
        disabled:
          (recordState !== "RECORDED" &&
            recordState !== "PAUSED" &&
            playState !== "PLAYING" &&
            playState !== "PAUSED") ||
          recordState === "SAVED" ||
          !audioNameRef.current?.value,
        onClick: handleSave,
        "aria-label": t("bbm.audio.record.save"),
      },
      tooltip: t("bbm.audio.record.save"),
    },
  ];

  return {
    recordState,
    playState,
    recordtime: (recordedTime || 0) + (recordingTime || 0),
    maxDuration: maxDuration,
    audioRef,
    audioNameRef,
    toolbarItems,
    handlePlayEnded,
    handleSave,
  };
}
