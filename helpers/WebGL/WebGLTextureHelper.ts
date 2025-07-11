import { gl } from '../waking-nightmare_core/rendering/canvas';

const LEVEL = 0;
const INTERNAL_FORMAT = gl.RGBA;
const WIDTH = 1;
const HEIGHT = 1;
const BORDER = 0;
const SRC_FORMAT = gl.RGBA;
const SRC_TYPE = gl.UNSIGNED_BYTE;
const PIXEL = new Uint8Array([252, 56, 255, 255]);

const TEXTURE_CACHE: Map<string, WebGLTexture> = new Map();
export function getTexture(url: string): WebGLTexture {
  if (TEXTURE_CACHE.has(url)) {
    return TEXTURE_CACHE.get(url)!;
  }

  const image = new Image();
  image.src = url;

  const texture = gl.createTexture() as WebGLTexture;
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(
    gl.TEXTURE_2D,
    LEVEL,
    INTERNAL_FORMAT,
    WIDTH,
    HEIGHT,
    BORDER,
    SRC_FORMAT,
    SRC_TYPE,
    PIXEL
  );

  // Set initial texture filtering for the placeholder
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Set the temporary texture in the cache to avoid reloading the image
  TEXTURE_CACHE.set(url, texture);

  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      LEVEL,
      INTERNAL_FORMAT,
      SRC_FORMAT,
      SRC_TYPE,
      image
    );

    // Generate mipmaps for better quality at different distances
    gl.generateMipmap(gl.TEXTURE_2D);

    // Set texture filtering for smooth appearance
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Set texture wrapping (optional, but good practice)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    TEXTURE_CACHE.set(url, texture);
  };

  image.onerror = () => {
    console.error(`Failed to load texture: ${url}`);
  };

  return texture;
}
