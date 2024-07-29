import Matrix4x4 from '../classes/math/Matrix/Matrix4x4';
import WN_RendererComponent from '../components/renderers/WN_RendererComponent';
import WN_EntityManager from '../EntityManager/WN_EntityManager';
import WN_RenderMaterial from './RenderMaterial/WN_RenderMaterial';
import WN_Camera from './WN_Camera';
import WN_Canvas from './WN_Canvas';

class WN_Renderer {
  entityManager: WN_EntityManager;

  constructor(entityManager: WN_EntityManager) {
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

  getAspectRatio = (output: WN_Canvas | WN_RenderMaterial): number => {
    return output.width / output.height;
  };

  draw = (
    renderer: WN_RendererComponent,
    mvpMatrix: Matrix4x4,
    camera: WN_Camera
  ) => {
    renderer.render(camera.pixelBuffer, mvpMatrix);
    camera.output.loadPixelBuffer(camera.pixelBuffer);
  };
}

export default WN_Renderer;
