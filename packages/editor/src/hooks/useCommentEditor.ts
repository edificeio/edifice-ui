import { useEffect, useState } from "react";

import { Hyperlink } from "@edifice-tiptap-extensions/extension-hyperlink";
import { Content, HTMLContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Hook that creates a tiptap editor instance with plugins for editing comments.
 *
 * @param editable truthy if the editor content should be editable
 * @param content default rich content
 */
export const useCommentEditor = (
  editable: boolean,
  content: Content,
  maxLength?: number,
) => {
  const [commentLength, setCommentLength] = useState(0);

  const editor = useEditor({
    editable,
    extensions: [StarterKit, Hyperlink],
    content,
  });

  // When content is updated through props, render it.
  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor]);

  // When editable flag is changing, so does the corresponding editor's property.
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  // When content is updated manually, update the characters counter.
  useEffect(() => {
    function setCounter() {
      const length = editor?.getText().length ?? 0;
      setCommentLength(length);
    }

    editor?.on("update", setCounter);

    return () => {
      editor?.off("update", setCounter);
    };
  }, [editor]);

  // When characters counter changes, undo last action if it is too high.
  useEffect(() => {
    if (!editor || maxLength === undefined) return;

    if (commentLength > maxLength) {
      editor.commands.undo?.();
    }
  }, [editor, commentLength, maxLength]);

  const getComment = () => editor?.getHTML() as HTMLContent;
  const resetComment = () => editor?.commands.setContent(content);

  return { editor, commentLength, getComment, resetComment };
};
