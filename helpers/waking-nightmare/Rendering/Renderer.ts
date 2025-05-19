import { EntityManager } from '../EntityManager/EntityManager';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import { Canvas } from './Canvas';

export class Renderer {
  constructor() {}

  render = () => {
    this.clearCanvas();
    this.renderCameras();
  };

  private clearCanvas() {
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  private renderCameras() {
    const entityManager = ServiceLocator.get<EntityManager>(EntityManager);

    const cameras = entityManager.cameras;

    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    cameras.forEach((camera) => camera.renderEntities(entityManager.renderers));
  }
}
