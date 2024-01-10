import { createContext, useContext } from "react";

import { Editor } from "@tiptap/react";

export const EditorContext = createContext<{
  /**
   * Application code (example: "blog")
   */
  appCode: string;

  /**
   * TipTap editor instance
   */
  editor: Editor | null;
}>(null!);

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      `Editor compound components cannot be rendered outside the Editor component`,
    );
  }
  return context;
}
