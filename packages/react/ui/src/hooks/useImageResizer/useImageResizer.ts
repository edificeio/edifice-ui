import decode from "heic-decode";

/**
 * @module useImageResizer
 * @description This module provides a hook to resize and compress image files.
 * @returns all the action available for the image resizer
 */
export default function useImageResizer() {
  const changeHeightWidth = (
    height: number,
    maxHeight: number,
    width: number,
    maxWidth: number,
  ) => {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
    return { height, width };
  };

  const renameFileNameExtension = (filename: string, newExtension: string) => {
    const filenameParts = filename.split(".");
    filenameParts.pop();
    return filenameParts.join(".") + "." + newExtension;
  };

  const resizeImage = (
    image: ImageData | HTMLImageElement,
    fileName: string,
    maxWidth: number,
    maxHeight: number,
    compressFormat = "jpeg",
    quality = 80,
  ): Promise<File> => {
    const qualityDecimal = quality / 100;
    const canvas = document.createElement("canvas");
    const contentType = `image/${compressFormat}`;

    let width = image.width;
    let height = image.height;

    const newHeightWidth = changeHeightWidth(
      height,
      maxHeight,
      width,
      maxWidth,
    );

    width = newHeightWidth.width;
    height = newHeightWidth.height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = width;
      canvas.height = height;

      if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
        ctx.imageSmoothingQuality = "high";
      }

      if (image instanceof ImageData) {
        ctx.putImageData(image, width, height);
      } else {
        ctx.drawImage(image, 0, 0, width, height);
      }
    }
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              new File([blob], fileName, {
                type: contentType,
                lastModified: new Date().getTime(),
              }),
            );
          } else {
            reject();
          }
        },
        contentType,
        qualityDecimal,
      );
    });
  };

  /**
   * Resize and compress Image File in JPEG format (other format don't work well with canvas.toBlob() with quality parameter)
   * @param file  The image file to resize
   * @param maxWidth  The maximum width of the resized image
   * @param maxHeight   The maximum height of the resized image
   * @param quality   The quality of the compressed image
   * @returns   The resized image file
   */
  const resizeImageFile = async (
    file: File,
    maxWidth: number = 1440,
    maxHeight: number = 1440,
    quality: number = 80,
  ): Promise<File> => {
    if (!file) throw Error("Image resizer: file not found!");

    if (
      !file.type.startsWith("image/") &&
      !file.name.endsWith(".heic") &&
      !file.name.endsWith(".heif")
    )
      throw Error("Image resizer: the file given is not an image.");

    const compressFormat = "jpeg";

    if (
      file.type.startsWith("image/heic") ||
      file.type.startsWith("image/heif") ||
      file.name.endsWith(".heic") ||
      file.name.endsWith(".heif")
    ) {
      const inputBuffer = new Uint8Array(await file.arrayBuffer());
      const { data, height, width } = await decode({
        buffer: inputBuffer, // the HEIC file buffer
      });
      const image = new ImageData(new Uint8ClampedArray(data), width, height);
      const resizedFile = await resizeImage(
        image,
        renameFileNameExtension(file.name, compressFormat),
        maxWidth,
        maxHeight,
        compressFormat,
        quality,
      );
      return new Promise((resolve) => {
        resolve(resizedFile);
      });
    }

    return new Promise((resolve) => {
      const image = new Image();
      image.setAttribute("style", "max-width: none;");
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        const resizedFile = await resizeImage(
          image,
          renameFileNameExtension(file.name, compressFormat),
          maxWidth,
          maxHeight,
          compressFormat,
          quality,
        );
        resolve(resizedFile);
      };
      image.onerror = (error) => {
        throw Error("Image Loading Error: " + error);
      };
    });
  };

  return {
    resizeImageFile,
  };
}
