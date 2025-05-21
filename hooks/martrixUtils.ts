// Matrix Functions
export function createIdentityMatrix(z = 0): Float32Array {
  // prettier-ignore
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, z,
    0, 0, 0, 1
  ]);
}

export function createPerspectiveMatrix(
  fov: number,
  aspect: number,
  near: number,
  far: number
): Float32Array {
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

export function translateMatrix(
  matrix: Float32Array,
  tx: number,
  ty: number,
  tz: number
): Float32Array {
  const result = new Float32Array(matrix);
  result[12] = matrix[0] * tx + matrix[4] * ty + matrix[8] * tz + matrix[12];
  result[13] = matrix[1] * tx + matrix[5] * ty + matrix[9] * tz + matrix[13];
  result[14] = matrix[2] * tx + matrix[6] * ty + matrix[10] * tz + matrix[14];
  result[15] = matrix[3] * tx + matrix[7] * ty + matrix[11] * tz + matrix[15];
  return result;
}

export function rotateMatrix(
  matrix: Float32Array,
  angle: number,
  axis: number[]
): Float32Array {
  const x = axis[0],
    y = axis[1],
    z = axis[2];
  const len = Math.sqrt(x * x + y * y + z * z);
  if (len === 0) {
    console.error('Invalid rotation axis');
    return matrix;
  }
  // Normalize the axis
  const nx = x / len,
    ny = y / len,
    nz = z / len;
  const c = Math.cos(angle),
    s = Math.sin(angle),
    t = 1 - c;
  const x2 = nx * nx,
    y2 = ny * ny,
    z2 = nz * nz;
  const xy = nx * ny * t,
    xz = nx * nz * t,
    yz = ny * nz * t;
  const xs = nx * s,
    ys = ny * s,
    zs = nz * s;

  // prettier-ignore
  const rot = new Float32Array([
    x2 * t + c, xy - zs, xz + ys, 0, 
    xy + zs, y2 * t + c, yz - xs, 0, 
    xz - ys, yz + xs, z2 * t + c, 0,
    0, 0, 0, 1,
  ]);

  return multiplyMatrices(rot, matrix); // Changed order: rotation * matrix
}

export function multiplyMatrices(
  a: Float32Array,
  b: Float32Array
): Float32Array {
  const result = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result[i * 4 + j] =
        a[i * 4 + 0] * b[0 * 4 + j] +
        a[i * 4 + 1] * b[1 * 4 + j] +
        a[i * 4 + 2] * b[2 * 4 + j] +
        a[i * 4 + 3] * b[3 * 4 + j];
    }
  }
  return result;
}
