import { Matrix4x4 } from './martix/matrix4x4';
import { Quaternion } from './quaternion/quaternion';
import { Vector3 } from './vectors/vector3';

/**
 * Represents a 3D transformation with position, rotation, and scale.
 * Used for handling object transformations in 3D space.
 */
export class Transform {
  /** The position in 3D space as a Vector3 */
  position: Vector3;
  /** The rotation represented as a Quaternion */
  rotation: Quaternion;
  /** The scale in x, y, z dimensions */
  scale: Vector3;

  /**
   * Creates a new Transform instance
   * @param position The initial position (defaults to [0,0,0])
   * @param rotation The initial rotation (defaults to identity quaternion)
   * @param scale The initial scale (defaults to [1,1,1])
   */
  constructor(
    position: Vector3 = Vector3.zero(),
    rotation: Quaternion = Quaternion.identity(),
    scale: Vector3 = Vector3.one()
  ) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  /**
   * Generates a 4x4 matrix representing the complete transformation
   * Combines translation, rotation, and scale in that order
   * @returns A Matrix4x4 representing the full transformation
   */
  getModelMatrix = (): Matrix4x4 => {
    const translationMatrix = Matrix4x4.translationVector(this.position);
    const rotationMatrix = Matrix4x4.rotationQuaternion(this.rotation);
    const scaleMatrix = Matrix4x4.scaleVector(this.scale);

    translationMatrix.multiplyInPlace(rotationMatrix);
    translationMatrix.multiplyInPlace(scaleMatrix);

    return translationMatrix;
  };

  /**
   * Applies a translation to the current position
   * @param translation The vector to add to the current position
   */
  applyTranslation(translation: Vector3): void {
    this.position = this.position.add(translation);
  }

  /**
   * Applies an additional rotation to the current rotation
   * @param rotation The quaternion rotation to apply
   */
  applyRotation(rotation: Quaternion): void {
    const newRotation = this.rotation.multiply(rotation);
    newRotation.normalize();
    this.rotation = newRotation;
  }

  /**
   * Applies a scale factor to the current scale
   * @param scale The scale factors to multiply with current scale
   */
  applyScale(scale: Vector3): void {
    this.scale = this.scale.multiply(scale);
  }

  /**
   * Combines this transform with another transform
   * @param transform The transform to combine with
   * @returns A new Transform representing the combined transformation
   */
  combine(transform: Transform): Transform {
    const combinedPosition = this.position.add(transform.position);
    const combinedRotation = this.rotation.multiply(transform.rotation);
    combinedRotation.normalize();
    const combinedScale = this.scale.multiply(transform.scale);

    return new Transform(combinedPosition, combinedRotation, combinedScale);
  }

  /**
   * Rotates the transform to look at a target point
   * @param target The point to look at
   * @param up The up vector for orientation (defaults to world up [0,1,0])
   */
  lookAt(target: Vector3, up: Vector3 = Vector3.up()): void {
    // Calculate the forward direction vector
    const direction = target.subtract(this.position).normalize();
    // Calculate the right vector as the cross product of up and direction
    const right = up.cross(direction).normalize();
    // Calculate the adjusted up vector to ensure orthogonality
    const adjustedUp = direction.cross(right).normalize();

    // Create rotation matrix from the orthonormal basis vectors
    // prettier-ignore
    const mat = new Matrix4x4([
      right.x, right.y, right.z, 0,
      adjustedUp.x, adjustedUp.y, adjustedUp.z, 0,
      direction.x, direction.y, direction.z, 0,
      0, 0, 0, 1,
    ]);

    this.rotation = Quaternion.fromMatrix4x4(mat);
  }

  /**
   * Creates a deep copy of this transform
   * @returns A new Transform with copied values
   */
  clone(): Transform {
    return new Transform(
      this.position.clone(),
      this.rotation.clone(),
      this.scale.clone()
    );
  }

  /**
   * Copies values from another transform into this one
   * @param transform The transform to copy from
   */
  copy(transform: Transform): void {
    this.position = transform.position.clone();
    this.rotation = transform.rotation.clone();
    this.scale = transform.scale.clone();
  }
}
