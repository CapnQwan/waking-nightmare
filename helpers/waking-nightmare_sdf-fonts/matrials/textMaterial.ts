import {
  IMaterialConstructor,
  Material,
} from '@/helpers/waking-nightmare_core/rendering/classes/material';
import { Shader } from '@/helpers/waking-nightmare_core/rendering/classes/shader';
import defaultLitVertexShader from '@/public/shaders/defaultLitVertexShader.glsl';
import defaultLitFragmentShader from '@/public/shaders/defaultLitFragmentShader.glsl';
import {
  getVertexShader,
  getFragmentShader,
} from '@/helpers/webGL/webGLShadersHelper';

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
