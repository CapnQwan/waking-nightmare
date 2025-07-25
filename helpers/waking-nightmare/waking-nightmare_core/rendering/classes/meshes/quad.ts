import { Vector3 } from '@/helpers/waking-nightmare/waking-nightmare_core/utils/math/vectors/vector3';
import { Mesh } from '../mesh';

type TGenerateQuadOptions = {
  xOffset?: number;
  yOffset?: number;
};

/** Generates a mesh  */
export function generateQuad(
  width: number,
  height: number,
  options?: TGenerateQuadOptions
): Mesh {
  const { xOffset = 0, yOffset = 0 } = options || {};

  const mesh = new Mesh();

  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;

  mesh.verticies = [
    new Vector3(-halfWidth + xOffset, -halfHeight + yOffset, 0),
    new Vector3(halfWidth + xOffset, -halfHeight + yOffset, 0),
    new Vector3(-halfWidth + xOffset, halfHeight + yOffset, 0),
    new Vector3(halfWidth + xOffset, halfHeight + yOffset, 0),
  ];

  mesh.triangles = new Uint16Array([
    // first triangle
    0, 1, 2,
    // second triangle
    1, 2, 3,
  ]);

  return mesh;
}
