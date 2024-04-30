import { ChangeEvent, useRef, useState } from "react";

const useDropzone = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addFile = (file: File) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const deleteFile = (file: File) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== file.name),
    );
  };

  const cleanFiles = () => {
    setFiles([]);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files)
      [...files].forEach((file) => {
        addFile(file);
      });
  };

  const handleDragging = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    handleDragLeave(event);
    const files = event.dataTransfer?.files;

    if (files)
      [...files].forEach((file) => {
        addFile(file);
      });

    if (inputRef?.current && files) {
      inputRef.current.files = files;
    }
  };

  return {
    inputRef,
    files,
    dragging,
    handleDragging,
    handleDragLeave,
    handleDrop,
    deleteFile,
    addFile,
    cleanFiles,
    handleOnChange,
  };
};

export default useDropzone;
