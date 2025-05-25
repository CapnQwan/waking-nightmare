import { IObjectConstructor, Object } from '../Object';
import { RendererComponent } from '@/helpers/waking-nightmare/GameObjects/Component/components/renderering/RendererComponent';
import { Transform } from '../../utils/math/Transform';
import { Component } from '../Component/Component';

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
  };

  /**
   * Adds a child GameObject to this object's hierarchy
   * @param gameObject - The GameObject to add as a child
   */
  addChild = (gameObject: GameObject) => {
    this.children.push(gameObject);
  };
}
