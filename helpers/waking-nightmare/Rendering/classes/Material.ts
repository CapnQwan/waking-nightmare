import { Shader } from './Shader';
import ServiceLocator from '../../ServiceLocator/ServiceLocator';
import { Canvas } from '../Canvas';

/**
 * Configuration object for creating a new Material instance
 */
type MaterialConstructor = {
  /** The shader program to be used by this material */
  shader?: Shader;
  /** Optional uniforms to be passed to the shader program */
  uniforms?: Record<string, any>;
  /** Optional attributes to be passed to the shader program */
  attributes?: Record<string, any>;
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
  /** Collection of attributes to be passed to the shader program */
  attributes: Record<string, any>;

  /**
   * Creates a new Material instance
   * @param shader - The shader program to be used
   * @param uniforms - Optional initial uniform values
   */
  constructor({ shader, uniforms = {}, attributes = {} }: MaterialConstructor) {
    this.shader = shader ?? new Shader({});
    this.uniforms = uniforms;
    this.attributes = attributes;
  }

  /**
   * Activates this material's shader program for rendering
   * This must be called before rendering any geometry with this material
   */
  use() {
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;
    gl.useProgram(this.shader.program);
  }

  /**
   * Sets a uniform value for this material
   * @param name - The name of the uniform as defined in the shader
   * @param value - The value to set for the uniform
   */
  setUniform(name: string, value: number | Float32Array) {
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
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;

    for (const [name, value] of Object.entries(this.uniforms)) {
      const location = gl.getUniformLocation(this.shader.program, name);
      if (!location) {
        console.warn(`Uniform ${name} not found in shader`);
        continue;
      }

      if (typeof value === 'number') {
        gl.uniform1f(location, value);
      } else if (value instanceof Float32Array) {
        if (value.length === 4) {
          gl.uniform4fv(location, value);
        } else if (value.length === 3) {
          gl.uniform3fv(location, value);
        } else if (value.length === 2) {
          gl.uniform2fv(location, value);
        } else if (value.length === 9) {
          gl.uniformMatrix3fv(location, false, value);
        } else if (value.length === 16) {
          gl.uniformMatrix4fv(location, false, value);
        }
      }
    }
  }

  bindAttribute(attributeName: string, buffer: WebGLBuffer, size: number) {
    /**
     * TODO: See if there is a better way of binging the attributes. Maybe binding them in the mesh class would be better?
     * There is a bit of an issue with the location of the attributes potentially miss aligining in the shader if certain items
     * are not used. that is why currently the normal attribute is bount to location 1 and the uv attribute is bound to location 2.
     */
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;
    const location = gl.getAttribLocation(this.shader.program, attributeName);

    gl.enableVertexAttribArray(location);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  }
}
