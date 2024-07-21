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

  static zero() {
    return new Vector2(0, 0);
  }

  static one() {
    return new Vector2(1, 1);
  }

  static up() {
    return new Vector2(1, 0);
  }

  static down() {
    return new Vector2(-1, 0);
  }

  static right() {
    return new Vector2(0, 1);
  }

  static left() {
    return new Vector2(0, -1);
  }
}

export default Vector2;
