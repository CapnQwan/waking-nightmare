import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { SDFUtils } from '@/helpers/waking-nightmare/utils/sdf-fonts/SDFUtils';
import sdfData from '@/public/sdf-fonts/fonts/roboto/Roboto-Regular.json';

export class TextMesh extends Mesh {
  constructor(text: string, fontSize: number) {
    super();
    this.generateTextGeometry(text, fontSize);
  }

  private generateTextGeometry(text: string, fontSize: number) {
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    let cursorX = 0;
    const scale = fontSize / sdfData.info.size;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charData = SDFUtils.findCharacterData(char, sdfData);
      if (!charData) continue;

      const width = charData.width * scale;
      const height = charData.height * scale;
      const xOffset = cursorX + charData.xoffset * scale;
      const yOffset = charData.yoffset * scale;

      // Vertex positions (quad for each character)
      const vertexIndex = vertices.length / 3;
      vertices.push(
        xOffset,
        yOffset,
        0, // Bottom-left
        xOffset + width,
        yOffset,
        0, // Bottom-right
        xOffset + width,
        yOffset + height,
        0, // Top-right
        xOffset,
        yOffset + height,
        0 // Top-left
      );

      // UV coordinates from SDF atlas
      const uvX = charData.x / sdfData.common.scaleW;
      const uvY = charData.y / sdfData.common.scaleH;
      const uvWidth = charData.width / sdfData.common.scaleW;
      const uvHeight = charData.height / sdfData.common.scaleH;
      uvs.push(
        uvX,
        uvY + uvHeight, // Bottom-left
        uvX + uvWidth,
        uvY + uvHeight, // Bottom-right
        uvX + uvWidth,
        uvY, // Top-right
        uvX,
        uvY // Top-left
      );

      // Indices for two triangles per quad
      indices.push(
        vertexIndex,
        vertexIndex + 1,
        vertexIndex + 2,
        vertexIndex,
        vertexIndex + 2,
        vertexIndex + 3
      );

      cursorX += charData.xadvance * scale; // Use xadvance for spacing
    }

    // Update mesh buffers
    this.verticies = new Float32Array(vertices);
    this.uvs = new Float32Array(uvs);
    this.triangles = new Uint16Array(indices);
  }

  public updateText(text: string, fontSize: number) {
    this.generateTextGeometry(text, fontSize);
  }
}
