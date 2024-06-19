import { useCallback, useEffect, useState } from "react";

import { WorkspaceElement, WorkspaceVisibility } from "edifice-ts-client";

import { useUpload } from "../useUpload";
import { useWorkspaceFile } from "../useWorkspaceFile";

// Do not upload more than 5 files at once.
const UPLOAD_SLOTS = 5;

const useUploadProcess = ({
  onSuccess,
  onError,
  visibility,
  application,
}: {
  visibility?: WorkspaceVisibility;
  application?: string;
  onSuccess?: (uploadedFile: File, resultingDocument: WorkspaceElement) => void;
  onError?: (uploadedFile: File) => void;
}) => {
  const [idle, setIdle] = useState<File[]>([]);
  const [loading, setLoading] = useState<File[]>([]);
  const [cancelled, setCancelled] = useState<File[]>([]);

  const { getUploadStatus, setUploadStatus, clearUploadStatus, uploadFile } =
    useUpload(visibility, application);

  const { remove } = useWorkspaceFile();

  // TODO SUPPRIMER LES console.log une fois que ça marchera !

  const launch = useCallback(
    (file: File) => {
      console.log(`launch ${(file as any)["virtualID"]}, ${file.name}`);
      // Adding an idle or loading file will trigger a side effect
      if (loading.length >= UPLOAD_SLOTS) {
        setIdle((previous) => [...previous, file]);
      } else {
        setLoading((previous) => [...previous, file]);
      }
    },
    [loading.length],
  );

  const cancel = async (file: File) => {
    console.log(`cancel ${(file as any)["virtualID"]}`);
    const sameListMinusFile = (previous: File[]) =>
      previous.filter((f) => !Object.is(f, file));
    const status = getUploadStatus(file);
    switch (status) {
      case "loading": {
        // Files currently loading have to wait for upload to finish.
        setCancelled((previous) => [...previous, file]);
        break;
      }
      case "idle":
        setIdle(sameListMinusFile);
        break;
    }
    clearUploadStatus(file);
  };

  // Manage end of loading
  const loadingDone = useCallback(
    (file: File, resource: WorkspaceElement | null) => {
      console.log("loadingDone");

      const sameListMinusFile = (previous: File[]) =>
        previous.filter((f) => !Object.is(f, file));

      // Remove from loading list
      setLoading(sameListMinusFile);
      // Check for a cancellation during the upload.
      if (cancelled.findIndex((f) => Object.is(f, file)) >= 0) {
        if (resource) {
          remove(resource);
        }
        clearUploadStatus(file);
        setCancelled(sameListMinusFile);
      } else {
        // Notify success or error
        resource == null ? onError?.(file) : onSuccess?.(file, resource);
      }

      // A slot is now free, any idle file must be treated now.
      setIdle((previous) => {
        const [nextFile, ...restIdle] = previous;
        if (nextFile) launch(nextFile);
        return restIdle;
      });

      console.log(
        `idle=${idle.length}, loading=${loading.length}, cancel=${cancelled.length}`,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelled, onError, onSuccess],
  );

  // Manage idle list
  useEffect(() => {
    console.log("useEffect idle");
    idle.forEach((file) => setUploadStatus(file, "idle"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle]);

  // Manage loading list
  useEffect(() => {
    console.log("useEffect loading");
    loading.forEach((file) => {
      const status = getUploadStatus(file);
      // If not loading yet
      if (!status || status === "idle") {
        // then start an upload, but DO NOT AWAIT the resulting document.
        uploadFile(file).then((resource) => loadingDone(file, resource));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return { launch, cancel };
};

export default useUploadProcess;
