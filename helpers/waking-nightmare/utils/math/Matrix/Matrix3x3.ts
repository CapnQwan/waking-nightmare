export class Matrix3x3 {
  elements: Float32Array;

  constructor(elements?: number[]) {
    this.elements = new Float32Array(elements ?? [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

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

  determinant(): number {
    // prettier-ignore
    const a = this.elements[0], b = this.elements[1], c = this.elements[2],
          d = this.elements[3], e = this.elements[4], f = this.elements[5],
          g = this.elements[6], h = this.elements[7], i = this.elements[8];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  inverse(): Matrix3x3 | null {
    const det = this.determinant();
    if (det === 0) return null;

    // prettier-ignore
    const a = this.elements[0], b = this.elements[1], c = this.elements[2],
          d = this.elements[3], e = this.elements[4], f = this.elements[5],
          g = this.elements[6], h = this.elements[7], i = this.elements[8];

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

  static identity(): Matrix3x3 {
    return new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  static rotation(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3x3([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
  }

  static scaling(sx: number, sy: number): Matrix3x3 {
    return new Matrix3x3([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
  }

  static translation(tx: number, ty: number): Matrix3x3 {
    return new Matrix3x3([1, 0, tx, 0, 1, ty, 0, 0, 1]);
  }
}
