import Matrix4x4 from '../classes/math/Matrix/Matrix4x4';
import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_Canvas from './WN_Canvas';
import WN_RenderMaterial from './RenderMaterial/WN_RenderMaterial';
import WN_Component from '../GameObjects/Component/WN_Component';
import WN_PixelBuffer from './PixelBuffer/WN_PixelBuffer';

type CameraConstructor = {
  parent: WN_GameObject;
  output: WN_Canvas | WN_RenderMaterial;
  fieldOfView?: number;
  near?: number;
  far?: number;
};

class WN_Camera extends WN_Component {
  output: WN_Canvas | WN_RenderMaterial;
  fieldOfView: number;
  near: number;
  far: number;
  pixelBuffer: WN_PixelBuffer;

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
    this.pixelBuffer = new WN_PixelBuffer({
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

export default WN_Camera;
