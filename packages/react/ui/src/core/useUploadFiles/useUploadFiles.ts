import { useEffect, useState } from "react";

import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";

import { useDropzoneContext } from "../../components/Dropzone/DropzoneContext";
import { addTimestampToImageUrl, getOrGenerateBlobId } from "../../utils";
import { useUpload } from "../useUpload";
import { useWorkspaceFile } from "../useWorkspaceFile";
import { useImageResizer } from "../../hooks/useImageResizer";

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

  const { resizeImageFile } = useImageResizer();

  useEffect(() => {
    const MAX_UPLOADS_AT_ONCE = 5;
    let numUploads = 0;

    files.forEach((file) => {
      const status = getUploadStatus(file);
      /* Do not upload :
         - the same file twice.
           To upload it again, reset its previous status first.
         - more than 5 files at once.
      */
      if (status || numUploads >= MAX_UPLOADS_AT_ONCE) return;

      (async () => {
        numUploads++;
        let fileToUpload = file;
        if (file.type.startsWith("image")) {
          try {
            fileToUpload = await resizeImageFile(file);
            getOrGenerateBlobId(fileToUpload, getOrGenerateBlobId(file));
          } catch (err) {
            console.error(err);
          }
        }
        const resource = await uploadFile(fileToUpload);
        if (resource !== null) {
          setUploadedFiles((prevFiles: WorkspaceElement[]) => [
            ...prevFiles,
            resource,
          ]);
        }
      })();
    });
  }, [files, getUploadStatus, resizeImageFile, uploadFile]);

  const sortUploadedFiles = (
    filesArray: File[],
    uploadedFilesArray: WorkspaceElement[],
  ) => {
    const orderMap = filesArray.reduce(
      (acc: any, item: File, index: number) => {
        acc[item.name] = index;
        return acc;
      },
      {},
    );
    return uploadedFilesArray.sort(
      (a: WorkspaceElement, b: WorkspaceElement) =>
        orderMap[a.name] - orderMap[b.name],
    );
  };

  useEffect(() => {
    const sortedUploadedFiles = sortUploadedFiles(files, uploadedFiles);
    handleOnChange(sortedUploadedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  async function removeFile(file: File) {
    // Check if this file was successfully uploaded.
    const resource = uploadedFiles.find(
      (uploadedFile) => uploadedFile.name === file.name,
    );

    // Remove the corresponding resource from `uploadedFiles`
    if (resource) {
      await remove(resource);
      clearUploadStatus(file);
      setUploadedFiles((prevFiles: WorkspaceElement[]) => {
        return prevFiles.filter((prevFile) => prevFile.name !== resource?.name);
      });
    }
    // Remove the file from `files`
    deleteFile(file);
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
      const res = await createOrUpdate({
        blob,
        legend,
        alt,
        uri: getUrl(editingImage),
      });

      /**
       * `res` contains updated file and src path
       * update uploadedFiles with the correct updated information
       */
      if (res && typeof res === "object") {
        setUploadedFiles((prevFiles: WorkspaceElement[]) => {
          return prevFiles.map((prevFile) => {
            if (prevFile._id === res.file._id) {
              return { ...res.file };
            }
            return prevFile;
          });
        });
      }
    } finally {
      setEditingImage(undefined);
    }
  }

  const getUrl = (resource?: WorkspaceElement, timestamp?: boolean) => {
    const url = `/workspace/${
      resource?.public ? "pub/" : ""
    }document/${resource?._id}`;

    if (!resource) return "";
    /**
     * WB-3053: add timestamp if option is true
     */
    if (timestamp) return addTimestampToImageUrl(url);

    return url;
  };

  return {
    /** List of files added from device */
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
