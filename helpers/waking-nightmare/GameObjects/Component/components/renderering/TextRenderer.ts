import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Shader } from '@/helpers/waking-nightmare/Rendering/classes/Shader';
import {
  IRenderComponentConstructor,
  RendererComponent,
} from './RendererComponent';
import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { generateQuad } from '@/helpers/waking-nightmare/Rendering/classes/Meshes/Quad';
import { SDFUtils } from '@/helpers/waking-nightmare/utils/sdf-fonts/SDFUtils';
import { Matrix4x4 } from '@/helpers/waking-nightmare/utils/math/Matrix/Matrix4x4';

import sdfImage from '@/public/sdf-fonts/fonts/roboto/Roboto-Regular.png';
import sdfData from '@/public/sdf-fonts/fonts/roboto/Roboto-Regular.json';
import defaultTextVertexShader from '@/public/shaders/defaultLitVertexShader.glsl';
import defaultTextFragmentShader from '@/public/shaders/defaultLitFragmentShader.glsl';
/**
 * TODO:
 * As this component extends RendererComponent, it will have an empty Mesh class attached to it.
 * As this class opts to use an array of meshes, is there a better option than extending RendererComponent?
 */

export interface ITextRendererComponent extends IRenderComponentConstructor {
  text: string;
  fontSize: number;
  material?: Material;
}

export class TextRenderer extends RendererComponent {
  public text: string;
  public fontSize: number;

  // Convert this to a TextMesh class that extends Mesh if that's possible
  private meshes: Mesh[] = [];

  constructor(params: ITextRendererComponent) {
    if (!params.material) {
      const shader = new Shader({});
      //{
      //  vertexShader: defaultTextVertexShader,
      //  fragmentShader: defaultTextFragmentShader,
      //});
      params.material = new Material({ shader });
    }

    super(params);

    this.text = params.text;
    this.fontSize = params.fontSize;

    // Create meshes based on the text and font size
    this.createMeshes();
  }

  public renderComponent(viewMatrix: Matrix4x4, projectionMatrix: Matrix4x4) {
    const modelMatrix = this.transform?.getModelMatrix();

    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    this.material.use();

    // Set up MVP properties
    this.material.setUniform('uProjectionMatrix', projectionMatrix.elements);
    this.material.setUniform('uViewMatrix', viewMatrix.elements);
    this.material.setUniform('uModelMatrix', modelMatrix.elements);

    for (const mesh of this.meshes) {
      if (mesh.vbo) this.material.bindAttribute('aPosition', mesh.vbo, 3);
      if (mesh.uvbo) this.material.bindAttribute('aUV', mesh.uvbo, 2);
      if (mesh.nbo) this.material.bindAttribute('aNormal', mesh.nbo, 3);

      mesh.draw();
    }
  }

  private createMeshes() {
    let cursorX = 0;

    const scale = this.fontSize / sdfData.info.size; // Normalize to font's base size

    for (let char of this.text) {
      const charData = SDFUtils.findCharacterData(char, sdfData);

      if (!charData) continue;

      const width = charData.width * scale;
      const height = charData.height * scale;
      const xOffset = cursorX + charData.xoffset * scale;
      const yOffset = charData.yoffset * scale;

      const quad = generateQuad(width, height, { xOffset, yOffset });
      cursorX += width + charData.xoffset * scale;
      this.meshes.push(quad);
    }
  }
}
