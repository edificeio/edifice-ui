import * as PIXI from "pixi.js";

//Define the default name of the sprite in the PIXI.Application context
export const DEFAULT_SPRITE_NAME = "image";

/**
 * A structure that define all setting of an image
 * - positon
 * - scale
 * - size
 * - size of the stage
 */
export interface ImageSettings {
  stage: {
    size: { width: number; height: number };
    scale: { x: number; y: number };
  };
  sprite: {
    rotation: number;
    size: { width: number; height: number };
    scale: { x: number; y: number };
    position: { x: number; y: number };
    anchor: { x: number; y: number };
  };
}
/**
 *  This function update the image content using Blob datasource
 *
 * @param application the PIXI.Application context
 * @param param.spriteName the name of the sprite in the context
 * @param param.imgDatasource the img data could be one of: string url, HTMLImageElement, PIXI.Sprite
 * @param param.stageSize?: { width: number; height: number };
 * @param param.spriteSize?: { width: number; height: number };
 */
export function updateImageFromBlob(
  application: PIXI.Application,
  {
    spriteName,
    imgDatasource,
    settings,
  }: {
    spriteName: string;
    imgDatasource: Blob;
    settings?: ImageSettings;
  },
): Promise<PIXI.Sprite | null> {
  const imageUrl = URL.createObjectURL(imgDatasource);
  const image = new Image();
  image.src = imageUrl;
  return new Promise<PIXI.Sprite | null>((resolve) => {
    image.onload = async () => {
      await updateImage(application, {
        spriteName,
        imgDatasource: image,
        settings,
      });

      // get new sprite
      const newSprite = application?.stage.getChildByName(
        spriteName,
        true,
      ) as PIXI.Sprite | null;
      resolve(newSprite);
    };
  });
}
/**
 *  This function update the image content for the sprite in the PIXI.Application context
 *
 * @param application the PIXI.Application context
 * @param param.spriteName the name of the sprite in the context
 * @param param.imgDatasource the img data could be one of: string url, HTMLImageElement, PIXI.Sprite
 * @param param.spriteSize
 * @param param.stageSize
 */
export async function updateImage(
  application: PIXI.Application,
  {
    spriteName,
    imgDatasource,
    settings,
  }: {
    spriteName: string;
    imgDatasource: string | HTMLImageElement | PIXI.Sprite;
    settings?: ImageSettings;
  },
): Promise<void> {
  if (application === undefined || application.stage === null) {
    return;
  }
  // Remove previous sprite if exists
  const previous = application.stage.getChildByName(spriteName, true);
  previous?.removeFromParent();
  // Create texture from datasource
  const texture =
    imgDatasource instanceof HTMLImageElement
      ? PIXI.Texture.from(imgDatasource)
      : imgDatasource instanceof PIXI.Sprite
        ? imgDatasource
        : await PIXI.Texture.fromURL(imgDatasource);
  // Create sprite from texture and set name
  const sprite =
    texture instanceof PIXI.Sprite ? texture : PIXI.Sprite.from(texture, {});
  sprite.interactive = true;
  sprite.name = spriteName;
  // If settings are defined => resize accordingly
  if (settings) {
    const {
      sprite: { anchor, position, scale, size: spriteSize, rotation },
      stage: { size: stageSize },
    } = settings;
    // Check whether sprite has been rotated
    const isRotated = rotation % Math.PI !== 0;
    //Config sprite
    sprite.anchor.x = anchor.x;
    sprite.anchor.y = anchor.y;
    sprite.position.x = position.x;
    sprite.position.y = position.y;
    sprite.scale.x = scale.x;
    sprite.scale.y = scale.y;
    // If sprite is rotated a multiple of 90°=>width and height are swapped
    sprite.width = isRotated ? spriteSize.height : spriteSize.width;
    sprite.height = isRotated ? spriteSize.width : spriteSize.height;
    // Resize stage
    application.stage.height = stageSize.height;
    application.stage.width = stageSize.width;
    application.renderer.resize(stageSize.width, stageSize.height);
    // Add sprite to context
    application.stage.addChild(sprite);
  } else {
    // Add sprite to context
    application.stage.addChild(sprite);
    // Resize the sprite
    application.renderer.resize(sprite.width, sprite.height);
  }
  // Resize the view in css to keep img quality
}

/**
 * This function transform the stage into a blob
 *
 * @param application the PIXI.Application context
 * @returns A promise of the generated blob
 */
export function saveAsBlob(application: PIXI.Application): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    if (application?.view?.toBlob) {
      application.view.toBlob((blob) => {
        blob ? resolve(blob) : reject("EXTRACT_FAILED");
      });
    } else {
      reject("EXTRACT_FAILED");
    }
  });
}
/**
 * This function transform the stage into a data URL encoded image
 *
 * @param application the PIXI.Application context
 * @returns the generated image as Data URL or undefined if failed
 */
export function saveAsDataURL(
  application: PIXI.Application,
): string | undefined {
  return application.view.toDataURL?.();
}

/**
 * Calculates the scale percentage for a PIXI.Sprite or the application view based on the parent container's dimensions.
 * @param application - The PIXI.Application instance.
 * @param sprite - The PIXI.Sprite instance (optional).
 * @returns The scale percentage.
 */
export function getApplicationScale(application: PIXI.Application) {
  if (application.view.getBoundingClientRect) {
    return (
      application.view.getBoundingClientRect()!.width / application.view.width
    );
  }
  return 1;
}

export function toBlob(application: PIXI.Application) {
  return new Promise<Blob>((resolve, reject) => {
    application.view.toBlob?.(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject("EXTRACT_FAIL");
        }
      },
      "image/png",
      1,
    );
  });
}

export function createImageSettings({
  application,
  sprite,
}: {
  sprite: PIXI.Sprite;
  application: PIXI.Application;
}) {
  return {
    sprite: {
      rotation: sprite.rotation,
      size: { width: sprite.width, height: sprite.height },
      position: { x: sprite.position.x, y: sprite.position.y },
      scale: { x: sprite.scale.x, y: sprite.scale.y },
      anchor: { x: sprite.anchor.x, y: sprite.anchor.y },
    },
    stage: {
      size: {
        width: application.stage.width,
        height: application.stage.height,
      },
      scale: { x: application.stage.scale.x, y: application.stage.scale.y },
    },
  };
}

export function trimStage(application: PIXI.Application, sprite: PIXI.Sprite) {
  application.renderer.resize(sprite.width, sprite.height);
}
export function resizeStage({
  application,
  sprite,
  newHeight,
  newWidth,
}: {
  newHeight: number;
  newWidth: number;
  application: PIXI.Application;
  sprite: PIXI.Sprite;
}) {
  // Anchor the sprite to the middle (for rotation)
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  // Position the sprite to the middle
  sprite.position = new PIXI.Point(newWidth / 2, newHeight / 2);
  // Resize the stage
  application.stage.height = newHeight;
  application.stage.width = newWidth;
  application.renderer.resize(newWidth, newHeight);
}
