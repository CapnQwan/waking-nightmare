import Matrix4x4 from '../../../../utils/math/Matrix/Matrix4x4';
import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import Canvas from '../../../../Rendering/Canvas';
import RenderMaterial from './RenderMaterial/RenderMaterial';
import Component from '../../Component';
import PixelBuffer from './PixelBuffer/PixelBuffer';

type CameraConstructor = {
  parent: GameObject;
  output: Canvas | RenderMaterial;
  fieldOfView?: number;
  near?: number;
  far?: number;
};

class Camera extends Component {
  output: Canvas | RenderMaterial;
  fieldOfView: number;
  near: number;
  far: number;
  pixelBuffer: PixelBuffer;

  constructor({
    parent,
    output,
    fieldOfView = 45,
    near = 0.1,
    far = 1000,
  }: CameraConstructor) {
    super({ parent });
    this.parent = parent;
    this.output = output;
    this.fieldOfView = fieldOfView;
    this.near = near;
    this.far = far;
    this.pixelBuffer = new PixelBuffer({
      width: this.output.width,
      height: this.output.height,
    });
  }

  getViewMatrix(): Matrix4x4 {
    if (!this.parent.transform) {
      throw new Error('Parent object does not have a transform');
    }

    const position = this.parent.transform.position;
    const rotation = this.parent.transform.rotation;
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

export default Camera;
