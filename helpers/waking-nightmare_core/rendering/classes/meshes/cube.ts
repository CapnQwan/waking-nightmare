import { Vector3 } from '@/helpers/waking-nightmare_core/utils/math/vectors/vector3';
import { Mesh } from '../mesh';

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

  mesh.normals = new Float32Array([
    // Front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // Back
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Left
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // Right
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // Top
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // Bottom
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ]);

  mesh.uvs = new Float32Array([
    // Front face
    0, 0, 1, 0, 0, 1, 1, 1,
    // Back face
    0, 0, 1, 0, 0, 1, 1, 1,
    // Left face
    0, 0, 1, 0, 0, 1, 1, 1,
    // Right face
    0, 0, 1, 0, 0, 1, 1, 1,
    // Top face
    0, 0, 1, 0, 0, 1, 1, 1,
    // Bottom face
    0, 0, 1, 0, 0, 1, 1, 1,
  ]);

  return mesh;
};
