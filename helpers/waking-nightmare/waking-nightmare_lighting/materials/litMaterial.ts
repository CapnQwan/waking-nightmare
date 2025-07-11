import defaultLitVertexShader from '../shaders/defaultLitVertexShader.glsl';
import defaultLitFragmentShader from '../shaders/defaultLitFragmentShader.glsl';
import {
  IMaterialConstructor,
  Material,
} from '@/helpers/waking-nightmare/waking-nightmare_core/rendering/classes/material';
import { Shader } from '@/helpers/waking-nightmare/waking-nightmare_core/rendering/classes/shader';
import {
  getVertexShader,
  getFragmentShader,
} from '@/helpers/webGL/webGLShadersHelper';

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
    if (!params.shader) {
      params.shader = new Shader({
        vertexShader: getVertexShader(defaultLitVertexShader),
        fragmentShader: getFragmentShader(defaultLitFragmentShader),
      });
    }

    super(params);

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

    this.use();
    this.bindLightUniforms();
    this.bindMaterialUniforms();
  }

  bindLightUniforms() {
    this.setUniform('uLightPosition', this.lightPosition);
    this.setUniform('uLightAmbient', this.lightAmbient);
    this.setUniform('uLightDiffuse', this.lightDiffuse);
    this.setUniform('uLightSpecular', this.lightSpecular);
  }

  bindMaterialUniforms() {
    this.setUniform('uMaterialAmbient', this.ambientColor);
    this.setUniform('uMaterialDiffuse', this.diffuse);
    this.setUniform('uMaterialSpecular', this.specular);
    this.setUniform('uMaterialShininess', this.shininess);
  }
}
