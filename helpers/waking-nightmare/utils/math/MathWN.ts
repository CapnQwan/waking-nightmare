export class MathWN {
  /**
   * Clamps a value between a minimum and maximum range.
   * @param value - The value to clamp.
   * @param min - The minimum value.
   * @param max - The maximum value.
   * @returns The clamped value.
   */
  static clamp(value: number, min: number, max: number): number {
    const minVal = Math.min(min, max);
    const maxVal = Math.max(min, max);

    if (value < minVal) {
      return minVal;
    } else if (value > maxVal) {
      return maxVal;
    } else {
      return value;
    }
  }

  /**
   * Linearly interpolates between two values.
   * @param start - The starting value.
   * @param end - The ending value.
   * @param value - The interpolation factor (0 to 1).
   * @returns The interpolated value.
   */
  static lerp(start: number, end: number, value: number): number {
    return start + value * (end - start);
  }

  /**
   * Calculates the inverse linear interpolation factor.
   * @param start - The starting value.
   * @param end - The ending value.
   * @param value - The value to interpolate.
   * @returns The interpolation factor (0 to 1).
   */
  static inverseLerp(start: number, end: number, value: number): number {
    return MathWN.map(value, start, end, 0, 1);
  }

  /**
   * Performs a smooth step interpolation between two edges.
   * @param edge0 - The lower edge of the interpolation.
   * @param edge1 - The upper edge of the interpolation.
   * @param x - The value to interpolate.
   * @returns The interpolated value.
   */
  static smoothStep(edge0: number, edge1: number, x: number): number {
    const t = MathWN.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /**
   * Maps a value from one range to another.
   * @param value - The value to map.
   * @param inMin - The minimum of the input range.
   * @param inMax - The maximum of the input range.
   * @param outMin - The minimum of the output range.
   * @param outMax - The maximum of the output range.
   * @returns The mapped value.
   */
  static map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /**
   * Calculates the 1D distance between two points.
   * @param x1 - The first point.
   * @param x2 - The second point.
   * @returns The distance between the points.
   */
  static distance1d(x1: number, x2: number): number {
    const dx = x2 - x1;
    return Math.abs(dx);
  }

  /**
   * Calculates the 2D distance between two points.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @returns The distance between the points.
   */
  static distance2d(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculates the 3D distance between two points.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param z1 - The z-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param z2 - The z-coordinate of the second point.
   * @returns The distance between the points.
   */
  static distance3d(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Converts degrees to radians.
   * @param degrees - The angle in degrees.
   * @returns The angle in radians.
   */
  static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Converts radians to degrees.
   * @param radians - The angle in radians.
   * @returns The angle in degrees.
   */
  static radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Calculates the modulo of a value, ensuring a positive result.
   * @param value - The value to calculate the modulo for.
   * @param divisor - The divisor.
   * @returns The positive modulo result.
   */
  static modulo(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }
}
