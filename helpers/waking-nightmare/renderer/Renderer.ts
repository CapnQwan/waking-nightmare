import WNCore from "../WakingNightmareCore";
import PixelBuffer from "./PixelBuffer";

class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelBuffer: PixelBuffer;
  pixelRatio: number = 0;
  width: number = 0;
  height: number = 0;
  wnCore: WNCore;

  constructor(core: WNCore) {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    this.pixelBuffer = new PixelBuffer(this);
    this.wnCore = core;
  }

  resizeCanvas() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.width = window.innerWidth * this.pixelRatio;
    this.height = window.innerHeight * this.pixelRatio;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);
  }

  renderText(text: string | number, x: number, y: number) {
    const textString = typeof text === 'number' ? text.toString() : text;
    this.ctx?.fillText(textString, x, y);
  }
};


export default Renderer;
