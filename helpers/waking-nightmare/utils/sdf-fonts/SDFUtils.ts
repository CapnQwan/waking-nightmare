import { TSDFGlyph, TSDFFontData } from './types/SDFFontData';

export class SDFUtils {
  public static readonly CHARACTER_DATA_CACHE: Map<
    string,
    Map<number, TSDFGlyph>
  > = new Map();

  // Function to find character data
  static findCharacterData(
    glyph: number,
    fontData: TSDFFontData
  ): TSDFGlyph | null {
    this.preComputeCharacterData(fontData);
    const characterDataMap = this.CHARACTER_DATA_CACHE.get(fontData.atlas.font);

    if (!characterDataMap) return null;

    return characterDataMap.get(glyph) || null;
  }

  static preComputeCharacterData(fontData: TSDFFontData): void {
    if (fontData.atlas.font in this.CHARACTER_DATA_CACHE) return;

    this.CHARACTER_DATA_CACHE.set(
      fontData.atlas.font,
      new Map<number, TSDFGlyph>()
    );

    const characterDataMap = this.CHARACTER_DATA_CACHE.get(fontData.atlas.font);

    if (!characterDataMap) return;

    for (const glyph of fontData.glyphs) {
      characterDataMap.set(glyph.unicode, glyph);
    }
  }
}
