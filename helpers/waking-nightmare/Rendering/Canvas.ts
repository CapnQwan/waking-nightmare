class Canvas {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  pixelRatio: number = 0;
  width: number = 0;
  height: number = 0;

  constructor() {
    const canvas = document.createElement('canvas');
    this.canvas = document.body.appendChild(canvas);
    const glContext = this.canvas.getContext('webgl2');

    if (!glContext) {
      throw new Error('Unable to initialize the ');
      return;
    }

    this.gl = glContext;
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

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  };

  clearCanvas = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };
}

export default Canvas;
