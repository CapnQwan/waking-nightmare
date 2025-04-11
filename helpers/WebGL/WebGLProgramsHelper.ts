import { getFragmentShader, getVertexShader } from './WebGLShadersHelper';

/** Creates a WebGL shader program from a vertex shader and fragment shader */
const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

/** Shadow shader program singleton, initializes it or retreives it if it's already been initialized */
const PROGRAMS: Record<string, WebGLProgram> = {};
export const getProgram = (
  key: string,
  gl: WebGLRenderingContext,
  vertexShaderOrSource: WebGLShader | string,
  fragmentShaderOrSource: WebGLShader | string
): WebGLProgram | null => {
  if (key in PROGRAMS) {
    return PROGRAMS[key];
  }

  const vertexShader =
    typeof vertexShaderOrSource === 'string'
      ? getVertexShader(`${key}_vertex_shader`, gl, vertexShaderOrSource)
      : vertexShaderOrSource;
  const fragmentShader =
    typeof fragmentShaderOrSource === 'string'
      ? getFragmentShader(`${key}_fragment_shader`, gl, fragmentShaderOrSource)
      : vertexShaderOrSource;

  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (program) {
    PROGRAMS[key] = program;
    return PROGRAMS[key];
  }

  return null;
};
