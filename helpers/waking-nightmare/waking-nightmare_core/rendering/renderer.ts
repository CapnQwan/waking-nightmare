import { entityManager } from '../entityManager/entityManager';
import { canvas, gl } from './canvas';

export class Renderer {
  private static instance: Renderer;

  constructor() {}

  render = () => {
    this.clearCanvas();
    this.renderCameras();
  };

  private clearCanvas() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  private renderCameras() {
    const cameras = entityManager.cameras;

    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    cameras.forEach((camera) => camera.renderEntities(entityManager.renderers));
  }

  public static getInstance(): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }
    return Renderer.instance;
  }
}

export const renderer = Renderer.getInstance();
