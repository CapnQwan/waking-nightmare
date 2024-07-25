class PixelBuffer {
  buffer;

  constructor({ width = 10, height = 10 }: { width: number; height: number }) {
    this.buffer = new Array(width * height).fill([0, 0, 0, 255]);
  }
}

export default PixelBuffer;
