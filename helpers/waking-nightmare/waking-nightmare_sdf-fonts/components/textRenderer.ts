import { Shader } from '@/helpers/waking-nightmare/waking-nightmare_core/rendering/classes/shader';
import { Material } from '@/helpers/waking-nightmare/waking-nightmare_core/rendering/classes/material';
import { Matrix4x4 } from '@/helpers/waking-nightmare/waking-nightmare_core/utils/math/martix/matrix4x4';

import sdfData from '@/public/sdf-fonts/fonts/roboto/roboto_regular_sdf.json';
import defaultTextVertexShader from '../shaders/defaultTextVertexShader.glsl';
import defaultTextFragmentShader from '../shaders/defaultTextFragmentShader.glsl';
import { TextMesh } from '@/helpers/waking-nightmare/waking-nightmare_sdf-fonts/textMesh';
import {
  IRenderComponentConstructor,
  RendererComponent,
} from '@/helpers/waking-nightmare/waking-nightmare_core/rendering/components/rendererComponent';
import {
  getVertexShader,
  getFragmentShader,
} from '@/helpers/webGL/webGLShadersHelper';

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
