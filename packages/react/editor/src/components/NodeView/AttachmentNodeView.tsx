import { Attachment } from "@edifice-tiptap-extensions/extension-attachment";
import { ReactNodeViewRenderer } from "@tiptap/react";

const AttachmentNodeView = (Component: any) =>
  Attachment.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default AttachmentNodeView;
