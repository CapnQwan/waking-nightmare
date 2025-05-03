import { Canvas } from '../waking-nightmare/Rendering/Canvas';
import ServiceLocator from '../waking-nightmare/ServiceLocator/ServiceLocator';
import { SHADER_IDS } from './WebGLShadersHelper';

/** Creates a WebGL shader program from a vertex shader and fragment shader */
const createProgram = (
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram => {
  const gl = ServiceLocator.get<Canvas>(Canvas).gl;

  const program = gl.createProgram();
  if (!program) {
    throw new Error('Unable to create shader program');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  return program;
};

/** WebGL program cache */
const PROGRAMS: Map<string, WebGLProgram> = new Map();

export const getProgram = (
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram => {
  // Generate a key from shader IDs
  const vertexId = SHADER_IDS.get(vertexShader) ?? 'unknown';
  const fragmentId = SHADER_IDS.get(fragmentShader) ?? 'unknown';
  const programKey = `${vertexId}_${fragmentId}`;

  const cachedProgram = PROGRAMS.get(programKey);
  if (cachedProgram) {
    return cachedProgram;
  }

  const program = createProgram(vertexShader, fragmentShader);
  if (!program) {
    throw new Error('Unable to create program');
  }

  PROGRAMS.set(programKey, program);
  return program;
};
