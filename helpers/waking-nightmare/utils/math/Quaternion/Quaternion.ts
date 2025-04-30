import { Matrix4x4 } from '../Matrix/Matrix4x4';
import { Vector3 } from '../Vectors/Vector3';

export class Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  multiply(quaternion: Quaternion): Quaternion {
    const q1 = this;
    const q2 = quaternion;

    return new Quaternion(
      q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
      q1.w * q2.y + q1.y * q2.w + q1.z * q2.x - q1.x * q2.z,
      q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x,
      q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
    );
  }

  normalize(): Quaternion {
    const length = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    if (length === 0) {
      throw new Error('Cannot normalize a zero quaternion');
    }
    return new Quaternion(
      this.x / length,
      this.y / length,
      this.z / length,
      this.w / length
    );
  }

  conjugate(): Quaternion {
    return new Quaternion(-this.x, -this.y, -this.z, this.w);
  }

  toMatrix4x4(): Matrix4x4 {
    const xx = this.x * this.x;
    const yy = this.y * this.y;
    const zz = this.z * this.z;
    const xy = this.x * this.y;
    const xz = this.x * this.z;
    const yz = this.y * this.z;
    const wx = this.w * this.x;
    const wy = this.w * this.y;
    const wz = this.w * this.z;

    // prettier-ignore
    return new Matrix4x4([
      1 - 2 * (yy + zz), 2 * (xy - wz), 2 * (xz + wy), 0,
      2 * (xy + wz), 1 - 2 * (xx + zz), 2 * (yz - wx), 0,
      2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (xx + yy), 0,
      0, 0, 0, 1,
    ]);
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

  static slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    let cosTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

    if (cosTheta < 0) {
      q2 = new Quaternion(-q2.x, -q2.y, -q2.z, -q2.w);
      cosTheta = -cosTheta;
    }

    if (cosTheta > 0.9995) {
      return new Quaternion(
        q1.x + t * (q2.x - q1.x),
        q1.y + t * (q2.y - q1.y),
        q1.z + t * (q2.z - q1.z),
        q1.w + t * (q2.w - q1.w)
      ).normalize();
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

  static identity = (): Quaternion => new Quaternion(0, 0, 0, 1);
}
