import { Quaternion } from '../Quaternion/Quaternion';
import { Vector3 } from '../Vectors/Vector3';
import { Matrix3x3 } from './Matrix3x3';

export class Matrix4x4 {
  elements: Float32Array;

  constructor(elements?: number[] | Float32Array) {
    // prettier-ignore
    this.elements = new Float32Array(elements || [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  multiplyInPlace(matrix: Matrix4x4): void {
    const a = this.elements;
    const b = matrix.elements;
    const c = new Float32Array(16);

    // prettier-ignore
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix

    // prettier-ignore
    var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    c[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    c[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    c[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    c[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    c[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    c[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    c[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    c[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    c[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    c[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    c[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    c[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    // prettier-ignore
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    c[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    c[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    c[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    c[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    this.elements = c;
  }

  static perspective(
    fov: number,
    aspect: number,
    near: number,
    far: number
  ): Matrix4x4 {
    const f = 1.0 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    // prettier-ignore
    return new Matrix4x4([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, 2 * far * near * nf,
      0, 0, -1, 0
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

  toFloat32Array(): Float32Array {
    return new Float32Array(this.elements);
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
    return Matrix4x4.multiply(this, rotationMatrix);
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
    return Matrix4x4.multiply(this, rotationMatrix);
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
    return Matrix4x4.multiply(this, rotationMatrix);
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
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      position.x, position.y, position.z, 1
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

  static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
    const result = new Matrix4x4();
    result.elements = new Float32Array(16);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result.elements[i * 4 + j] =
          a.elements[i * 4] * b.elements[j] +
          a.elements[i * 4 + 1] * b.elements[j + 4] +
          a.elements[i * 4 + 2] * b.elements[j + 8] +
          a.elements[i * 4 + 3] * b.elements[j + 12];
      }
    }

    return result;
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

  // Helper: Extract 3x3 upper-left submatrix from 4x4 matrix
  get3x3Submatrix(): Matrix3x3 {
    const m = this.elements;
    // Column-major: [m0, m4, m8, m1, m5, m9, m2, m6, m10]
    // prettier-ignore
    return new Matrix3x3(
      [m[0], m[4], m[8], 
       m[1], m[5], m[9],
       m[2], m[6], m[10]]
    );
  }

  // Compute normal matrix from 4x4 model-view matrix
  static normalFromMat4(mat4: Matrix4x4): Matrix3x3 | null {
    // Step 1: Extract 3x3 submatrix
    const m = mat4.get3x3Submatrix();

    // Step 2: Compute inverse of 3x3 matrix
    const inv = Matrix4x4.inverse3x3(m);
    if (!inv) return null; // Handle non-invertible case

    // Step 3: Transpose the 3x3 inverse
    const normalMatrix = Matrix4x4.transpose3x3(inv);

    return normalMatrix;
  }

  // Helper: Compute inverse of a 3x3 matrix
  static inverse3x3(matrix: Matrix3x3): Matrix3x3 | null {
    // 3x3 matrix elements: [m0, m1, m2, m3, m4, m5, m6, m7, m8]
    const a = matrix.elements[0],
      b = matrix.elements[1],
      c = matrix.elements[2],
      d = matrix.elements[3],
      e = matrix.elements[4],
      f = matrix.elements[5],
      g = matrix.elements[6],
      h = matrix.elements[7],
      i = matrix.elements[8];

    // Determinant
    const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    if (Math.abs(det) < 1e-10) return null; // Non-invertible

    // Adjugate matrix
    const adj = [
      e * i - f * h,
      -(b * i - c * h),
      b * f - c * e,
      -(d * i - f * g),
      a * i - c * g,
      -(a * f - c * d),
      d * h - e * g,
      -(a * h - b * g),
      a * e - b * d,
    ];

    // Inverse = adjugate / determinant
    const inv = adj.map((x) => x / det);
    return new Matrix3x3(inv);
  }

  // Helper: Transpose a 3x3 matrix
  static transpose3x3(matrix: Matrix3x3): Matrix3x3 {
    // prettier-ignore
    return new Matrix3x3([
      matrix.elements[0], matrix.elements[3], matrix.elements[6],
      matrix.elements[1], matrix.elements[4], matrix.elements[7],
      matrix.elements[2], matrix.elements[5], matrix.elements[8],
    ]);
  }
}
