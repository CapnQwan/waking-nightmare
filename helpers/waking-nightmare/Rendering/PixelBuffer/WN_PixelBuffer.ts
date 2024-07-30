class WN_PixelBuffer {
  width: number;
  height: number;
  buffer: Uint8ClampedArray;
  depth: Array<number>;

  constructor({ width = 10, height = 10 }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
    this.buffer = new Uint8ClampedArray(this.width * this.height * 4);
    this.depth = new Array(this.width * this.height);
  }

  setBufferDimensions = (width: number, height: number) => {
    this.width = width;
    this.height = height;
    this.resetBuffer();
  };

  resetBuffer = () => {
    this.buffer = new Uint8ClampedArray(this.width * this.height * 4);
    this.depth = new Array(this.width * this.height);
  };

  toImageData = (): ImageData =>
    new ImageData(this.buffer, this.width, this.height);

  addPixel = (x: number, y: number, color: Array<number>, depth: number) => {
    const index = y * this.width + x;
    if (depth < (this.depth[index] || Infinity)) {
      this.buffer[index * 4] = color[0];
      this.buffer[index * 4 + 1] = color[1];
      this.buffer[index * 4 + 2] = color[2];
      this.buffer[index * 4 + 3] = color[3];
      this.depth[index] = depth;
    }
  };
}

export default WN_PixelBuffer;
