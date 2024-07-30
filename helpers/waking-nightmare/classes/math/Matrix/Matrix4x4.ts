import Quaternion from '../Quaternion/Quaternion';
import Vector3 from '../Vectors/Vector3';

class Matrix4x4 {
  elements: number[];

  constructor(elements?: number[]) {
    // prettier-ignore
    this.elements = elements || [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  }

  multiply(matrix: Matrix4x4): Matrix4x4 {
    const a = this.elements;
    const b = matrix.elements;

    return new Matrix4x4([
      a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
      a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
      a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
      a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

      a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
      a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
      a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
      a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

      a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
      a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
      a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
      a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

      a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
      a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
      a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
      a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
    ]);
  }

  multiplyVector(vector: Vector3): Vector3 {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    const e = this.elements;

    const w = e[3] * x + e[7] * y + e[11] * z + e[15];

    return new Vector3(
      (e[0] * x + e[4] * y + e[8] * z + e[12]) / w,
      (e[1] * x + e[5] * y + e[9] * z + e[13]) / w,
      (e[2] * x + e[6] * y + e[10] * z + e[14]) / w
    );
  }

  rotateX(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const rotationMatrix = new Matrix4x4([
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1
    ]);
    return this.multiply(rotationMatrix);
  }

  rotateY(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const rotationMatrix = new Matrix4x4([
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1
    ]);
    return this.multiply(rotationMatrix);
  }

  rotateZ(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const rotationMatrix = new Matrix4x4([
      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    return this.multiply(rotationMatrix);
  }

  static identity(): Matrix4x4 {
    // prettier-ignore
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  static translation(tx: number, ty: number, tz: number): Matrix4x4 {
    // prettier-ignore
    return new Matrix4x4([
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, tz,
      0, 0, 0, 1
    ]);
  }

  static translationVector(position: Vector3): Matrix4x4 {
    // prettier-ignore
    return new Matrix4x4([
      1, 0, 0, position.x,
      0, 1, 0, position.y,
      0, 0, 1, position.z,
      0, 0, 0, 1
    ]);
  }

  static rotationX(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Matrix4x4([
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1
    ]);
  }

  static rotationY(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Matrix4x4([
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1
    ]);
  }

  static rotationZ(angle: number): Matrix4x4 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    return new Matrix4x4([
      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  static rotationQuaternion(rotation: Quaternion): Matrix4x4 {
    const x = rotation.x;
    const y = rotation.y;
    const z = rotation.z;
    const w = rotation.w;

    // prettier-ignore
    return new Matrix4x4([
      1 - 2 * y * y - 2 * z * z, 2 * x * y - 2 * z * w, 2 * x * z + 2 * y * w, 0,
      2 * x * y + 2 * z * w, 1 - 2 * x * x - 2 * z * z, 2 * y * z - 2 * x * w, 0,
      2 * x * z - 2 * y * w, 2 * y * z + 2 * x * w, 1 - 2 * x * x - 2 * y * y, 0,
      0, 0, 0, 1
    ]);
  }

  static scaling(sx: number, sy: number, sz: number): Matrix4x4 {
    // prettier-ignore
    return new Matrix4x4([
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1
    ]);
  }

  static scaleVector(scale: Vector3): Matrix4x4 {
    // prettier-ignore
    return new Matrix4x4([
      scale.x, 0, 0, 0,
      0, scale.y, 0, 0,
      0, 0, scale.z, 0,
      0, 0, 0, 1
    ]);
  }
}

export default Matrix4x4;
