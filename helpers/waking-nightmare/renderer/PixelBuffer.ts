import Renderer from './Renderer';

class PixelBuffer {
  renderer;
  buffer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.buffer = new Array(this.renderer.width * this.renderer.height).fill([
      0, 0, 0, 255,
    ]);
  }

  RecalculatePixelBuffer() {
    for (let x = 0; x < this.renderer.width; x++) {
      for (let y = 0; y < this.renderer.height; y++) {
        this.RaycastPixel(x, y);
      }
    }
  }

  RaycastPixel(x: number, y: number) {}
}

export default PixelBuffer;
