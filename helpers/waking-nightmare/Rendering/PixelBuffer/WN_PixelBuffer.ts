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

  addPixel = (x: number, y: number, color: Array<number>, depth: number) => {
    const index = y * this.height + x;

    this.buffer[index] = color[0];
    this.buffer[index + 1] = color[1];
    this.buffer[index + 2] = color[2];
    this.buffer[index + 3] = color[3];
  };
}

export default WN_PixelBuffer;
