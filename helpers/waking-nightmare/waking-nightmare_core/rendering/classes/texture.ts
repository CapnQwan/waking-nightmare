export class Texture {
  public readonly id: number;
  public readonly width: number;
  public readonly height: number;
  public readonly data: Uint8Array;

  constructor(id: number, width: number, height: number, data: Uint8Array) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.data = data;
  }
}
