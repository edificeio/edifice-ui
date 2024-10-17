import { Video } from '@edifice.io/tiptap-extensions';
import { ReactNodeViewRenderer } from '@tiptap/react';

const VideoNodeView = (Component: any) =>
  Video.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default VideoNodeView;
