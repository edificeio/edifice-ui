import { useState } from 'react';

import { Editor } from '@tiptap/react';
import { odeServices } from 'edifice-ts-client';

export const useSpeechRecognition = (editor: Editor | null) => {
  const [isActive, setActive] = useState(false);

  const toggle = () => {
    if (isActive) {
      editor?.commands.stopSpeechRecognition();
      setActive(false);
    } else {
      odeServices.data().trackSpeechAndText('STT');
      const started = editor?.commands.startSpeechRecognition() || false;
      setActive(started);
    }
  };

  const isAvailable =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      ? true
      : false;

  return { isAvailable, isActive, toggle };
};
