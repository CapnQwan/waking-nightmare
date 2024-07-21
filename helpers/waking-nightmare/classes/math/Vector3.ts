class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  };

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
    return this;
  }

  normalized() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }

  static zero() {
    return new Vector3(0, 0, 0);
  }

  static one() {
    return new Vector3(1, 1, 1);
  }

  static up() {
    return new Vector3(1, 0, 0);
  }

  static down() {
    return new Vector3(-1, 0, 0);
  }

  static right() {
    return new Vector3(0, 1, 0);
  }

  static left() {
    return new Vector3(0, -1, 0);
  }

  static forward() {
    return new Vector3(0, 0, 1);
  }

  static backward() {
    return new Vector3(0, 0, -1);
  }
}

export default Vector3;
