import { EntityManager } from '../EntityManager/EntityManager';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
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
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    const cameras = entityManager.getCameras();

    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    cameras.forEach((camera) =>
      this.renderCamera(camera, canvas, entityManager)
    );
  }

  private renderCamera(
    camera: CameraComponent,
    canvas: Canvas,
    entityManager: EntityManager
  ) {
    const viewMatrix = camera.getViewMatrix();

    // TODO: update this to use the camers output to get the aspect ratio
    const aspectRatio = this.getAspectRatio(canvas);
    const resolution = new Float32Array([canvas.width, canvas.height]);
    const projectionMatrix = camera.getProjectionMatrix(aspectRatio);

    const renderableEntities = entityManager.getRenderableEntities();

    renderableEntities.forEach((renderEntity) => {
      if (!renderEntity.transform) {
        return;
      }

      console.log(`Rendering entity: ${renderEntity.name}`);

      const modelMatrix = renderEntity.transform.getMatrix();
      const mvpMatrix = projectionMatrix
        .multiply(viewMatrix)
        .multiply(modelMatrix);

      console.log(`Rendering entity: ${renderEntity.name}`);

      renderEntity.renderComponent(
        mvpMatrix.elements,
        projectionMatrix.elements,
        resolution
      );
    });
  }

  private getAspectRatio(output: Canvas): number {
    return output.width / output.height;
  }
}
