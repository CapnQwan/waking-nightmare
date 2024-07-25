import RenderMaterial from './RenderMaterial/RenderMaterial';

class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number = 0;
  width: number = 0;
  height: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
  }

  resizeCanvas() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.width = window.innerWidth * this.pixelRatio;
    this.height = window.innerHeight * this.pixelRatio;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);
  }

  renderImageData(imageData: ImageData) {
    this.ctx?.putImageData(imageData, 20, 20);
  }

  renderText(text: string | number, x: number, y: number) {
    const textString = typeof text === 'number' ? text.toString() : text;
    this.ctx?.fillText(textString, x, y);
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.width, this.height);
  }
}

export default Canvas;
