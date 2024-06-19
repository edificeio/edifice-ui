import { useCallback, useEffect, useState } from "react";

import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";

import { useDropzoneContext } from "../../components/Dropzone/DropzoneContext";
import { addTimestampToImageUrl } from "../../utils";
import { useUpload } from "../useUpload";
import { useWorkspaceFile } from "../useWorkspaceFile";
import { useImageResizer } from "../../hooks/useImageResizer";
import useUploadProcess from "./useUploadProcess";

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

  const onSuccess = useCallback(
    (_file: File, document: WorkspaceElement) => {
      setUploadedFiles((previous) => [...previous, document]);
    },
    [setUploadedFiles],
  );

  const { files, deleteFile, replaceFileAt } = useDropzoneContext();
  const { remove, createOrUpdate } = useWorkspaceFile();
  const { getUploadStatus, setUploadStatus, clearUploadStatus, uploadFile } =
    useUpload(visibility, application);

  const { resizeImageFile } = useImageResizer();

  const { launch, cancel } = useUploadProcess({
    onSuccess,
    visibility,
    application,
  });

  // TODO ce useEffect part en boucle.
  // En effet, `files` est modifiée mais après un await, ce qui semble poser problème.
  // Une solution à tester : utiliser un useRef() pour stocker une copie de la liste
  // pour éviter les re-render intempestifs.
  useEffect(() => {
    files.forEach(async (file, index) => {
      const status = getUploadStatus(file);
      if (!status) {
        // This is a new file to upload
        setUploadStatus(file, "idle");
        if (file.type.startsWith("image")) {
          // This is an image, resize it before uploading
          try {
            const replacement = await resizeImageFile(file);
            replaceFileAt(index, replacement);
            file = replacement;
          } catch (err) {
            console.error(err);
          }
        }
        launch(file);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  /** When file finished being uploaded, sort and handle the result. */
  useEffect(() => {
    const sortedUploadedFiles = sortUploadedFiles(files, uploadedFiles);
    handleOnChange(sortedUploadedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

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

  async function removeFile(file: File) {
    // Check if this file was successfully uploaded.
    const resource = uploadedFiles.find(
      (uploadedFile) => uploadedFile.name === file.name,
    );
    // Remove the corresponding resource from `uploadedFiles`
    if (resource) {
      await remove(resource);
      setUploadedFiles((prevFiles: WorkspaceElement[]) => {
        return prevFiles.filter((prevFile) => prevFile.name !== resource?.name);
      });
    }
    // Cancel any pending upload
    cancel(file);
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
