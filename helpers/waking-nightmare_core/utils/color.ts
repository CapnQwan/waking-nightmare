import { MathWN } from './math/mathWN';

/**
 * Represents a color in RGBA format
 * Provides utilities for color manipulation and conversion
 */
export class Color {
  /** Red component (0-255) */
  r: number;
  /** Green component (0-255) */
  g: number;
  /** Blue component (0-255) */
  b: number;
  /** Alpha component (0-1) */
  a: number;

  /**
   * Creates a new Color instance
   * @param {Object} params - Color parameters
   * @param {number} [params.r=0] - Red component (0-255)
   * @param {number} [params.g=0] - Green component (0-255)
   * @param {number} [params.b=0] - Blue component (0-255)
   * @param {number} [params.a=1] - Alpha component (0-1)
   */
  constructor({
    r = 0,
    g = 0,
    b = 0,
    a = 1,
  }: {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
  }) {
    this.r = MathWN.clamp(r, 0, 256);
    this.g = MathWN.clamp(g, 0, 256);
    this.b = MathWN.clamp(b, 0, 256);
    this.a = MathWN.clamp(a, 0, 1);
  }

  /**
   * Converts the color to hexadecimal format
   * @returns {string} Hex color string (e.g., "#FF0000")
   */
  toHex(): string {
    return (
      '#' +
      ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  /**
   * Converts the color to RGBA string format
   * @returns {string} RGBA string (e.g., "rgba(255, 0, 0, 1)")
   */
  toRgbaString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  /**
   * Converts the color to RGBA array format
   * @returns {number[]} Array of [r, g, b, a] values
   */
  toRgbaArray(): Array<number> {
    return [this.r, this.g, this.b, this.a * 255];
  }

  /**
   * Linearly interpolates between this color and another
   * @param {Color} color - Target color to blend with
   * @param {number} t - Interpolation factor (0-1)
   * @returns {Color} New interpolated color
   */
  blend(color: Color, t: number): Color {
    return new Color({
      r: MathWN.lerp(this.r, color.r, t),
      g: MathWN.lerp(this.g, color.g, t),
      b: MathWN.lerp(this.b, color.b, t),
      a: MathWN.lerp(this.a, color.a, t),
    });
  }

  /**
   * Creates a lighter version of the color
   * @param {number} amount - Amount to lighten by (0-255)
   * @returns {Color} New lightened color
   */
  lighten(amount: number): Color {
    return new Color({
      r: MathWN.clamp(this.r + amount, 0, 255),
      g: MathWN.clamp(this.g + amount, 0, 255),
      b: MathWN.clamp(this.b + amount, 0, 255),
      a: this.a,
    });
  }

  /**
   * Creates a darker version of the color
   * @param {number} amount - Amount to darken by (0-255)
   * @returns {Color} New darkened color
   */
  darken(amount: number): Color {
    return new Color({
      r: MathWN.clamp(this.r - amount, 0, 255),
      g: MathWN.clamp(this.g - amount, 0, 255),
      b: MathWN.clamp(this.b - amount, 0, 255),
      a: this.a,
    });
  }

  /**
   * Adjusts the saturation of the color
   * @param {number} amount - Amount to adjust saturation
   * @returns {Color} New color with adjusted saturation
   */
  adjustSaturation(amount: number): Color {
    // Calculate grayscale value using luminance weights
    const gray = 0.2989 * this.r + 0.587 * this.g + 0.114 * this.b;
    return new Color({
      r: MathWN.clamp(this.r + amount * (gray - this.r), 0, 255),
      g: MathWN.clamp(this.g + amount * (gray - this.g), 0, 255),
      b: MathWN.clamp(this.b + amount * (gray - this.b), 0, 255),
      a: this.a,
    });
  }

  /**
   * Creates an inverted version of the color
   * @returns {Color} New inverted color
   */
  invert(): Color {
    return new Color({
      r: 255 - this.r,
      g: 255 - this.g,
      b: 255 - this.b,
      a: this.a,
    });
  }

  /**
   * Converts the color to HSL format
   * @returns {Object} HSL values {h: hue, s: saturation, l: lightness}
   */
  toHsl(): { h: number; s: number; l: number } {
    // Convert RGB to 0-1 range
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
      // Calculate hue
      switch (max) {
        case r:
          h = 60 * (((g - b) / delta) % 6);
          if (b > g) h += 360;
          break;
        case g:
          h = 60 * ((b - r) / delta + 2);
          break;
        case b:
          h = 60 * ((r - g) / delta + 4);
          break;
      }
    }

    return { h, s, l };
  }

  /**
   * Compares this color with another color
   * @param {Color} color - Color to compare with
   * @returns {boolean} True if colors are equal
   */
  equals(color: Color): boolean {
    return (
      this.r === color.r &&
      this.g === color.g &&
      this.b === color.b &&
      this.a === color.a
    );
  }

  /**
   * Creates a new Color from HSL values
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {Color} New color instance
   */
  static fromHsl(h: number, s: number, l: number): Color {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    // Convert HSL to RGB
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return new Color({
      r: MathWN.clamp(Math.round((r + m) * 255), 0, 255),
      g: MathWN.clamp(Math.round((g + m) * 255), 0, 255),
      b: MathWN.clamp(Math.round((b + m) * 255), 0, 255),
      a: 1,
    });
  }

  /** @returns {Color} White color instance */
  static white = (): Color => new Color({ r: 255, g: 255, b: 255, a: 1 });
  /** @returns {Color} Black color instance */
  static black = (): Color => new Color({ r: 0, g: 0, b: 0, a: 1 });
  /** @returns {Color} Red color instance */
  static red = (): Color => new Color({ r: 255, g: 0, b: 0, a: 1 });
  /** @returns {Color} Green color instance */
  static green = (): Color => new Color({ r: 0, g: 255, b: 0, a: 1 });
  /** @returns {Color} Blue color instance */
  static blue = (): Color => new Color({ r: 0, g: 0, b: 255, a: 1 });
}
