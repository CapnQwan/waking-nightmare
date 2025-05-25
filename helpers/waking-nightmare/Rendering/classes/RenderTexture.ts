import { Texture } from './Texture';

/**
 * Represents a texture that can be rendered to
 * Extends the base Texture class with specific render target functionality
 */
export class RenderTexture extends Texture {
  /** Width of the render texture in pixels */
  public readonly width: number;

  /** Height of the render texture in pixels */
  public readonly height: number;

  /** Raw pixel data of the render texture stored as RGBA values */
  public readonly data: Uint8Array;

  /**
   * Creates a new RenderTexture instance
   * @param id - Unique identifier for the texture
   * @param width - Width of the texture in pixels
   * @param height - Height of the texture in pixels
   * @param data - Raw pixel data as RGBA values
   */
  constructor(id: number, width: number, height: number, data: Uint8Array) {
    super(id, width, height, data);
    this.width = width;
    this.height = height;
    this.data = data;
  }

  /**
   * Gets the raw pixel data of the render texture
   * @returns Uint8Array containing RGBA values
   */
  public getData(): Uint8Array {
    return this.data;
  }
}
