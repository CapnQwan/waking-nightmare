class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    this.x /= mag;
    this.y /= mag;
    return this;
  }

  normalized() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return new Vector2(this.x / mag, this.y / mag);
  }

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  dot(vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y;
  }

  distance(vector: Vector2): number {
    return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2);
  }

  angle(vector: Vector2): number {
    return Math.acos(this.dot(vector) / (this.magnitude() * vector.magnitude()));
  }

  static add(v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  static subtract(v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  static scale(vector: Vector2, scalar: number): Vector2 {
    return new Vector2(vector.x * scalar, vector.y * scalar);
  }

  static dot(v1: Vector2, v2: Vector2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static distance(v1: Vector2, v2: Vector2): number {
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
  }

  static angle(v1: Vector2, v2: Vector2): number {
    return Math.acos(this.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
  }

  static zero = () => new Vector2(0, 0);
  static one = () => new Vector2(1, 1);
  static up = () => new Vector2(1, 0);
  static down = () => new Vector2(-1, 0);
  static right = () => new Vector2(0, 1);
  static left = () => new Vector2(0, -1);
}

export default Vector2;
