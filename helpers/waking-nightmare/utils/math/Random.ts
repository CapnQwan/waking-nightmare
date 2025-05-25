import { Color } from '../Color';

// Constants for Linear Congruential Generator (LCG)
const modulus = 4294967296 as const; // 2^32
const multiplier = 1664525 as const; // LCG multiplier
const increment = 1013904223 as const; // LCG increment

/**
 * A utility class for generating random numbers and values.
 * Provides both seeded and non-seeded random generation methods.
 */
export class Random {
  seed: number;

  /**
   * Creates a new Random instance with a given seed.
   * @param seed The initial seed value for the random number generator
   */
  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Generates the next random number using Linear Congruential Generator.
   * @returns A number between 0 and 1
   */
  next() {
    this.seed = (this.seed * multiplier + increment) % modulus;
    return this.seed / modulus;
  }

  /**
   * Generates a random floating-point number within a specified range.
   * @param min The minimum value (inclusive)
   * @param max The maximum value (exclusive)
   * @returns A number between min and max
   */
  nextInRange(min: number, max: number) {
    return this.next() * (max - min) + min;
  }

  /**
   * Generates a random integer within a specified range.
   * @param min The minimum value (inclusive)
   * @param max The maximum value (inclusive)
   * @returns An integer between min and max
   */
  nextIntInRange(min: number, max: number) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generates a random floating-point number within a range using Math.random().
   * @param min The minimum value (inclusive)
   * @param max The maximum value (exclusive)
   * @returns A number between min and max
   */
  static randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generates a random integer within a range using Math.random().
   * @param min The minimum value (inclusive)
   * @param max The maximum value (inclusive)
   * @returns An integer between min and max
   */
  static randomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random boolean value with 50% probability.
   * @returns true or false with equal probability
   */
  static randomBool(): boolean {
    return Math.random() >= 0.5;
  }

  /**
   * Selects a random element from an array.
   * @param array The input array
   * @returns A random element from the array
   */
  static randomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  /**
   * Generates a random RGB color.
   * @returns A Color object with random RGB values (0-255)
   */
  static randomColor(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return new Color({ r, g, b });
  }

  /**
   * Generates a random RGBA color.
   * @returns A Color object with random RGB values (0-255) and alpha (0-1)
   */
  static randomColorAndAlpha(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return new Color({ r, g, b, a });
  }

  /**
   * Generates a random number from a Gaussian (normal) distribution.
   * Uses the Box-Muller transform algorithm.
   * @param mean The mean (average) of the distribution
   * @param stdDev The standard deviation of the distribution
   * @returns A normally distributed random number
   */
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
