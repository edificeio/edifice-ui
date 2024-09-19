import { Icon } from '../../..';
import { convertMsToMS } from '../../../utils';
import { PlayState, RecordState } from './useAudioRecorder';

export interface AudioRecorderTimerProps {
  recordState: RecordState;
  playState: PlayState;
  recordTime: number | undefined;
  audioTime: number;
  maxDuration: number;
}

const AudioRecorderTimer = ({
  recordState,
  playState,
  recordTime,
  audioTime,
  maxDuration,
}: AudioRecorderTimerProps) => {
  return (
    <div className="audio-recorder-time my-16 mx-auto">
      {playState === 'IDLE' && (
        <div className="d-flex align-items-center">
          {recordState === 'PAUSED' ? (
            <Icon name="pause" size="12" className="me-8 text-danger" />
          ) : (
            <Icon name="record" size="12" className="me-8 text-danger" />
          )}
          {convertMsToMS(recordState !== 'IDLE' ? recordTime! : 0) +
            ' / ' +
            convertMsToMS(maxDuration)}
        </div>
      )}
      {playState !== 'IDLE' && (
        <div className="d-flex align-items-center mx-auto">
          <Icon name="mic" size="12" className="me-8" />
          {convertMsToMS(audioTime * 1000)} /{convertMsToMS(recordTime!)}
        </div>
      )}
    </div>
  );
};

export default AudioRecorderTimer;
