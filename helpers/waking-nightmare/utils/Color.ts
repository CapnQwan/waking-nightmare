import { MathWN } from '../utils/math/MathWN';

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

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

  toHex(): string {
    return (
      '#' +
      ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  toRgbaString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toRgbaArray(): Array<number> {
    return [this.r, this.g, this.b, this.a * 255];
  }

  blend(color: Color, t: number): Color {
    return new Color({
      r: MathWN.lerp(this.r, color.r, t),
      g: MathWN.lerp(this.g, color.g, t),
      b: MathWN.lerp(this.b, color.b, t),
      a: MathWN.lerp(this.a, color.a, t),
    });
  }

  lighten(amount: number): Color {
    return new Color({
      r: MathWN.clamp(this.r + amount, 0, 255),
      g: MathWN.clamp(this.g + amount, 0, 255),
      b: MathWN.clamp(this.b + amount, 0, 255),
      a: this.a,
    });
  }

  darken(amount: number): Color {
    return new Color({
      r: MathWN.clamp(this.r - amount, 0, 255),
      g: MathWN.clamp(this.g - amount, 0, 255),
      b: MathWN.clamp(this.b - amount, 0, 255),
      a: this.a,
    });
  }

  adjustSaturation(amount: number): Color {
    const gray = 0.2989 * this.r + 0.587 * this.g + 0.114 * this.b;
    return new Color({
      r: MathWN.clamp(this.r + amount * (gray - this.r), 0, 255),
      g: MathWN.clamp(this.g + amount * (gray - this.g), 0, 255),
      b: MathWN.clamp(this.b + amount * (gray - this.b), 0, 255),
      a: this.a,
    });
  }

  invert(): Color {
    return new Color({
      r: 255 - this.r,
      g: 255 - this.g,
      b: 255 - this.b,
      a: this.a,
    });
  }

  toHsl(): { h: number; s: number; l: number } {
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

  equals(color: Color): boolean {
    return (
      this.r === color.r &&
      this.g === color.g &&
      this.b === color.b &&
      this.a === color.a
    );
  }

  static fromHsl(h: number, s: number, l: number): Color {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

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

  static white = (): Color => new Color({ r: 255, g: 255, b: 255, a: 1 });
  static black = (): Color => new Color({ r: 0, g: 0, b: 0, a: 1 });
  static red = (): Color => new Color({ r: 255, g: 0, b: 0, a: 1 });
  static green = (): Color => new Color({ r: 0, g: 255, b: 0, a: 1 });
  static blue = (): Color => new Color({ r: 0, g: 0, b: 255, a: 1 });
}
