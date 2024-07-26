type SpriteConstructor = {
  spriteUrl: string;
  width?: number;
  height?: number;
  xCoord?: number;
  yCoord?: number;
};

class Sprite {
  width?: number;
  height?: number;
  xCoord: number;
  yCoord: number;
  sprite: Uint8ClampedArray;

  constructor({
    spriteUrl,
    width,
    height,
    xCoord = 0,
    yCoord = 0,
  }: SpriteConstructor) {
    this.sprite = new Uint8ClampedArray();
    this.width = width;
    this.height = height;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.loadSprite(spriteUrl);
  }

  private loadSprite = async (spriteUrl: string): Promise<void> => {
    try {
      const response = await fetch(spriteUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch sprite');
      }
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      this.width = this.width ?? imageBitmap.width - this.xCoord;
      this.height = this.height ?? imageBitmap.height - this.yCoord;

      if (this.width === undefined || this.height === undefined) {
        throw new Error('Width or height could not be determined');
      }

      this.sprite = this.extractPixelData(imageBitmap);

      this.onSpriteLoaded();
    } catch (error) {
      console.error('Error loading sprite:', error);
    }
  };

  private onSpriteLoaded = (): void => {
    console.log('Sprite loaded and pixel data extracted', this.sprite);
  };

  private extractPixelData = (imageBitmap: ImageBitmap): Uint8ClampedArray => {
    if (this.width === undefined || this.height === undefined) {
      throw new Error('Width or height are not set');
    }

    const offscreenCanvas = new OffscreenCanvas(this.width, this.height);
    const context = offscreenCanvas.getContext('2d');
    if (context) {
      context.drawImage(imageBitmap, 0, 0);
      const imageData = context.getImageData(this.xCoord, this.yCoord, this.width, this.height);
      return imageData.data;
    } else {
      throw new Error('Failed to get 2D context from OffscreenCanvas');
    }
  };
}

export default Sprite;
