import { Object, IObjectConstructor } from '../object';
import { GameObject } from '../gameObject/gameObject';

/**
 * Interface for Component constructor parameters
 * Extends the base object constructor interface to include parent reference
 */
export interface IComponentConstructor extends IObjectConstructor {
  /** Optional reference to the parent GameObject */
  parent?: GameObject | null;
}

/**
 * Base class for all components that can be attached to GameObjects
 * Provides core functionality for parent-child relationships and transform access
 */
export class Component extends Object {
  /** Reference to the GameObject this component is attached to */
  public parent: GameObject | null;

  /**
   * Creates a new Component instance
   * @param params - Construction parameters including optional parent reference
   */
  constructor(params: IComponentConstructor) {
    super(params);
    this.parent = params.parent ?? null;
  }

  /**
   * Gets the transform of the parent GameObject
   * @returns The parent's transform or null if no parent exists
   */
  get transform() {
    return this.parent?.transform ?? null;
  }

  destroy(): void {
    // Remove this component from the parent GameObject
    if (this.parent) {
      this.parent.removeComponent(this);
    }
  }
}
