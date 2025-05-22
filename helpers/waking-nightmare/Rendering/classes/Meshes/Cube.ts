import { Vector3 } from '@/helpers/waking-nightmare/utils/math/Vectors/Vector3';
import { Mesh } from '../Mesh';

export const generateCube = (
  width: number,
  height: number,
  depth: number
): Mesh => {
  const mesh = new Mesh();

  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  const halfDepth = depth * 0.5;

  mesh.verticies = [
    // Front face
    new Vector3(-halfWidth, -halfHeight, halfDepth),
    new Vector3(halfWidth, -halfHeight, halfDepth),
    new Vector3(-halfWidth, halfHeight, halfDepth),
    new Vector3(halfWidth, halfHeight, halfDepth),

    // Back face
    new Vector3(-halfWidth, -halfHeight, -halfDepth),
    new Vector3(halfWidth, -halfHeight, -halfDepth),
    new Vector3(-halfWidth, halfHeight, -halfDepth),
    new Vector3(halfWidth, halfHeight, -halfDepth),

    // Left face
    new Vector3(-halfWidth, -halfHeight, -halfDepth),
    new Vector3(-halfWidth, -halfHeight, halfDepth),
    new Vector3(-halfWidth, halfHeight, -halfDepth),
    new Vector3(-halfWidth, halfHeight, halfDepth),

    // Right face
    new Vector3(halfWidth, -halfHeight, -halfDepth),
    new Vector3(halfWidth, -halfHeight, halfDepth),
    new Vector3(halfWidth, halfHeight, -halfDepth),
    new Vector3(halfWidth, halfHeight, halfDepth),

    // Top face
    new Vector3(-halfWidth, halfHeight, -halfDepth),
    new Vector3(halfWidth, halfHeight, -halfDepth),
    new Vector3(-halfWidth, halfHeight, halfDepth),
    new Vector3(halfWidth, halfHeight, halfDepth),

    // Bottom face
    new Vector3(-halfWidth, -halfHeight, -halfDepth),
    new Vector3(halfWidth, -halfHeight, -halfDepth),
    new Vector3(-halfWidth, -halfHeight, halfDepth),
    new Vector3(halfWidth, -halfHeight, halfDepth),
  ];

  mesh.triangles = new Uint16Array([
    // Front face
    0, 1, 2, 1, 3, 2,
    // Back face
    4, 5, 6, 5, 7, 6,
    // Left face
    8, 9, 10, 9, 11, 10,
    // Right face
    12, 13, 14, 13, 15, 14,
    // Top face
    16, 17, 18, 17, 19, 18,
    // Bottom face
    20, 21, 22, 21, 23, 22,
  ]);

  mesh.recalculateNormals();

  return mesh;
};
