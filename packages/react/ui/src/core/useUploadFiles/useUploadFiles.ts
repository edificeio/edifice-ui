import { useEffect, useState } from "react";

import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";

import { useDropzoneContext } from "../../components/Dropzone/DropzoneContext";
import { useUpload } from "../useUpload";
import { useWorkspaceFile } from "../useWorkspaceFile";

const useUploadFiles = ({
  handleOnChange,
  visibility,
  application,
}: {
  handleOnChange: (uploadedFiles: WorkspaceElement[]) => void;
  visibility?: WorkspaceVisibility;
  application?: string;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<WorkspaceElement[]>([]);
  const [editingImage, setEditingImage] = useState<
    WorkspaceElement | undefined
  >(undefined);

  const { files, deleteFile } = useDropzoneContext();
  const { remove, createOrUpdate } = useWorkspaceFile();
  const { getUploadStatus, clearUploadStatus, uploadFile } = useUpload(
    visibility,
    application,
  );

  useEffect(() => {
    const MAX_UPLOADS_AT_ONCE = 5;
    let numUploads = 0;

    files.forEach((file) => {
      const status = getUploadStatus(file);
      /* Do not upload :
         * the same file twice.
           To upload it again, reset its previous status first.
         * more than 5 files at once.
      */
      if (status || numUploads >= MAX_UPLOADS_AT_ONCE) return;

      (async () => {
        numUploads++;
        const resource = await uploadFile(file);
        if (resource != null) {
          setUploadedFiles((prevFiles: WorkspaceElement[]) => [
            ...prevFiles,
            resource,
          ]);
        }
      })();
    });
  }, [files, getUploadStatus, uploadFile]);

  useEffect(() => {
    handleOnChange(uploadedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  async function removeFile(file: File) {
    const resource = uploadedFiles.find(
      (uploadedFile) => uploadedFile.name === file.name,
    );

    if (resource) {
      await remove(resource);

      clearUploadStatus(file);

      setUploadedFiles((prevFiles: WorkspaceElement[]) => {
        return prevFiles.filter((prevFile) => prevFile.name !== resource?.name);
      });

      deleteFile(file);
    }
  }

  async function updateImage({
    blob,
    legend,
    altText: alt,
  }: {
    blob: Blob;
    legend: string;
    altText: string;
  }) {
    if (!editingImage) {
      return;
    }
    try {
      await createOrUpdate({
        blob,
        legend,
        alt,
        uri: getUrl(editingImage),
      });
    } finally {
      setEditingImage(undefined);
    }
  }
  function getUrl(resource?: WorkspaceElement, timestamp?: boolean) {
    return resource
      ? `/workspace/${
          resource.public ? "pub/" : ""
        }document/${resource?._id}?timestamp=${
          timestamp ? new Date().getTime() : ""
        }`
      : "";
  }
  return {
    /** List of dragged'n'dropped files */
    files,
    getUploadStatus,
    clearUploadStatus,
    uploadedFiles,
    editingImage,
    setEditingImage,
    getUrl,
    updateImage,
    uploadFile,
    removeFile,
  };
};

export default useUploadFiles;
