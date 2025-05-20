import { Matrix4x4 } from '../../../../utils/math/Matrix/Matrix4x4';
import { Canvas } from '../../../../Rendering/Canvas';
import { RenderTexture } from '@/helpers/waking-nightmare/Rendering/classes/RenderTexture';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';
import { RendererComponent } from './RendererComponent';
import ServiceLocator from '@/helpers/waking-nightmare/ServiceLocator/ServiceLocator';
import { createIdentityMatrix } from '@/hooks/martrixUtils';

interface ICameraConstructor extends IBehaviourConstructor {
  output?: Canvas | RenderTexture;
  fieldOfView?: number;
  near?: number;
  far?: number;
}

export class CameraComponent extends Behaviour {
  output: Canvas | RenderTexture | null;
  fieldOfView: number;
  near: number;
  far: number;

  constructor(params: ICameraConstructor) {
    super(params);
    this.output = params.output ?? null;
    this.fieldOfView = params.fieldOfView ?? 45;
    this.near = params.near ?? 0.1;
    this.far = params.far ?? 1000;
  }

  getViewMatrix(): Matrix4x4 {
    if (!this.transform) {
      throw new Error('Parent object does not have a transform');
    }
    const position = this.transform.position;
    const rotation = this.transform.rotation;

    // Get the inverse rotation (conjugate of the quaternion)
    const inverseRotation = rotation.conjugate();
    const rotationMatrix = Matrix4x4.rotationQuaternion(inverseRotation);

    // Translate by the negative of the camera's position
    const translationMatrix = Matrix4x4.translation(
      -position.x,
      -position.y,
      -position.z
    );

    // Combine: rotation^-1 * translation^-1
    return Matrix4x4.multiply(rotationMatrix, translationMatrix);
  }

  getProjectionMatrix(aspectRatio: number): Matrix4x4 {
    const fovRad = (this.fieldOfView * Math.PI) / 180;
    const f = 1.0 / Math.tan(fovRad / 2);
    const rangeInv = 1.0 / (this.near - this.far);

    // prettier-ignore
    return new Matrix4x4([
      f / aspectRatio, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (this.near + this.far) * rangeInv, -1,
      0, 0, 2 * this.near * this.far * rangeInv, 0
    ]);
  }

  renderEntities(rendererEntities: RendererComponent[]) {
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    //const viewMatrix = this.getViewMatrix();
    const viewMatrix = createIdentityMatrix();

    // TODO: update this to use the camers output to get the aspect ratio
    const projectionMatrix = this.getProjectionMatrix(
      canvas.aspectRatio
    ).elements;
    //const projectionMatrix = createPerspectiveMatrix(
    //  Math.PI / 4,
    //  canvas.width / canvas.height,
    //  0.1,
    //  100.0
    //);
    //const viewProjectionMatrix = projectionMatrix.multiply(viewMatrix);

    rendererEntities.forEach((renderEntity) => {
      renderEntity.renderComponent(viewMatrix, projectionMatrix);
    });
  }
}
