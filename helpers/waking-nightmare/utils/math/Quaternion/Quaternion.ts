import { Matrix4x4 } from '../Matrix/Matrix4x4';
import { Vector3 } from '../Vectors/Vector3';

/**
 * Represents a quaternion for 3D rotations
 * A quaternion is defined as q = x*i + y*j + z*k + w where i,j,k are imaginary basis vectors
 */
export class Quaternion {
  /** x component (i coefficient) */
  x: number;
  /** y component (j coefficient) */
  y: number;
  /** z component (k coefficient) */
  z: number;
  /** w component (real part) */
  w: number;

  /**
   * Creates a new quaternion
   * @param {number} [x=0] - x component
   * @param {number} [y=0] - y component
   * @param {number} [z=0] - z component
   * @param {number} [w=1] - w component (defaults to 1 for identity quaternion)
   */
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Multiplies this quaternion with another quaternion
   * @param {Quaternion} quaternion - Quaternion to multiply with
   * @returns {Quaternion} Result of multiplication
   */
  multiply(quaternion: Quaternion): Quaternion {
    const q1 = this;
    const q2 = quaternion;

    // Hamilton product formula
    return new Quaternion(
      q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
      q1.w * q2.y + q1.y * q2.w + q1.z * q2.x - q1.x * q2.z,
      q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x,
      q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
    );
  }

  /**
   * Normalizes the quaternion to unit length
   * @throws {Error} If quaternion length is zero
   */
  normalize(): void {
    const length = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    if (length === 0) {
      throw new Error('Cannot normalize a zero quaternion');
    }

    this.x = this.x / length;
    this.y = this.y / length;
    this.z = this.z / length;
    this.w = this.w / length;
  }

  /**
   * Returns the conjugate of this quaternion (negates x, y, z components)
   * @returns {Quaternion} Conjugate quaternion
   */
  conjugate(): Quaternion {
    return new Quaternion(-this.x, -this.y, -this.z, this.w);
  }

  /**
   * Converts quaternion to 4x4 rotation matrix
   * @returns {Matrix4x4} Rotation matrix representation
   */
  toMatrix4x4(): Matrix4x4 {
    // Calculate common terms
    const xx = this.x * this.x;
    const yy = this.y * this.y;
    const zz = this.z * this.z;
    const xy = this.x * this.y;
    const xz = this.x * this.z;
    const yz = this.y * this.z;
    const wx = this.w * this.x;
    const wy = this.w * this.y;
    const wz = this.w * this.z;

    // Create rotation matrix
    // prettier-ignore
    return new Matrix4x4([
      1 - 2 * (yy + zz), 2 * (xy - wz), 2 * (xz + wy), 0,
      2 * (xy + wz), 1 - 2 * (xx + zz), 2 * (yz - wx), 0,
      2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (xx + yy), 0,
      0, 0, 0, 1,
    ]);
  }

