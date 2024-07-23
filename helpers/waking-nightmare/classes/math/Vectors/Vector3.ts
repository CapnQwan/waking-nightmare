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

  add(vector: Vector3): Vector3 {
    return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtract(vector: Vector3): Vector3 {
    return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  multiply(vector: Vector3): Vector3 {
    return new Vector3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
  }

  scale(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  dot(vector: Vector3): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  cross(vector: Vector3): Vector3 {
    return new Vector3(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }

  distance(vector: Vector3): number {
    return Math.sqrt(
      (this.x - vector.x) ** 2 + (this.y - vector.y) ** 2 + (this.z - vector.z) ** 2
    );
  }

  angle(vector: Vector3): number {
    return Math.acos(this.dot(vector) / (this.magnitude() * vector.magnitude()));
  }
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  static add(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  static subtract(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  static scale(vector: Vector3, scalar: number): Vector3 {
    return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
  }

  static dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static cross(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  }

  static distance(v1: Vector3, v2: Vector3): number {
    return Math.sqrt(
      (v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2 + (v1.z - v2.z) ** 2
    );
  }

  static angle(v1: Vector3, v2: Vector3): number {
    return Math.acos(this.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
  }

  static zero = (): Vector3 => new Vector3(0, 0, 0);
  static one = (): Vector3 => new Vector3(1, 1, 1);
  static up = (): Vector3 => new Vector3(1, 0, 0);
  static down = (): Vector3 => new Vector3(-1, 0, 0);
  static right = (): Vector3 => new Vector3(0, 1, 0);
  static left = (): Vector3 => new Vector3(0, -1, 0);
  static forward = (): Vector3 => new Vector3(0, 0, 1);
  static backward = (): Vector3 => new Vector3(0, 0, -1);
}

export default Vector3;
