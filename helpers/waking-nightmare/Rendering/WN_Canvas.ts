import WN_PixelBuffer from './PixelBuffer/WN_PixelBuffer';

class WN_Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number = 0;
  width: number = 0;
  height: number = 0;

  constructor() {
    const canvas = document.createElement('canvas');
    this.canvas = document.body.appendChild(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
  }

  resizeCanvas = () => {
    this.pixelRatio = window.devicePixelRatio || 1;

    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    this.width = window.innerWidth * this.pixelRatio;
    this.height = window.innerHeight * this.pixelRatio;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx?.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  };

  renderImageData = (imageData: ImageData) => {
    this.ctx?.putImageData(imageData, 0, 0);
  };

  loadPixelBuffer = (pixelBuffer: WN_PixelBuffer) => {
    this.clearCanvas();
    this.renderImageData(pixelBuffer.toImageData());
  };

  renderText = (text: string | number, x: number, y: number) => {
    const textString = typeof text === 'number' ? text.toString() : text;
    this.ctx?.fillText(textString, x, y);
  };

  clearCanvas = () => {
    if (this.ctx) {
      this.ctx.fillStyle = 'rgb(150,150,150)';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  };
}

export default WN_Canvas;
