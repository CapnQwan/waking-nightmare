/**
 * Represents a 3x3 matrix for 2D transformations
 * Provides utilities for matrix operations and transformations
 */
export class Matrix3x3 {
  /** Array containing the matrix elements in row-major order */
  elements: Float32Array;

  /**
   * Creates a new 3x3 matrix
   * @param {number[]} [elements] - Array of 9 elements in row-major order. Defaults to identity matrix
   */
  constructor(elements?: number[]) {
    this.elements = new Float32Array(elements ?? [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  /**
   * Multiplies this matrix with another matrix
   * @param {Matrix3x3} matrix - Matrix to multiply with
   * @returns {Matrix3x3} Result of multiplication
   */
  multiply(matrix: Matrix3x3): Matrix3x3 {
    const a = this.elements;
    const b = matrix.elements;

    return new Matrix3x3([
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ]);
  }

  /**
   * Calculates the determinant of the matrix
   * @returns {number} Determinant value
   */
  determinant(): number {
    // prettier-ignore
    const a = this.elements[0], b = this.elements[1], c = this.elements[2],
          d = this.elements[3], e = this.elements[4], f = this.elements[5],
          g = this.elements[6], h = this.elements[7], i = this.elements[8];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  /**
   * Calculates the inverse of the matrix
   * @returns {Matrix3x3 | null} Inverse matrix or null if matrix is not invertible
   */
  inverse(): Matrix3x3 | null {
    const det = this.determinant();
    if (det === 0) return null;

    // prettier-ignore
    const a = this.elements[0], b = this.elements[1], c = this.elements[2],
          d = this.elements[3], e = this.elements[4], f = this.elements[5],
          g = this.elements[6], h = this.elements[7], i = this.elements[8];

    const invDet = 1 / det;

    // Calculate adjugate matrix multiplied by 1/determinant
    return new Matrix3x3([
      (e * i - f * h) * invDet,
      (c * h - b * i) * invDet,
      (b * f - c * e) * invDet,
      (f * g - d * i) * invDet,
      (a * i - c * g) * invDet,
      (c * d - a * f) * invDet,
      (d * h - e * g) * invDet,
      (b * g - a * h) * invDet,
      (a * e - b * d) * invDet,
    ]);
  }

  /**
   * Static method to calculate the inverse of a matrix
   * @param {Matrix3x3} matrix - Matrix to invert
   * @returns {Matrix3x3 | null} Inverse matrix or null if not invertible
   */
  public static getInverse(matrix: Matrix3x3): Matrix3x3 | null {
    const det = matrix.determinant();
    if (det === 0) return null;

    // prettier-ignore
    const a = matrix.elements[0], b = matrix.elements[1], c = matrix.elements[2],
          d = matrix.elements[3], e = matrix.elements[4], f = matrix.elements[5],
          g = matrix.elements[6], h = matrix.elements[7], i = matrix.elements[8];

    const invDet = 1 / det;

    return new Matrix3x3([
      (e * i - f * h) * invDet,
      (c * h - b * i) * invDet,
      (b * f - c * e) * invDet,
      (f * g - d * i) * invDet,
      (a * i - c * g) * invDet,
      (c * d - a * f) * invDet,
      (d * h - e * g) * invDet,
      (b * g - a * h) * invDet,
      (a * e - b * d) * invDet,
    ]);
  }

  /**
   * Creates an identity matrix
   * @returns {Matrix3x3} New identity matrix
   */
  static identity(): Matrix3x3 {
    return new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  /**
   * Creates a rotation matrix
   * @param {number} angle - Rotation angle in radians
   * @returns {Matrix3x3} New rotation matrix
   */
  static rotation(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3x3([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
  }

  /**
   * Creates a scaling matrix
   * @param {number} sx - Scale factor in X direction
   * @param {number} sy - Scale factor in Y direction
   * @returns {Matrix3x3} New scaling matrix
   */
  static scaling(sx: number, sy: number): Matrix3x3 {
    return new Matrix3x3([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
  }

  /**
   * Creates a translation matrix
   * @param {number} tx - Translation in X direction
   * @param {number} ty - Translation in Y direction
   * @returns {Matrix3x3} New translation matrix
   */
  static translation(tx: number, ty: number): Matrix3x3 {
    return new Matrix3x3([1, 0, tx, 0, 1, ty, 0, 0, 1]);
  }

  /**
   * Creates a transposed copy of the given matrix
   * @param {Matrix3x3} matrix - Matrix to transpose
   * @returns {Matrix3x3} New transposed matrix
   */
  static transpose(matrix: Matrix3x3): Matrix3x3 {
    // prettier-ignore
    return new Matrix3x3([
      matrix.elements[0], matrix.elements[3], matrix.elements[6],
      matrix.elements[1], matrix.elements[4], matrix.elements[7],
      matrix.elements[2], matrix.elements[5], matrix.elements[8],
    ]);
  }
}
