import { entityManager } from '../../entityManager/entityManager';
import { RendererComponent } from '../../rendering/components/rendererComponent';
import { Transform } from '../../utils/math/transform';
import { Component } from '../behaviours/component';
import { IObjectConstructor, Object } from '../object';

/**
 * Interface extending base object constructor parameters for GameObject
 */
export interface IGameObjectConstructor extends IObjectConstructor {}

/**
 * Represents a game object in the scene that can have components, children,
 * and a transform for positioning in 3D space
 */
export class GameObject extends Object {
  /** Transform component handling position, rotation, and scale */
  transform: Transform = new Transform();
  /** The parent object of this GameObject */
  parent: GameObject | null = null;
  /** List of child GameObjects parented to this object */
  children: GameObject[] = [];
  /** List of all components attached to this object */
  components: Component[] = [];
  /** List of renderer components specifically for handling visual representation */
  renderComponents: RendererComponent[] = [];

  /**
   * Creates a new GameObject instance
   * @param params - Construction parameters inherited from Object
   */
  constructor(params: IGameObjectConstructor) {
    super(params);
  }

  /**
   * Attaches a component to this GameObject
   * @param component - The component to attach
   */
  addComponent = (component: Component) => {
    this.components.push(component);
    component.parent = this;

    if (component instanceof RendererComponent) {
      this.renderComponents.push(component);
    }

    entityManager.registerComponent(component);
  };

  /**
   * Removes a component from this GameObject
   * @param component - The component to remove
   */
  removeComponent(component: Component): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
      component.parent = null;

      if (component instanceof RendererComponent) {
        const renderIndex = this.renderComponents.indexOf(component);
        if (renderIndex !== -1) {
          this.renderComponents.splice(renderIndex, 1);
        }
      }

      entityManager.unregisterComponent(component);
    }
  }

  /**
   * Adds a child GameObject to this object's hierarchy
   * @param gameObject - The GameObject to add as a child
   */
  addChild = (gameObject: GameObject) => {
    this.children.push(gameObject);
    gameObject.parent = this;
  };

  /**
   * Removes a child GameObject from this object's hierarchy
   * @param gameObject - The GameObject to remove from this object's children
   */
  removeChild(gameObject: GameObject): void {
    const index = this.children.indexOf(gameObject);
    if (index !== -1) {
      this.children.splice(index, 1);
      gameObject.parent = null;
    }
  }

  destroy(): void {
    // Remove this GameObject from the EntityManager
    entityManager.removeEntity(this);

    // Clear all components and children
    this.components.forEach((component) => component.destroy());
    this.components = [];
    this.children.forEach((child) => child.destroy());
    this.children = [];

    // If this GameObject has a parent, remove it from the parent's children
    if (this.parent) {
      this.parent.removeChild(this);
      this.parent = null;
    }
  }
}
