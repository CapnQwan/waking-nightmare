import {
  IMaterialConstructor,
  Material,
} from '../../Rendering/classes/Material';
import defaultLitVertexShader from '@/public/shaders/defaultLitVertexShader.glsl';
import defaultLitFragmentShader from '@/public/shaders/defaultLitFragmentShader.glsl';
import {
  getVertexShader,
  getFragmentShader,
} from '@/helpers/WebGL/WebGLShadersHelper';
import { Shader } from '../../Rendering/classes/Shader';

export interface ILitMaterialConstructor extends IMaterialConstructor {}

export class LitMaterial extends Material {
  constructor(params: ILitMaterialConstructor) {
    if (!params.shader) {
      params.shader = new Shader({
        vertexShader: getVertexShader(defaultLitVertexShader),
        fragmentShader: getFragmentShader(defaultLitFragmentShader),
      });
    }

    super(params);
  }
}
