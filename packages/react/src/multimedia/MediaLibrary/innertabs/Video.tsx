import { useRef } from "react";

import { useTranslation } from "react-i18next";

import { VideoRecorder } from "../../VideoRecorder";
import { VideoRecorderRef } from "../../VideoRecorder/VideoRecorder";
import { useMediaLibraryContext } from "../MediaLibraryContext";

export const Video = () => {
  const { appCode, setResult, setOnSuccessAction } = useMediaLibraryContext();
  const { t } = useTranslation();
  const ref = useRef<VideoRecorderRef>(null);

  const handleRecordUpdated = (recordUrl?: string) => {
    if (recordUrl) {
      setResult(recordUrl);
      setOnSuccessAction(() => ref.current!.save);
    } else {
      setResult();
    }
  };

  const handleError = (err: string) => {
    console.error(err);
  };

  return (
    <VideoRecorder
      ref={ref}
      appCode={appCode}
      caption={t("video.caption")}
      onRecordUpdated={handleRecordUpdated}
      onError={handleError}
      hideSaveAction={true}
    ></VideoRecorder>
  );
};
