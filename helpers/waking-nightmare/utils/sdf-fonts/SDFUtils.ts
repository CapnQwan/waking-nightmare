import { TSDFChar, TSDFFontData } from './types/SDFFontData';

export class SDFUtils {
  public static readonly CHARACTER_DATA_CACHE: Map<
    string,
    Map<string, TSDFChar>
  > = new Map();

  // Function to find character data
  static findCharacterData(
    char: string,
    fontData: TSDFFontData
  ): TSDFChar | null {
    if (!(fontData.info.face in fontData))
      this.preComputeCharacterData(fontData);

    const characterDataMap = this.CHARACTER_DATA_CACHE.get(fontData.info.face);

    if (!characterDataMap) return null;

    return characterDataMap.get(char) || null;
  }

  static preComputeCharacterData(fontData: TSDFFontData): void {
    if (fontData.info.face in fontData) return;

    this.CHARACTER_DATA_CACHE.set(
      fontData.info.face,
      new Map<string, TSDFChar>()
    );

    const characterDataMap = this.CHARACTER_DATA_CACHE.get(fontData.info.face);

    if (!characterDataMap) return;

    for (const char of fontData.chars) {
      characterDataMap.set(char.char, char);
    }
  }
}
