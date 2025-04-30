import {
  getFragmentShader,
  getVertexShader,
} from '@/helpers/WebGL/WebGLShadersHelper';
import defaultVertexShader from '@/public/shaders/defaultVertexShader.glsl';
import defaultFragmentShader from '@/public/shaders/defaultFragmentShader.glsl';
import ServiceLocator from '../../ServiceLocator/ServiceLocator';
import { Canvas } from '../Canvas';
import { getProgram } from '@/helpers/WebGL/WebGLProgramsHelper';

/**
 * Configuration object for creating a new Shader instance
 */
interface shaderConstructor {
  /** Optional custom vertex shader. If not provided, uses the default vertex shader */
  vertexShader?: WebGLShader;
  /** Optional custom fragment shader. If not provided, uses the default fragment shader */
  fragmentShader?: WebGLShader;
}

/**
 * Shader class manages WebGL shader programs for rendering.
 * It handles the creation and management of vertex and fragment shaders,
 * and provides methods to update them during runtime.
 */
export class Shader {
  /** The vertex shader program */
  private _vertexShader: WebGLShader;
  /** The fragment shader program */
  private _fragmentShader: WebGLShader;
  /** The compiled and linked WebGL program */
  private _program: WebGLProgram;

  get program() {
    return this._program;
  }

  /**
   * Creates a new Shader instance
   * @param vertexShader - Optional custom vertex shader
   * @param fragmentShader - Optional custom fragment shader
   */
  constructor({ vertexShader, fragmentShader }: shaderConstructor) {
    this._vertexShader = vertexShader ?? getVertexShader(defaultVertexShader);
    this._fragmentShader =
      fragmentShader ?? getFragmentShader(defaultFragmentShader);
    this._program = getProgram(this._vertexShader, this._fragmentShader);
  }

  /**
   * Recreates the WebGL program by linking the current vertex and fragment shaders
   * This is called automatically when shaders are updated
   */
  createProgram() {
    const gl = ServiceLocator.get<Canvas>('canvas').gl;
    this._program = getProgram(this._vertexShader, this._fragmentShader);
  }

  /**
   * Updates the vertex shader and recreates the program
   * @param vertexShader - The new vertex shader to use
   */
  updateVertexShader(vertexShader: WebGLShader) {
    this._vertexShader = vertexShader;
    this.createProgram();
  }

  /**
   * Updates the fragment shader and recreates the program
   * @param fragmentShader - The new fragment shader to use
   */
  updateFragmentShader(fragmentShader: WebGLShader) {
    this._fragmentShader = fragmentShader;
    this.createProgram();
  }
}
