import { Shader } from '@/helpers/waking-nightmare/Rendering/classes/Shader';
import {
  IRenderComponentConstructor,
  RendererComponent,
} from './RendererComponent';
import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Matrix4x4 } from '@/helpers/waking-nightmare/utils/math/Matrix/Matrix4x4';

import sdfData from '@/public/sdf-fonts/fonts/roboto/roboto_regular_sdf.json';
import defaultTextVertexShader from '@/public/shaders/defaultTextVertexShader.glsl';
import defaultTextFragmentShader from '@/public/shaders/defaultTextFragmentShader.glsl';
import { TextMesh } from '@/helpers/waking-nightmare/Rendering/classes/TextMesh';
import {
  getVertexShader,
  getFragmentShader,
} from '@/helpers/WebGL/WebGLShadersHelper';

export interface ITextRendererComponent extends IRenderComponentConstructor {
  text: string;
  fontSize: number;
  material?: Material;
}

export class TextRenderer extends RendererComponent {
  public text: string;
  public fontSize: number;
  public mesh: TextMesh;

  constructor(params: ITextRendererComponent) {
    if (!params.material) {
      const vertexShader = getVertexShader(defaultTextVertexShader);
      const fragmentShader = getFragmentShader(defaultTextFragmentShader);
      const shader = new Shader({ vertexShader, fragmentShader });
      params.material = new Material({ shader });
    }

    super(params);

    this.text = params.text;
    this.fontSize = params.fontSize;
    this.material = params.material!;
    this.mesh = new TextMesh(this.text, this.fontSize);
  }

  public renderComponent(viewMatrix: Matrix4x4, projectionMatrix: Matrix4x4) {
    const modelMatrix = this.transform?.getModelMatrix();
    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    this.material.use();

    this.material.setUniform('uProjectionMatrix', projectionMatrix.elements);
    this.material.setUniform('uViewMatrix', viewMatrix.elements);
    this.material.setUniform('uModelMatrix', modelMatrix.elements);

    this.material.bindTexture('uSDFTexture', sdfData.atlas.src, 0);

    if (this.mesh.vbo)
      this.material.bindAttribute('aPosition', this.mesh.vbo, 3);
    if (this.mesh.uvbo) this.material.bindAttribute('aUV', this.mesh.uvbo, 2);

    this.mesh.draw();
  }

  public updateText(newText: string) {
    this.text = newText;
    this.mesh.updateText(newText, this.fontSize);
  }
}
