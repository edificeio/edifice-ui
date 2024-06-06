import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";

import { UploadCard } from "../../components";
import useUploadFiles from "../../core/useUploadFiles/useUploadFiles";
import { customSize } from "../../utils/fileSize";
import { ImageEditor } from "../ImageEditor";

const Upload = ({
  onFilesChange,
  visibility = "protected",
}: {
  onFilesChange: (uploadedFiles: WorkspaceElement[]) => void;
  visibility?: WorkspaceVisibility;
}) => {
  const {
    files,
    uploadedFiles,
    getUploadStatus,
    uploadFile,
    removeFile,
    updateImage,
    editingImage,
    setEditingImage,
    getUrl,
  } = useUploadFiles({
    handleOnChange: onFilesChange,
    application: "media-library",
    visibility,
  });

  return (
    <>
      {files.map((file) => {
        const resource = uploadedFiles.find(
          (uploadedFile) => uploadedFile.name === file.name,
        );

        const item = {
          name: file.name,
          info: {
            type: file.type,
            weight: customSize(file.size || 0, 1),
          },
          /**
           * WB-3053: timestamp to false to avoid intempestive images download with re-render
           */
          src: getUrl(resource, false),
        };

        return (
          <UploadCard
            key={file.name}
            status={getUploadStatus(file)}
            item={item}
            onEdit={() => setEditingImage(resource)}
            onRetry={() => uploadFile(file)}
            onDelete={() => removeFile(file)}
          />
        );
      })}
      {editingImage && (
        <ImageEditor
          altText={editingImage.alt}
          legend={editingImage.title}
          image={getUrl(editingImage, true)}
          isOpen={!!editingImage}
          onCancel={() => setEditingImage(undefined)}
          onSave={updateImage}
          onError={console.error}
        />
      )}
    </>
  );
};

Upload.displayName = "Upload";

export default Upload;
