import { EntityManager } from '../EntityManager/EntityManager';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import { Canvas } from './Canvas';

export class Renderer {
  constructor() {}

  render = () => {
    const entityManager = ServiceLocator.get<EntityManager>(EntityManager);
    const cameras = entityManager.getCameras();

    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    //cameras.forEach((camera) => {
    //  camera.pixelBuffer.resetBuffer();
    //  const viewMatrix = camera.getViewMatrix();
    //  const aspectRatio = this.getAspectRatio(camera.output);
    //  const projectionMatrix = camera.getProjectionMatrix(aspectRatio);
    //
    //  const renderableEntities = this.entityManager.getRenderableEntities();
    //
    //  renderableEntities.forEach((entity) => {
    //    if (!entity.transform) {
    //      return;
    //    }
    //
    //    const modelMatrix = entity.transform.getMatrix();
    //    const mvpMatrix = projectionMatrix
    //      .multiply(viewMatrix)
    //      .multiply(modelMatrix);
    //
    //    this.draw(entity, mvpMatrix, camera);
    //  });
    //});
  };

  getAspectRatio = (output: Canvas): number => {
    return output.width / output.height;
  };

  //draw = (
  //  renderer: WN_RendererComponent,
  //  mvpMatrix: Matrix4x4,
  //  camera: CameraComponent
  //) => {
  //  //renderer.render(camera.pixelBuffer, mvpMatrix);
  //  //camera.output.loadPixelBuffer(camera.pixelBuffer);
  //};
}
