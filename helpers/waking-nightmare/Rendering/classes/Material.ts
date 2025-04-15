import { Shader } from './Shader';
import ServiceLocator from '../../ServiceLocator/ServiceLocator';
import Canvas from '../Canvas';

/**
 * Configuration object for creating a new Material instance
 */
type MaterialConstructor = {
  /** The shader program to be used by this material */
  shader: Shader;
  /** Optional uniforms to be passed to the shader program */
  uniforms?: Record<string, any>;
};

/**
 * Material class represents a WebGL material that can be applied to meshes.
 * It wraps a shader program and manages uniform values that can be passed to the shader.
 */
export class Material {
  /** The shader program associated with this material */
  shader: Shader;
  /** Collection of uniform values to be passed to the shader program */
  uniforms: Record<string, any>;

  /**
   * Creates a new Material instance
   * @param shader - The shader program to be used
   * @param uniforms - Optional initial uniform values
   */
  constructor({ shader, uniforms = {} }: MaterialConstructor) {
    this.shader = shader;
    this.uniforms = uniforms;
  }

  /**
   * Activates this material's shader program for rendering
   * This must be called before rendering any geometry with this material
   */
  use() {
    const gl = ServiceLocator.get<Canvas>('canvas').gl;
    gl.useProgram(this.shader.program);
  }

  /**
   * Sets a uniform value for this material
   * @param name - The name of the uniform as defined in the shader
   * @param value - The value to set for the uniform
   */
  setUniform(name: string, value: any) {
    this.uniforms[name] = value;
  }

  /**
   * Updates all uniform values in the shader program
   * Automatically detects the type of uniform and uses the appropriate WebGL uniform function
   * Supported types:
   * - Numbers (uniform1f)
   * - Float32Array of length 2 (uniform2fv)
   * - Float32Array of length 3 (uniform3fv)
   * - Float32Array of length 4 (uniform4fv)
   * - Float32Array of length 16 (uniformMatrix4fv)
   */
  updateUniforms() {
    const gl = ServiceLocator.get<Canvas>('canvas').gl;
    this.use();

    for (const [name, value] of Object.entries(this.uniforms)) {
      const location = gl.getUniformLocation(this.shader.program, name);
      if (!location) continue;

      if (typeof value === 'number') {
        gl.uniform1f(location, value);
      } else if (value instanceof Float32Array) {
        if (value.length === 4) {
          gl.uniform4fv(location, value);
        } else if (value.length === 3) {
          gl.uniform3fv(location, value);
        } else if (value.length === 2) {
          gl.uniform2fv(location, value);
        }
      } else if (value instanceof Float32Array && value.length === 16) {
        gl.uniformMatrix4fv(location, false, value);
      }
    }
  }
}
