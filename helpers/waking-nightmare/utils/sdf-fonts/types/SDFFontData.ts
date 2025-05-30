export type TSDFFontData = {
  pages: string[];
  chars: TSDFChar[];
  info: TSDFInfo;
  common: TSDFCommon;
  distanceField: TSDFDistanceField;
  kernings: TSDFKerning[];
};

export type TSDFChar = {
  id: number;
  index: number;
  char: string;
  width: number;
  height: number;
  xoffset: number;
  yoffset: number;
  xadvance: number;
  chnl: number;
  x: number;
  y: number;
  page: number;
};

export type TSDFInfo = {
  face: string;
  size: number;
  bold: number;
  italic: number;
  charset: string[];
  unicode: number;
  stretchH: number;
  smooth: number;
  aa: number;
  padding: number[];
  spacing: number[];
  outline: number;
};

export type TSDFCommon = {
  lineHeight: number;
  base: number;
  scaleW: number;
  scaleH: number;
  pages: number;
  packed: number;
  alphaChnl: number;
  redChnl: number;
  greenChnl: number;
  blueChnl: number;
};

export type TSDFDistanceField = {
  fieldType: string;
  distanceRange: number;
};

export type TSDFKerning = {
  first: number;
  second: number;
  amount: number;
};
