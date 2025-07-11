export class Vector2 {
  vector: Float32Array;

  /**
   * Creates a new 2D vector.
   * @param x - The x-coordinate of the vector. Defaults to 0.
   * @param y - The y-coordinate of the vector. Defaults to 0.
   */
  constructor(x: number = 0, y: number = 0) {
    this.vector = new Float32Array([x, y]);
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

  /**
   * Calculates the magnitude (length) of the vector.
   * @returns The magnitude of the vector.
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normalizes the vector (makes its magnitude equal to 1).
   * @throws Will throw an error if the vector is a zero vector.
   * @returns The normalized vector (this instance).
   */
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    this.x /= mag;
    this.y /= mag;
    return this;
  }

  /**
   * Returns a new normalized vector without modifying the original vector.
   * @throws Will throw an error if the vector is a zero vector.
   * @returns A new normalized vector.
   */
  normalized() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return new Vector2(this.x / mag, this.y / mag);
  }

  /**
   * Adds another vector to this vector.
   * @param vector - The vector to add.
   * @returns A new vector representing the sum.
   */
  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  /**
   * Subtracts another vector from this vector.
   * @param vector - The vector to subtract.
   * @returns A new vector representing the difference.
   */
  subtract(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  /**
   * Scales the vector by a scalar value.
   * @param scalar - The scalar value to multiply the vector by.
   * @returns A new scaled vector.
   */
  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param vector - The other vector.
   * @returns The dot product.
   */
  dot(vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Calculates the distance between this vector and another vector.
   * @param vector - The other vector.
   * @returns The distance between the two vectors.
   */
  distance(vector: Vector2): number {
    return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2);
  }

  /**
   * Calculates the angle (in radians) between this vector and another vector.
   * @param vector - The other vector.
   * @returns The angle in radians.
   */
  angle(vector: Vector2): number {
    return Math.acos(
      this.dot(vector) / (this.magnitude() * vector.magnitude())
    );
  }

  /**
   * Adds two vectors.
   * @param v1 - The first vector.
   * @param v2 - The second vector.
   * @returns A new vector representing the sum.
   */
  static add(v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * Subtracts one vector from another.
   * @param v1 - The first vector.
   * @param v2 - The second vector.
   * @returns A new vector representing the difference.
   */
  static subtract(v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * Scales a vector by a scalar value.
   * @param vector - The vector to scale.
   * @param scalar - The scalar value to multiply the vector by.
   * @returns A new scaled vector.
   */
  static scale(vector: Vector2, scalar: number): Vector2 {
    return new Vector2(vector.x * scalar, vector.y * scalar);
  }

  /**
   * Calculates the dot product of two vectors.
   * @param v1 - The first vector.
   * @param v2 - The second vector.
   * @returns The dot product.
   */
  static dot(v1: Vector2, v2: Vector2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /**
   * Calculates the distance between two vectors.
   * @param v1 - The first vector.
   * @param v2 - The second vector.
   * @returns The distance between the two vectors.
   */
  static distance(v1: Vector2, v2: Vector2): number {
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
  }

  /**
   * Calculates the angle (in radians) between two vectors.
   * @param v1 - The first vector.
   * @param v2 - The second vector.
   * @returns The angle in radians.
   */
  static angle(v1: Vector2, v2: Vector2): number {
    return Math.acos(this.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
  }

  /**
   * Returns a new vector with both x and y set to 0.
   * @returns A zero vector.
   */
  static zero = () => new Vector2(0, 0);

  /**
   * Returns a new vector with both x and y set to 1.
   * @returns A vector with x and y equal to 1.
   */
  static one = () => new Vector2(1, 1);

  /**
   * Returns a new vector pointing up (x = 1, y = 0).
   * @returns An up vector.
   */
  static up = () => new Vector2(1, 0);

  /**
   * Returns a new vector pointing down (x = -1, y = 0).
   * @returns A down vector.
   */
  static down = () => new Vector2(-1, 0);

  /**
   * Returns a new vector pointing right (x = 0, y = 1).
   * @returns A right vector.
   */
  static right = () => new Vector2(0, 1);

  /**
   * Returns a new vector pointing left (x = 0, y = -1).
   * @returns A left vector.
   */
  static left = () => new Vector2(0, -1);
}
