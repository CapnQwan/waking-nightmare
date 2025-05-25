/**
 * Represents a 2x2 matrix for 2D transformations
 * Provides utilities for matrix operations and transformations
 */
export class Matrix2x2 {
  /** Array containing the matrix elements in row-major order [a11, a12, a21, a22] */
  elements: number[];

  /**
   * Creates a new 2x2 matrix
   * @param {number[]} [elements] - Array of 4 elements in row-major order. Defaults to identity matrix
   */
  constructor(elements?: number[]) {
    this.elements = elements || [1, 0, 0, 1];
  }

  /**
   * Multiplies this matrix with another matrix
   * @param {Matrix2x2} matrix - Matrix to multiply with
   * @returns {Matrix2x2} Result of multiplication
   */
  multiply(matrix: Matrix2x2): Matrix2x2 {
    const a = this.elements;
    const b = matrix.elements;

    // Matrix multiplication in row-major order
    return new Matrix2x2([
      a[0] * b[0] + a[1] * b[2], // m11
      a[0] * b[1] + a[1] * b[3], // m12
      a[2] * b[0] + a[3] * b[2], // m21
      a[2] * b[1] + a[3] * b[3], // m22
    ]);
  }

  /**
   * Calculates the determinant of the matrix
   * @returns {number} Determinant value
   */
  determinant(): number {
    const [a, b, c, d] = this.elements;
    return a * d - b * c; // ad - bc for 2x2 matrix
  }

  /**
   * Creates an identity matrix
   * @returns {Matrix2x2} New identity matrix [1, 0, 0, 1]
   */
  static identity(): Matrix2x2 {
    return new Matrix2x2([1, 0, 0, 1]);
  }

  /**
   * Creates a rotation matrix for the given angle
   * @param {number} angle - Rotation angle in radians
   * @returns {Matrix2x2} New rotation matrix
   */
  static rotation(angle: number): Matrix2x2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix2x2([cos, -sin, sin, cos]);
  }

  /**
   * Creates a scaling matrix
   * @param {number} sx - Scale factor in X direction
   * @param {number} sy - Scale factor in Y direction
   * @returns {Matrix2x2} New scaling matrix
   */
  static scaling(sx: number, sy: number): Matrix2x2 {
    return new Matrix2x2([sx, 0, 0, sy]);
  }
}
