import { ReactNode, useMemo } from "react";

import clsx from "clsx";

import { DropzoneContext } from "./DropzoneContext";
import DropzoneDrag from "./DropzoneDrag";
import DropzoneFile from "./DropzoneFile";
import DropzoneImport from "./DropzoneImport";
import useDropzone from "../../hooks/useDropzone/useDropzone";

interface DropzoneProps {
  className?: string;
  accept?: string[];
  multiple?: boolean;
  handle?: boolean;
  children?: ReactNode;
}

const Dropzone = ({
  className,
  accept,
  multiple = true,
  handle = false,
  children,
}: DropzoneProps) => {
  const {
    inputRef,
    dragging,
    files,
    addFile,
    deleteFile,
    handleDragLeave,
    handleDragging,
    handleDrop,
    handleOnChange,
  } = useDropzone();

  const classes = clsx(
    "dropzone",
    {
      "is-dragging": dragging,
      "is-drop-files": files.length !== 0 && !handle ? false : true,
    },
    className,
  );

  const value = useMemo(
    () => ({
      inputRef,
      files,
      addFile,
      deleteFile,
    }),
    [addFile, deleteFile, files, inputRef],
  );

  return (
    <DropzoneContext.Provider value={value}>
      <div
        className={classes}
        onDragEnter={handleDragging}
        onDragOver={handleDragging}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="align-center">
          {!handle ? (
            <>
              <Dropzone.File>{children}</Dropzone.File>
              <Dropzone.Import />
            </>
          ) : null}
          <Dropzone.Drag />
        </div>
        <input
          ref={inputRef}
          accept={accept?.join(",")}
          multiple={multiple}
          type="file"
          name="attachment-input"
          id="attachment-input"
          onChange={handleOnChange}
          hidden
        />
      </div>
    </DropzoneContext.Provider>
  );
};

Dropzone.File = DropzoneFile;
Dropzone.Import = DropzoneImport;
Dropzone.Drag = DropzoneDrag;

Dropzone.displayName = "Dropzone";

export default Dropzone;
