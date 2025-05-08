import { EntityManager } from '../EntityManager/EntityManager';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
import { RendererComponent } from '../GameObjects/Component/components/renderering/RendererComponent';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import { Matrix4x4 } from '../utils/math/Matrix/Matrix4x4';
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
    const projectionMatrix = camera.getProjectionMatrix(aspectRatio);

    const renderableEntities = entityManager.getRenderableEntities();

    renderableEntities.forEach((entity) => {
      if (!entity.transform) {
        return;
      }

      const modelMatrix = entity.transform.getMatrix();
      const mvpMatrix = projectionMatrix
        .multiply(viewMatrix)
        .multiply(modelMatrix);

      entity.renderComponet(camera, mvpMatrix.elements);
    });
  }

  private getAspectRatio(output: Canvas): number {
    return output.width / output.height;
  }
}
