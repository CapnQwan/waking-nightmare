import { Matrix4x4 } from './Matrix/Matrix4x4';
import { Quaternion } from './Quaternion/Quaternion';
import { Vector3 } from './Vectors/Vector3';

export class Transform {
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;

  constructor(
    position: Vector3 = Vector3.zero(),
    rotation: Quaternion = Quaternion.identity(),
    scale: Vector3 = Vector3.one()
  ) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  getModelMatrix = (): Float32Array => {
    const translationMatrix = Matrix4x4.translationVector(this.position);
    const rotationMatrix = Matrix4x4.rotationQuaternion(this.rotation);
    const scaleMatrix = Matrix4x4.scaleVector(this.scale);

    return translationMatrix.multiply(rotationMatrix).multiply(scaleMatrix)
      .elements;
  };

  applyTranslation(translation: Vector3): void {
    this.position = this.position.add(translation);
  }

  applyRotation(rotation: Quaternion): void {
    this.rotation = this.rotation.multiply(rotation).normalize();
  }

  applyScale(scale: Vector3): void {
    this.scale = this.scale.multiply(scale);
  }

  combine(transform: Transform): Transform {
    const combinedPosition = this.position.add(transform.position);
    const combinedRotation = this.rotation
      .multiply(transform.rotation)
      .normalize();
    const combinedScale = this.scale.multiply(transform.scale);

    return new Transform(combinedPosition, combinedRotation, combinedScale);
  }

  lookAt(target: Vector3, up: Vector3 = Vector3.up()): void {
    const direction = target.subtract(this.position).normalize();
    const right = up.cross(direction).normalize();
    const adjustedUp = direction.cross(right).normalize();

    // prettier-ignore
    const mat = new Matrix4x4([
      right.x, right.y, right.z, 0,
      adjustedUp.x, adjustedUp.y, adjustedUp.z, 0,
      direction.x, direction.y, direction.z, 0,
      0, 0, 0, 1,
    ]);

    this.rotation = Quaternion.fromMatrix4x4(mat);
  }

  clone(): Transform {
    return new Transform(
      this.position.clone(),
      this.rotation.clone(),
      this.scale.clone()
    );
  }

  copy(transform: Transform): void {
    this.position = transform.position.clone();
    this.rotation = transform.rotation.clone();
    this.scale = transform.scale.clone();
  }
}
