import { WorkspaceElement } from "edifice-ts-client";

import { Dropzone } from "../../../components/Dropzone";
import { UploadFiles } from "../../UploadFiles";
import { MediaLibraryType } from "../MediaLibrary";
import { useMediaLibraryContext } from "../MediaLibraryContext";

const acceptedTypes = (type: MediaLibraryType) => {
  const acceptedTypes = [];

  switch (type) {
    case "audio":
      acceptedTypes.push("audio/mp3");
      acceptedTypes.push("video/mp4");
      break;
    case "video":
      acceptedTypes.push("video/*");
      break;
    case "image":
      acceptedTypes.push("image/*");
      break;
    default:
      break;
  }
  return acceptedTypes;
};

export const Upload = () => {
  const {
    type,
    visibility,
    multiple,
    setResult,
    setResultCounter,
    addCancellable,
  } = useMediaLibraryContext();

  const handleOnFilesChange = (uploadedFiles: WorkspaceElement[]) => {
    if (uploadedFiles.length) {
      // Uploaded files are subject to cancel action
      addCancellable(uploadedFiles);
      // Uploaded files are subject to success action
      setResultCounter(uploadedFiles.length);
      setResult(uploadedFiles);
    } else {
      setResultCounter(undefined);
      setResult(undefined);
    }
  };

  return (
    <div className="py-8 flex-grow-1">
      <Dropzone multiple={multiple} accept={acceptedTypes(type ?? "embedder")}>
        <UploadFiles
          onFilesChange={handleOnFilesChange}
          visibility={visibility}
        />
      </Dropzone>
    </div>
  );
};
