import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { SDFUtils } from '@/helpers/waking-nightmare/utils/sdf-fonts/SDFUtils';
import sdfData from '@/public/sdf-fonts/fonts/roboto/roboto_regular_sdf.json';

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
    const scale = fontSize / sdfData.metrics.emSize;

    for (let i = 0; i < text.length; i++) {
      const glyph = text[i];
      const glyphUnicode = glyph.charCodeAt(0);
      const charData = SDFUtils.findCharacterData(glyphUnicode, sdfData);
      if (!charData) continue;

      const glyphPlaneLeft = charData.planeBounds?.left || 0;
      const glyphPlaneRight = charData.planeBounds?.right || 0;
      const glyphPlaneTop = charData.planeBounds?.top || 0;
      const glyphPlaneBottom = charData.planeBounds?.bottom || 0;
      const glyphAtlasLeft = charData.atlasBounds?.left || 0;
      const glyphAtlasRight = charData.atlasBounds?.right || 0;
      const glyphAtlasTop = charData.atlasBounds?.top || 0;
      const glyphAtlasBottom = charData.atlasBounds?.bottom || 0;

      const glyphPlaneWidth = glyphPlaneRight - glyphPlaneLeft;
      const glyphPlaneHeight = glyphPlaneTop - glyphPlaneBottom;
      const glyphAtlasWidth = glyphAtlasRight - glyphAtlasLeft;
      const glyphAtlasHeight = glyphAtlasTop - glyphAtlasBottom;

      const width = glyphPlaneWidth * scale;
      const height = glyphPlaneHeight * scale;
      const xOffset = cursorX + glyphPlaneLeft * scale;
      const yOffset = (charData.planeBounds?.bottom || 0) * scale;

      const vertexIndex = vertices.length / 3;
      // prettier-ignore
      vertices.push(
        // Bottom-left
        xOffset, yOffset + height, 0,
        // Bottom-right
        xOffset + width, yOffset + height, 0,
        // Top-right
        xOffset + width, yOffset, 0,
        // Top-left
        xOffset, yOffset, 0
      );

      // UV coordinates from SDF atlas
      const atlasWidth = sdfData.atlas.width;
      const atlasHeight = sdfData.atlas.height;
      const uvX = glyphAtlasLeft / atlasWidth;
      const uvY = (atlasHeight - glyphAtlasTop) / atlasHeight;
      const uvWidth = glyphAtlasWidth / atlasWidth;
      const uvHeight = glyphAtlasHeight / atlasHeight;

      // prettier-ignore
      uvs.push(
         // Bottom-left
        uvX, uvY,
        // Bottom-right
        uvX + uvWidth, uvY, 
         // Top-right
        uvX + uvWidth, uvY + uvHeight,
        // Top-left
        uvX, uvY  + uvHeight
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

      cursorX += charData.advance * scale;
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