  toObject(): { x: number; y: number; z: number; w: number } {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w,
    };
  }

  toString(): string {
    return `Quaternion(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }

  clone(): Quaternion {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  inverse(): Quaternion {
    const conjugate = this.conjugate();
    const lengthSquared =
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    return new Quaternion(
      conjugate.x / lengthSquared,
      conjugate.y / lengthSquared,
      conjugate.z / lengthSquared,
      conjugate.w / lengthSquared
    );
  }

  rotateVector(vector: Vector3): Vector3 {
    const qVector = new Quaternion(vector.x, vector.y, vector.z, 0);
    const qResult = this.multiply(qVector).multiply(this.conjugate());
    return new Vector3(qResult.x, qResult.y, qResult.z);
  }

  rotatePitch(pitch: number): void {
    const halfPitch = pitch / 2;
    const sinHalfPitch = Math.sin(halfPitch);
    const cosHalfPitch = Math.cos(halfPitch);

    this.x = this.x * cosHalfPitch + this.w * sinHalfPitch;
    this.y = this.y * cosHalfPitch - this.z * sinHalfPitch;
    this.z = this.z * cosHalfPitch + this.y * sinHalfPitch;
    this.w = this.w * cosHalfPitch - this.x * sinHalfPitch;

    this.normalize();
  }

  rotateYaw(yaw: number): void {
    const halfYaw = yaw / 2;
    const sinHalfYaw = Math.sin(halfYaw);
    const cosHalfYaw = Math.cos(halfYaw);

    this.x = this.x * cosHalfYaw - this.z * sinHalfYaw;
    this.y = this.y * cosHalfYaw + this.w * sinHalfYaw;
    this.z = this.z * cosHalfYaw + this.x * sinHalfYaw;
    this.w = this.w * cosHalfYaw - this.y * sinHalfYaw;

    this.normalize();
  }

  rotateRoll(roll: number): void {
    const halfRoll = roll / 2;
    const sinHalfRoll = Math.sin(halfRoll);
    const cosHalfRoll = Math.cos(halfRoll);

    this.x = this.x * cosHalfRoll + this.y * sinHalfRoll;
    this.y = this.y * cosHalfRoll - this.z * sinHalfRoll;
    this.z = this.z * cosHalfRoll + this.x * sinHalfRoll;
    this.w = this.w * cosHalfRoll - this.z * sinHalfRoll;

    this.normalize();
  }

  /**
   * Creates a quaternion from an axis and angle
   * @param {Vector3} axis - Axis of rotation
   * @param {number} angle - Angle in radians
   * @returns {Quaternion} Quaternion representing the rotation
   */
  static fromAxisAngle(axis: Vector3, angle: number): Quaternion {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);
    return new Quaternion(
      axis.x * s,
      axis.y * s,
      axis.z * s,
      Math.cos(halfAngle)
    );
  }

  /**
   * Creates a quaternion from Euler angles (yaw, pitch, roll)
   * @param {number} yaw - Yaw angle in radians
   * @param {number} pitch - Pitch angle in radians
   * @param {number} roll - Roll angle in radians
   * @returns {Quaternion} Quaternion representing the rotation
   */
  static fromEulerAngles(yaw: number, pitch: number, roll: number): Quaternion {
    const cy = Math.cos(yaw * 0.5);
    const sy = Math.sin(yaw * 0.5);
    const cp = Math.cos(pitch * 0.5);
    const sp = Math.sin(pitch * 0.5);
    const cr = Math.cos(roll * 0.5);
    const sr = Math.sin(roll * 0.5);

    return new Quaternion(
      sr * cp * cy - cr * sp * sy,
      cr * sp * cy + sr * cp * sy,
      cr * cp * sy - sr * sp * cy,
      cr * cp * cy + sr * sp * sy
    );
  }

  /**
   * Converts this quaternion to Euler angles (yaw, pitch, roll)
   * @returns {Object} Object containing yaw, pitch, and roll angles in radians
   */
  toEulerAngles(): { yaw: number; pitch: number; roll: number } {
    const sinr_cosp = 2 * (this.w * this.x + this.y * this.z);
    const cosr_cosp = 1 - 2 * (this.x * this.x + this.y * this.y);
    const roll = Math.atan2(sinr_cosp, cosr_cosp);

    const sinp = 2 * (this.w * this.y - this.z * this.x);
    const pitch =
      Math.abs(sinp) >= 1 ? (Math.sign(sinp) * Math.PI) / 2 : Math.asin(sinp);

    const siny_cosp = 2 * (this.w * this.z + this.x * this.y);
    const cosy_cosp = 1 - 2 * (this.y * this.y + this.z * this.z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);

    return { yaw, pitch, roll };
  }

  /**
   * Performs spherical linear interpolation between two quaternions
   * @param {Quaternion} q1 - Start quaternion
   * @param {Quaternion} q2 - End quaternion
   * @param {number} t - Interpolation parameter (0-1)
   * @returns {Quaternion} Interpolated quaternion
   */
  static slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    let cosTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

    if (cosTheta < 0) {
      q2 = new Quaternion(-q2.x, -q2.y, -q2.z, -q2.w);
      cosTheta = -cosTheta;
    }

    if (cosTheta > 0.9995) {
      const newRotation = new Quaternion(
        q1.x + t * (q2.x - q1.x),
        q1.y + t * (q2.y - q1.y),
        q1.z + t * (q2.z - q1.z),
        q1.w + t * (q2.w - q1.w)
      );
      newRotation.normalize();
      return newRotation;
    }

    const theta0 = Math.acos(cosTheta);
    const theta = theta0 * t;
    const sinTheta = Math.sin(theta);
    const sinTheta0 = Math.sin(theta0);

    const s0 = Math.cos(theta) - (cosTheta * sinTheta) / sinTheta0;
    const s1 = sinTheta / sinTheta0;

    return new Quaternion(
      s0 * q1.x + s1 * q2.x,
      s0 * q1.y + s1 * q2.y,
      s0 * q1.z + s1 * q2.z,
      s0 * q1.w + s1 * q2.w
    );
  }

  /**
   * Creates a quaternion from a 4x4 rotation matrix
   * @param {Matrix4x4} matrix - Rotation matrix
   * @returns {Quaternion} Quaternion representing the rotation
   */
  static fromMatrix4x4(matrix: Matrix4x4): Quaternion {
    const m = matrix.elements;
    const trace = m[0] + m[5] + m[10];

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0);
      return new Quaternion(
        (m[6] - m[9]) * s,
        (m[8] - m[2]) * s,
        (m[1] - m[4]) * s,
        0.25 / s
      );
    } else if (m[0] > m[5] && m[0] > m[10]) {
      const s = 2.0 * Math.sqrt(1.0 + m[0] - m[5] - m[10]);
      return new Quaternion(
        0.25 * s,
        (m[1] + m[4]) / s,
        (m[8] + m[2]) / s,
        (m[6] - m[9]) / s
      );
    } else if (m[5] > m[10]) {
      const s = 2.0 * Math.sqrt(1.0 + m[5] - m[0] - m[10]);
      return new Quaternion(
        (m[1] + m[4]) / s,
        0.25 * s,
        (m[6] + m[9]) / s,
        (m[8] - m[2]) / s
      );
    } else {
      const s = 2.0 * Math.sqrt(1.0 + m[10] - m[0] - m[5]);
      return new Quaternion(
        (m[8] + m[2]) / s,
        (m[6] + m[9]) / s,
        0.25 * s,
        (m[1] - m[4]) / s
      );
    }
  }

  /**
   * Creates an identity quaternion (no rotation)
   * @returns {Quaternion} Identity quaternion [0,0,0,1]
   */
  static identity = (): Quaternion => new Quaternion(0, 0, 0, 1);
}
