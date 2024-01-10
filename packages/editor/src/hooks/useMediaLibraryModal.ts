import { useCallback, useRef } from "react";

import {
  IExternalLink,
  InternalLinkTabResult,
  MediaLibraryRef,
  MediaLibraryResult,
  MediaLibraryType,
  useWorkspaceFile,
} from "@edifice-ui/react";
import { Editor } from "@tiptap/react";
import { WorkspaceElement } from "edifice-ts-client";

/**
 * Custom hook to manage MediaLibrary events in an editor.
 * @param editor an instance
 * @returns {
 * `ref`: a reference to a MediaLibrary instance,
 * `onCancel`: Cancel event handler,
 * `onSuccess`: Success event handler (adds a formula to the editor content),
 * }
 */
export const useMediaLibraryModal = (editor: Editor | null) => {
  const { remove } = useWorkspaceFile();

  /**
   * Convert the result of a successful action in MediaLibrary
   * - to a call to the editor's dedicated command,
   * or
   * - to an HTML fragment of rich content + insert it.
   *
   * The inital result  depends on the MediaLibrary type.
   */
  const appendResult = useCallback(
    (type: MediaLibraryType, result: MediaLibraryResult) => {
      if (!type || !editor) return;

      switch (type) {
        // Image type => result is of type WorkspaceElement[]
        case "image": {
          const imgs = result as WorkspaceElement[];
          imgs.forEach((img) => {
            editor
              ?.chain()
              .focus()
              .setNewImage({
                src: `/workspace/document/${img._id}`,
                alt: img.alt,
                title: img.title,
                ["media-type"]: "img",
              })
              .run();
          });
          break;
        }

        // Audio type => result is of type WorkspaceElement[]
        case "audio": {
          const sounds =
            typeof result === "object"
              ? [result]
              : (result as WorkspaceElement[]);
          sounds.forEach((snd) => {
            editor
              ?.chain()
              .focus()
              .setAudio(snd._id || "", `/workspace/document/${snd._id}`);
          });
          break;
        }

        // Video type => result is of type WorkspaceElement[] or string
        case "video": {
          if (typeof result === "string") {
            // This is a video Embedded code (iframe from trusted media provider)
            editor?.commands.insertContentAt(
              editor.view.state.selection,
              result,
            );
          } else {
            const videos = result as WorkspaceElement[];
            videos.forEach((video) => {
              editor
                ?.chain()
                .focus()
                .setVideo(
                  video._id || "",
                  `/workspace/document/${video._id}`,
                  true,
                );
            });
          }
          break;
        }

        case "attachment": {
          let innerHtml = "";
          for (let i = 0; i < result.length; i++) {
            innerHtml += `<a href="/workspace/document/${
              (result as WorkspaceElement[])[i]._id
            }">${(result as WorkspaceElement[])[i].name}
            </a>`;
          }
          const richContent = `<div class="attachments">
            ${innerHtml}
          </div>`;
          editor?.commands.insertContentAt(
            editor.view.state.selection,
            richContent,
          );
          editor?.commands.enter();
          break;
        }

        case "hyperlink": {
          const resourceTabResult = result as InternalLinkTabResult;
          // Cancel any pre-selected link
          if (editor?.isActive("linker")) editor.commands.unsetLinker();
          if (editor?.isActive("hyperlink"))
            editor.commands.toggleMark("hyperlink");

          // Manage new links
          editor?.commands.focus();
          if (
            editor.state.selection.empty &&
            Array.isArray(resourceTabResult.resources)
          ) {
            // One or more internal link(s) are rendered as a Badge.
            resourceTabResult.resources.forEach((link) => {
              editor?.commands.setLinker({
                href: link.path,
                "data-app-prefix": link.application,
                "data-id": link.assetId,
                target: resourceTabResult.target ?? null,
                title: link.name,
              });
              // Add next links afterward.
              if (
                resourceTabResult &&
                resourceTabResult.resources &&
                resourceTabResult.resources.length > 1
              ) {
                editor.commands.enter();
              }
            });
          } else {
            // Links are rendered as Hyperlinks
            // Utility function
            const insertAndSelectText = (name?: string) => {
              if (!name) return;
              const from = editor.state.selection.head;
              const to = from + name.length;
              editor
                ?.chain()
                .insertContent(name)
                .setTextSelection({ from, to })
                .run();
            };

            // *** Case of internal links ***
            if (Array.isArray(resourceTabResult.resources)) {
              if (editor.state.selection.empty) {
                // No text is currently selected.
                // => Insert the name of the first link and select it.
                insertAndSelectText(resourceTabResult.resources[0].name);
              }

              resourceTabResult.resources.forEach((link) => {
                // Add a hyperlink to the selection.
                editor?.commands.setLink({
                  href: link.path,
                  target: resourceTabResult.target ?? null,
                });
                // Cancel selection, so that next links are added afterward.
                const newPosition = editor.state.selection.head;
                editor.commands.setTextSelection({
                  from: newPosition,
                  to: newPosition,
                });
                // Newline needed, unless it is the last link.
                if (
                  resourceTabResult?.resources &&
                  resourceTabResult?.resources?.length > 1
                ) {
                  editor.commands.enter();
                }
              });
            } else {
              // *** Case of external link ***
              const { url, target, text } = result as IExternalLink;
              if (editor.state.selection.empty) {
                // No text is currently selected.
                // => Insert the name of the link and select it.
                insertAndSelectText(text);
              }
              editor?.commands.setLink({
                href: url,
                title: text,
                target,
              });
            }
          }
          break;
        }

        case "embedder": {
          editor?.commands.insertContentAt(editor.view.state.selection, result);
          editor?.commands.enter();
          break;
        }

        default:
          return `<div>[TipTap/toRichContent] Le contenu de type "${type}" n'est pas convertissable pour l'instant !</div>`;
      }
    },
    [editor],
  );

  const mediaLibraryRef = useRef<MediaLibraryRef>(null);

  //----- Handlers
  const onCancel = async (uploads?: WorkspaceElement[]) => {
    if (mediaLibraryRef.current?.type && uploads && uploads.length > 0) {
      await remove(uploads);
    }
    mediaLibraryRef.current?.hide();
  };
  const onSuccess = (result: MediaLibraryResult) => {
    if (mediaLibraryRef.current?.type) {
      // Inject the MediaLibrary result into the editor, and close the modal.
      appendResult(mediaLibraryRef.current.type, result);
      mediaLibraryRef.current?.hide();
    }
  };

  return {
    ref: mediaLibraryRef,
    onCancel,
    onSuccess,
  };
};
