class Matrix2x2 {
  elements: number[];

  constructor(elements?: number[]) {
    this.elements = elements || [1, 0, 0, 1];
  }

  multiply(matrix: Matrix2x2): Matrix2x2 {
    const a = this.elements;
    const b = matrix.elements;

    return new Matrix2x2([
      a[0] * b[0] + a[1] * b[2],
      a[0] * b[1] + a[1] * b[3],
      a[2] * b[0] + a[3] * b[2],
      a[2] * b[1] + a[3] * b[3],
    ]);
  }

  determinant(): number {
    const [a, b, c, d] = this.elements;
    return a * d - b * c;
  }

  static identity(): Matrix2x2 {
    return new Matrix2x2([1, 0, 0, 1]);
  }

  static rotation(angle: number): Matrix2x2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix2x2([cos, -sin, sin, cos]);
  }

  static scaling(sx: number, sy: number): Matrix2x2 {
    return new Matrix2x2([sx, 0, 0, sy]);
  }
}

export default Matrix2x2;
