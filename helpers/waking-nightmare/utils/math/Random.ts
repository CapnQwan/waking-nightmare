import { Color } from '../Color';

const modulus = 4294967296 as const;
const multiplier = 1664525 as const;
const increment = 1013904223 as const;

export class Random {
  seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * multiplier + increment) % modulus;
    return this.seed / modulus;
  }

  nextInRange(min: number, max: number) {
    return this.next() * (max - min) + min;
  }

  nextIntInRange(min: number, max: number) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  static randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static randomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomBool(): boolean {
    return Math.random() >= 0.5;
  }

  static randomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  static randomColor(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return new Color({ r, g, b });
  }

  static randomColorAndAlpha(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return new Color({ r, g, b, a });
  }

  static randomGaussian(mean: number = 0, stdDev: number = 1): number {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * stdDev + mean;
    return num;
  }
}
