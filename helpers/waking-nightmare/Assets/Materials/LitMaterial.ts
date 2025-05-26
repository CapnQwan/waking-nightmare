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

export interface ILitMaterialConstructor extends IMaterialConstructor {
  lightPosition?: Float32Array;
  lightAmbient?: Float32Array;
  lightDiffuse?: Float32Array;
  lightSpecular?: Float32Array;
  ambientColor?: Float32Array;
  diffuse?: Float32Array;
  specular?: Float32Array;
  shininess?: number;
}

export class LitMaterial extends Material {
  /** TODO: move these values to a lighting component of sorts */
  private lightPosition: Float32Array;
  private lightAmbient: Float32Array;
  private lightDiffuse: Float32Array;
  private lightSpecular: Float32Array;

  private ambientColor: Float32Array;
  private diffuse: Float32Array;
  private specular: Float32Array;
  private shininess: number;

  constructor(params: ILitMaterialConstructor) {
    super(params);
    this.shader =
      params.shader ??
      new Shader({
        vertexShader: getVertexShader(defaultLitVertexShader),
        fragmentShader: getFragmentShader(defaultLitFragmentShader),
      });

    this.lightPosition =
      params.lightPosition ?? new Float32Array([-2.0, 2.0, -5.0]);
    this.lightAmbient =
      params.lightAmbient ?? new Float32Array([0.5, 0.5, 0.5]);
    this.lightDiffuse = params.diffuse ?? new Float32Array([0.2, 0.2, 0.2]);
    this.lightSpecular =
      params.lightSpecular ?? new Float32Array([0.75, 0.75, 0.75]);

    this.ambientColor =
      params.ambientColor ?? new Float32Array([0.2, 0.2, 0.2]);
    this.diffuse = params.diffuse ?? new Float32Array([0.8, 0.8, 0.8]);
    this.specular = params.specular ?? new Float32Array([1.0, 1.0, 1.0]);
    this.shininess = params.shininess ?? 32.0;
  }

  bindLightUniforms() {
    this.setUniform('uLightPosition', this.lightPosition);
    this.setUniform('uLightAmbient', this.lightAmbient);
    this.setUniform('uLightDiffuse', this.lightDiffuse);
    this.setUniform('uLightSpecular', this.lightSpecular);
  }

  bindMaterialUniforms() {
    this.setUniform('uAmbientColor', this.ambientColor);
    this.setUniform('uDiffuse', this.diffuse);
    this.setUniform('uSpecular', this.specular);
    this.setUniform('uShininess', this.shininess);
  }
}
