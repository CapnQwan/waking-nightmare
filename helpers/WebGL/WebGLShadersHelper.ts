/** Creates a WebGL shader program from a shader source */
const createShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/** Vertex shader singleton, initializes it or retreives it if it's already been initialized */
const VERTEX_SHADERS: Record<string, WebGLShader> = {};
export const getVertexShader = (
  key: string,
  gl: WebGLRenderingContext,
  source: string
): WebGLShader | null => {
  if (key in VERTEX_SHADERS) {
    return VERTEX_SHADERS[key];
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, source);
  if (vertexShader) {
    VERTEX_SHADERS[key] = vertexShader;
    return VERTEX_SHADERS[key];
  }

  return null;
};

/** Fragment shader singleton, initializes it or retreives it if it's already been initialized */
const FRAGMENT_SHADERS: Record<string, WebGLShader> = {};
export const getFragmentShader = (
  key: string,
  gl: WebGLRenderingContext,
  source: string
): WebGLShader | null => {
  if (key in FRAGMENT_SHADERS) {
    return FRAGMENT_SHADERS[key];
  }

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, source);
  if (fragmentShader) {
    FRAGMENT_SHADERS[key] = fragmentShader;
    return FRAGMENT_SHADERS[key];
  }

  return null;
};
