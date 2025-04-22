export const generateQuad = (width: number, height: number) => {
  const vertices = new Float32Array([
    // positions        // texture coords
    -width / 2,
    -height / 2,
    0,
    0,
    0,
    width / 2,
    -height / 2,
    1,
    0,
    0,
    width / 2,
    height / 2,
    1,
    1,
    0,
    -width / 2,
    height / 2,
    0,
    1,
    0,
  ]);

  const indices = new Uint16Array([
    // first triangle
    0, 1, 2,
    // second triangle
    0, 2, 3,
  ]);

  return { vertices, indices };
};
