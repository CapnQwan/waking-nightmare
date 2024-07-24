class WN_Math {
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

  static lerp(start: number, end: number, t: number): number {
    return start + t * (end - start);
  }

  static map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  static distance1d(x1: number, x2: number): number {
    const dx = x2 - x1;
    return Math.abs(dx);
  }

  static distance2d(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

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

  static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  static radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  static modulo(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }
}

export default WN_Math;
