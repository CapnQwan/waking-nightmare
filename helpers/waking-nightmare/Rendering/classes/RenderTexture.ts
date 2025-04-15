import { Texture } from './Texture';

class RenderTexture extends Texture {
  public readonly width: number;
  public readonly height: number;
  public readonly data: Uint8Array;

  constructor(id: number, width: number, height: number, data: Uint8Array) {
    super(id, width, height, data);
    this.width = width;
    this.height = height;
    this.data = data;
  }

  public getData(): Uint8Array {
    return this.data;
  }
}
