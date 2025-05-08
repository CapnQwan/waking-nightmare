import { Matrix4x4 } from '../../../../utils/math/Matrix/Matrix4x4';
import { Canvas } from '../../../../Rendering/Canvas';
import { RenderTexture } from '@/helpers/waking-nightmare/Rendering/classes/RenderTexture';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';

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
    const viewMatrix = Matrix4x4.translation(
      -position.x,
      -position.y,
      -position.z
    );
    viewMatrix.rotateX(-rotation.x);
    viewMatrix.rotateY(-rotation.y);
    viewMatrix.rotateZ(-rotation.z);
    return viewMatrix;
  }

  getProjectionMatrix(aspectRatio: number): Matrix4x4 {
    const fovRad = (this.fieldOfView * Math.PI) / 180;
    const f = 1.0 / Math.tan(fovRad / 2);
    const rangeInv = 1.0 / (this.near - this.far);

    // prettier-ignore
    return new Matrix4x4([
      f / aspectRatio, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (this.near + this.far) * rangeInv, 2 * this.near * this.far * rangeInv,
      0, 0, -1, 0
    ]);
  }
}
