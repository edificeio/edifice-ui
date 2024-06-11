/**
 *
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

  const resizeImage = (
    image: HTMLImageElement,
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

      ctx.drawImage(image, 0, 0, width, height);
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
   * Resize and compress Image File
   * @param file  The image file to resize
   * @param maxWidth  The maximum width of the resized image
   * @param maxHeight   The maximum height of the resized image
   * @param compressFormat  The format of the compressed image
   * @param quality   The quality of the compressed image
   * @returns   The resized image file
   */
  const resizeImageFile = async (
    file: File,
    maxWidth: number = 1440,
    maxHeight: number = 1440,
    compressFormat: string = "jpeg",
    quality: number = 80,
  ): Promise<File> => {
    if (file) {
      if (file.type && !file.type.includes("image")) {
        throw Error("File Is NOT Image!");
      } else {
        return new Promise((resolve) => {
          const image = new Image();
          image.setAttribute("style", "max-width: none;");
          image.src = URL.createObjectURL(file);
          image.onload = async () => {
            const resizedFile = await resizeImage(
              image,
              file.name,
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
      }
    } else {
      throw Error("File Not Found!");
    }
  };

  return {
    resizeImageFile,
  };
}
