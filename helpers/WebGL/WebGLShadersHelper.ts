import { Canvas } from '../waking-nightmare/Rendering/Canvas';
import ServiceLocator from '../waking-nightmare/ServiceLocator/ServiceLocator';

let shaderIdCounter = 0;
export const SHADER_IDS: WeakMap<WebGLShader, number> = new WeakMap();

/** Creates a WebGL shader program from a vertex shader and fragment shader */
const createShader = (type: GLenum, source: string): WebGLShader | null => {
  const gl = ServiceLocator.get<Canvas>(Canvas).gl;

  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('Unable to create shader program');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  SHADER_IDS.set(shader, shaderIdCounter++);
  return shader;
};

/** Vertex shader cache */
const VERTEX_SHADERS: Map<string, WebGLShader> = new Map();
export const getVertexShader = (shaderSource: string): WebGLShader => {
  const gl = ServiceLocator.get<Canvas>(Canvas).gl;

  const cachedShader = VERTEX_SHADERS.get(shaderSource);
  if (cachedShader) {
    return cachedShader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, shaderSource);
  if (!vertexShader) {
    throw new Error(
      `Failed to create vertex shader for source: ${shaderSource}`
    );
  }

  VERTEX_SHADERS.set(shaderSource, vertexShader);
  return vertexShader;
};

/** Fragment shader cache */
const FRAGMENT_SHADERS: Map<string, WebGLShader> = new Map();
export const getFragmentShader = (shaderSource: string): WebGLShader => {
  const gl = ServiceLocator.get<Canvas>(Canvas).gl;

  const cachedShader = FRAGMENT_SHADERS.get(shaderSource);
  if (cachedShader) {
    return cachedShader;
  }

  const fragmentShader = createShader(gl.FRAGMENT_SHADER, shaderSource);
  if (!fragmentShader) {
    throw new Error(
      `Failed to create fragment shader for source: ${shaderSource}`
    );
  }

  FRAGMENT_SHADERS.set(shaderSource, fragmentShader);
  return fragmentShader;
};
