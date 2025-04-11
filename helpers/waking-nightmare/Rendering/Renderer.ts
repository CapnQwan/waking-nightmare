import Matrix4x4 from '../utils/math/Matrix/Matrix4x4';
import WN_RendererComponent from '../GameObjects/Component/components/renderers/RendererComponent';
import EntityManager from '../EntityManager/EntityManager';
import RenderMaterial from './RenderMaterial/RenderMaterial';
import Camera from './Camera';
import Canvas from './Canvas';

class Renderer {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  render = () => {
    const cameras = this.entityManager.getCameras();
    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    cameras.forEach((camera) => {
      camera.pixelBuffer.resetBuffer();
      const viewMatrix = camera.getViewMatrix();
      const aspectRatio = this.getAspectRatio(camera.output);
      const projectionMatrix = camera.getProjectionMatrix(aspectRatio);

      const renderableEntities = this.entityManager.getRenderableEntities();

      renderableEntities.forEach((entity) => {
        if (!entity.transform) {
          return;
        }

        const modelMatrix = entity.transform.getMatrix();
        const mvpMatrix = projectionMatrix
          .multiply(viewMatrix)
          .multiply(modelMatrix);

        this.draw(entity, mvpMatrix, camera);
      });
    });
  };

  getAspectRatio = (output: Canvas | RenderMaterial): number => {
    return output.width / output.height;
  };

  draw = (
    renderer: WN_RendererComponent,
    mvpMatrix: Matrix4x4,
    camera: Camera
  ) => {
    renderer.render(camera.pixelBuffer, mvpMatrix);
    camera.output.loadPixelBuffer(camera.pixelBuffer);
  };
}

export default Renderer;
