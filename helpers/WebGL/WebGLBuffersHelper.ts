/** WebGL buffers singleton, initializes it or retreives it if it's already been initialized */
const BUFFERS: Record<string, WebGLBuffer> = {};
export const getBuffer = (key: string, gl: WebGLRenderingContext): WebGLBuffer | null => {
  if (key in BUFFERS) {
    return BUFFERS[key];
  }

  const buffer = gl.createBuffer();
  if (!buffer) return null;
  BUFFERS[key] = buffer;
  return BUFFERS[key];
};

/** Retrieves or initializes the WebGL buffer and then binds it to the context */
export const bindBuffer = (key: string, gl: WebGLRenderingContext): void => {
  const buffer = getBuffer(key, gl);
  if (buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, BUFFERS[key]);
  }
};
