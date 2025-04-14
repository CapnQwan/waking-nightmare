/**
 * Canvas class manages the WebGL2 rendering context and canvas element.
 * It handles canvas creation, resizing, and basic rendering operations.
 */
class Canvas {
  /** The HTML canvas element */
  private _canvas: HTMLCanvasElement;
  /** The WebGL2 rendering context */
  private _gl: WebGL2RenderingContext;
  /** The device pixel ratio for high DPI displays */
  private _pixelRatio: number = 0;
  /** The actual width of the canvas in pixels */
  private _width: number = 0;
  /** The actual height of the canvas in pixels */
  private _height: number = 0;

  /**
   * Gets the HTML canvas element
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   * Gets the WebGL2 rendering context
   */
  get gl(): WebGL2RenderingContext {
    return this._gl;
  }

  /**
   * Gets the device pixel ratio
   */
  get pixelRatio(): number {
    return this._pixelRatio;
  }

  /**
   * Gets the canvas width in pixels
   */
  get width(): number {
    return this._width;
  }

  /**
   * Gets the canvas height in pixels
   */
  get height(): number {
    return this._height;
  }

  /**
   * Creates a new Canvas instance and initializes WebGL2 context
   * @throws Error if WebGL2 is not supported
   */
  constructor() {
    const canvas = document.createElement('canvas');
    this._canvas = document.body.appendChild(canvas);
    const glContext = this._canvas.getContext('webgl2');

    if (!glContext) {
      throw new Error('Unable to initialize WebGL2 context');
      return;
    }

    this._gl = glContext;
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
  }

  /**
   * Resizes the canvas to match the window dimensions
   * Handles high DPI displays by adjusting for device pixel ratio
   * Updates the WebGL viewport accordingly
   */
  resizeCanvas = () => {
    this._pixelRatio = window.devicePixelRatio || 1;

    this._canvas.style.width = `${window.innerWidth}px`;
    this._canvas.style.height = `${window.innerHeight}px`;

    this._width = window.innerWidth * this._pixelRatio;
    this._height = window.innerHeight * this._pixelRatio;

    this._canvas.width = this._width;
    this._canvas.height = this._height;

    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
  };

  /**
   * Clears the canvas using the current clear color
   * Typically called at the start of each frame
   */
  clearCanvas = () => {
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  };
}

export default Canvas;
