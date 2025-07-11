import { Vector3 } from '@/helpers/waking-nightmare/waking-nightmare_core/utils/math/vectors/vector3';
import { Mesh } from '../mesh';

type TGenerateDoubleSidedQuadOptions = {
  xOffset?: number;
  yOffset?: number;
};

export function generateDoubleSidedQuad(
  width: number,
  height: number,
  options?: TGenerateDoubleSidedQuadOptions
): Mesh {
  const { xOffset = 0, yOffset = 0 } = options || {};
  const mesh = new Mesh();
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;

  mesh.verticies = [
    new Vector3(-halfWidth, -halfHeight, 0),
    new Vector3(halfWidth, -halfHeight, 0),
    new Vector3(-halfWidth, halfHeight, 0),
    new Vector3(halfWidth, halfHeight, 0),
  ];

  mesh.triangles = new Uint16Array([
    // first triangle
    0, 1, 2,
    // second triangle
    1, 2, 3,
  ]);

  return mesh;
}
