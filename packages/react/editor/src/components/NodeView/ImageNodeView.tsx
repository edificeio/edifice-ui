import { CustomImage } from "@edifice-tiptap-extensions/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";

const ImageNodeView = (Component: any) =>
  CustomImage.extend({
    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });

export default ImageNodeView;
