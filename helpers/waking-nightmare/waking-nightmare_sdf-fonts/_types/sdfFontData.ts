export type TSDFFontData = {
  atlas: TSDFAtlas;
  glyphs: TSDFGlyph[];
  metrics: TSDFMetrics;
  kerning: TSDFKerning[];
};

export type TSDFAtlas = {
  type: 'sdf' | 'msdf' | 'psdf' | 'mtsdf' | string;
  font: string;
  src: string;
  distanceRange: number;
  distanceRangeMiddle: number;
  size: number;
  width: number;
  height: number;
  yOrigin: 'bottom' | 'top' | string;
};

export type TSDFMetrics = {
  emSize: number;
  lineHeight: number;
  ascender: number;
  descender: number;
  underlineY: number;
  underlineThickness: number;
};

export type TSDFGlyph = {
  unicode: number;
  advance: number;
  planeBounds?: TPlaneBounds;
  atlasBounds?: TAtlasBounds;
};

export type TSDFKerning = {};

export type TPlaneBounds = {
  left: number;
  bottom: number;
  right: number;
  top: number;
};

export type TAtlasBounds = {
  left: number;
  bottom: number;
  right: number;
  top: number;
};
