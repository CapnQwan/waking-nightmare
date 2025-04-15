/**
 * Represents a color using a packed 32-bit integer where each channel (R,G,B,A) uses 8 bits.
 * This provides a memory-efficient way to store color information, particularly useful for WebGL.
 */
export class Color {
  /** Stores color as a single 32-bit integer: (r << 24) | (g << 16) | (b << 8) | a */
  private packedColor: number;

  /**
   * Creates a new Color instance
   * @param r Red component (0-255)
   * @param g Green component (0-255)
   * @param b Blue component (0-255)
   * @param a Alpha component (0-255)
   */
  constructor(r: number, g: number, b: number, a: number) {
    // Pack all components into a single 32-bit integer
    this.packedColor = (r << 24) | (g << 16) | (b << 8) | a;
  }

  /** Extract red component (0-255) from packed color */
  get r(): number {
    return (this.packedColor >> 24) & 0xff;
  }

  /** Extract green component (0-255) from packed color */
  get g(): number {
    return (this.packedColor >> 16) & 0xff;
  }

  /** Extract blue component (0-255) from packed color */
  get b(): number {
    return (this.packedColor >> 8) & 0xff;
  }

  /** Extract alpha component (0-255) from packed color */
  get a(): number {
    return this.packedColor & 0xff;
  }

  /** Extracts the colors from the packed color and returns an object with each value (r, g, b, a) */
  get unpackedColor(): { r: number; g: number; b: number; a: number } {
    // Unpack the color into an object with separate r, g, b, a properties
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }

  /**
   * Set red component (0-255)
   * Clears existing red bits and sets new value using bitwise operations
   */
  set r(value: number) {
    this.packedColor = (this.packedColor & 0x00ffffff) | (value << 24);
  }

  /**
   * Set green component (0-255)
   * Clears existing green bits and sets new value using bitwise operations
   */
  set g(value: number) {
    this.packedColor = (this.packedColor & 0xff00ffff) | (value << 16);
  }

  /**
   * Set blue component (0-255)
   * Clears existing blue bits and sets new value using bitwise operations
   */
  set b(value: number) {
    this.packedColor = (this.packedColor & 0xffff00ff) | (value << 8);
  }

  /**
   * Set alpha component (0-255)
   * Clears existing alpha bits and sets new value using bitwise operations
   */
  set a(value: number) {
    this.packedColor = (this.packedColor & 0xffffff00) | value;
  }

  /**
   * Returns the color as a CSS-compatible rgba string
   * @returns A string in the format "rgba(r, g, b, a)"
   */
  toString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
