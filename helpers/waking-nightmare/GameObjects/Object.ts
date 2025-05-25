/**
 * Interface defining the constructor parameters for Object class
 */
export interface IObjectConstructor {
  /** Optional name identifier */
  name?: string | null;
  /** Optional numeric identifier */
  id?: number | null;
}

/**
 * Base class for all game objects providing core functionality
 * for identification and serialization
 */
export class Object {
  /** Name identifier for the object */
  name: string | null = null;
  /** Unique numeric identifier for the object */
  id: number | null = null;

  /**
   * Creates a new Object instance
   * @param id - Optional numeric identifier
   * @param name - Optional name identifier
   */
  constructor({ id = null, name = null }: IObjectConstructor) {
    if (id) this.id = id;
    if (name) this.name = name;
  }

  /**
   * Converts the object instance to a JSON string
   * @returns Serialized string representation of the object
   */
  serualize(): string {
    return JSON.stringify(this);
  }

  /**
   * Creates a new instance of the object with the same properties
   * @returns A new instance of the same type with copied properties
   */
  instantiate(): this {
    return new (this.constructor as any)(this);
  }
}
