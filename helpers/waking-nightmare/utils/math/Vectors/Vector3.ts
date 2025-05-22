export class Vector3 {
  vector: Float32Array;

  // Constructor to initialize the vector with x, y, and z components
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.vector = new Float32Array([x, y, z]);
  }

  public get x(): number {
    return this.vector[0];
  }

  public set x(value: number) {
    this.vector[0] = value;
  }

  public get y(): number {
    return this.vector[1];
  }

  public set y(value: number) {
    this.vector[1] = value;
  }

  public get z(): number {
    return this.vector[2];
  }

  public set z(value: number) {
    this.vector[2] = value;
  }

  /** Returns the vector as a 4D matrix (Float32Array) with a w-component of 1 */
  toMatrix() {
    return new Float32Array([this.x, this.y, this.z, 1]);
  }

  /** Converts the vector to an array of numbers [x, y, z] */
  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  /** Converts the vector to a Float32Array */
  toFloat32Array(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }

  /** Calculates the magnitude (length) of the vector */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /** Normalizes the vector (makes its magnitude equal to 1) */
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
    return this;
  }

  /** Returns a new normalized vector without modifying the original */
  normalized() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }

  /** Adds another vector to this vector and returns the result as a new vector */
  add(vector: Vector3): Vector3 {
    return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  /** Subtracts another vector from this vector and returns the result as a new vector */
  subtract(vector: Vector3): Vector3 {
    return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  /** Multiplies this vector by another vector component-wise and returns the result */
  multiply(vector: Vector3): Vector3 {
    return new Vector3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
  }

  /** Scales this vector by a scalar value and returns the result as a new vector */
  scale(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /** Calculates the dot product of this vector and another vector */
  dot(vector: Vector3): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  /** Calculates the cross product of this vector and another vector */
  cross(vector: Vector3): Vector3 {
    return new Vector3(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }

  /** Calculates the distance between this vector and another vector */
  distance(vector: Vector3): number {
    return Math.sqrt(
      (this.x - vector.x) ** 2 +
        (this.y - vector.y) ** 2 +
        (this.z - vector.z) ** 2
    );
  }

  /** Calculates the angle (in radians) between this vector and another vector */
  angle(vector: Vector3): number {
    return Math.acos(
      this.dot(vector) / (this.magnitude() * vector.magnitude())
    );
  }

  /** Creates a copy of this vector and returns it */
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /** Converts the vector to a string representation */
  toString(): string {
    return `Vector3(${this.x}, ${this.y}, ${this.z})`;
  }

  /** Static method to add two vectors and return the result */
  static add(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  /** Static method to subtract one vector from another and return the result */
  static subtract(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  /** Static method to scale a vector by a scalar value and return the result */
  static scale(vector: Vector3, scalar: number): Vector3 {
    return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
  }

  /** Static method to calculate the dot product of two vectors */
  static dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /** Static method to calculate the cross product of two vectors */
  static cross(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  }

  /** Static method to calculate the distance between two vectors */
  static distance(v1: Vector3, v2: Vector3): number {
    return Math.sqrt(
      (v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2 + (v1.z - v2.z) ** 2
    );
  }

  /** Static method to calculate the angle (in radians) between two vectors */
  static angle(v1: Vector3, v2: Vector3): number {
    return Math.acos(this.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
  }

  /** Static method to create a zero vector (0, 0, 0) */
  static zero = (): Vector3 => new Vector3(0, 0, 0);

  /** Static method to create a vector with all components set to 1 (1, 1, 1) */
  static one = (): Vector3 => new Vector3(1, 1, 1);

  /** Static method to create a unit vector pointing up (1, 0, 0) */
  static up = (): Vector3 => new Vector3(1, 0, 0);

  /** Static method to create a unit vector pointing down (-1, 0, 0) */
  static down = (): Vector3 => new Vector3(-1, 0, 0);

  /** Static method to create a unit vector pointing right (0, 1, 0) */
  static right = (): Vector3 => new Vector3(0, 1, 0);

  /** Static method to create a unit vector pointing left (0, -1, 0) */
  static left = (): Vector3 => new Vector3(0, -1, 0);

  /** Static method to create a unit vector pointing forward (0, 0, 1) */
  static forward = (): Vector3 => new Vector3(0, 0, 1);

  /** Static method to create a unit vector pointing backward (0, 0, -1) */
  static backward = (): Vector3 => new Vector3(0, 0, -1);
}
