import { MonoBehaviour } from '../gameObject/behaviours/monoBehaviour';
import { GameObject } from '../gameObject/gameObject/gameObject';
import { RendererComponent } from '../rendering/components/rendererComponent';
import { CameraComponent } from '../rendering/components/cameraComponent';
import { GameManager } from '@/helpers/assets/gameManager';
import { Hearts } from '@/helpers/assets/hearts';
import { Component } from '../gameObject/behaviours/component';

/**
 * Manages all game entities and their components in the game world.
 * Implements the Singleton pattern to ensure only one instance exists.
 */
export class EntityManager {
  public static instance: EntityManager;

  /** Counter for generating unique entity IDs */
  entityIdIteration: number = 0;
  /** Array of all game objects in the scene */
  private _entities: GameObject[] = [];
  /** Array of all behavior components */
  private _monoBehaviours: MonoBehaviour[] = [];
  /** Array of all renderer components */
  private _renderers: RendererComponent[] = [];
  /** Array of all camera components */
  private _cameras: CameraComponent[] = [];

  /** Get all camera components in the scene */
  public get cameras(): CameraComponent[] {
    return this._cameras;
  }

  /** Get all renderer components in the scene */
  public get renderers(): RendererComponent[] {
    return this._renderers;
  }

  /** Get all game objects in the scene */
  public get entities(): GameObject[] {
    return this._entities;
  }

  /** Get all behavior components in the scene */
  public get monoBehaviours(): MonoBehaviour[] {
    return this._monoBehaviours;
  }

  constructor() {
    // Use setTimeout to ensure the constructor completes before tempFunction runs
    setTimeout(() => {
      this.tempFunction();
    }, 0);
  }

  /**
   * Temporary setup function that creates a default camera and test object
   * @private
   */
  private tempFunction() {
    // Create default camera
    const camera = new GameObject({ name: 'defaultCamera' });
    const cameraComponent = new CameraComponent({});
    camera.addComponent(cameraComponent);
    this.addEntity(camera);

    const object = new GameObject({ name: 'gameManager' });
    const gameManager = new GameManager();
    const hearts = new Hearts();
    object.addComponent(gameManager);
    object.addComponent(hearts);
    this.addEntity(object);
  }

  /**
   * Adds a game object to the entity manager and registers its components
   * @param gameObject The game object to add
   */
  addEntity(gameObject: GameObject) {
    this._entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;
  }

  /**
   * Removes a game object from the entity manager
   * @param gameObject The game object to remove
   */
  removeEntity(gameObject: GameObject) {
    const index = this._entities.indexOf(gameObject);
    if (index !== -1) {
      this._entities.splice(index, 1);
      gameObject.destroy();
    }
  }

  /**
   * Registers a component with the entity manager
   * @param component The component to register
   */
  public registerComponent(component: Component) {
    if (component instanceof CameraComponent) {
      this._cameras.push(component);
    }

    if (component instanceof RendererComponent) {
      this._renderers.push(component);
    }

    if (component instanceof MonoBehaviour) {
      component.onAwake();
      this._monoBehaviours.push(component);
    }
  }

  /**
   * Unregisters a component from the entity manager
   * @param component The component to unregister
   */
  public unregisterComponent(component: Component) {
    if (component instanceof CameraComponent) {
      const index = this._cameras.indexOf(component);
      if (index !== -1) {
        this._cameras.splice(index, 1);
      }
    }

    if (component instanceof RendererComponent) {
      const index = this._renderers.indexOf(component);
      if (index !== -1) {
        this._renderers.splice(index, 1);
      }
    }

    if (component instanceof MonoBehaviour) {
      const index = this._monoBehaviours.indexOf(component);
      if (index !== -1) {
        this._monoBehaviours.splice(index, 1);
      }
    }
  }

  /**
   * Updates all game objects and their components
   */
  public updateObjects() {
    this.updateBehaviours();
  }

  /**
   * Updates all MonoBehaviour components
   * @private
   */
  private updateBehaviours() {
    this._monoBehaviours.forEach((monoBehaviour) => monoBehaviour.onUpdate());
  }

  /**
   * Gets the singleton instance of the EntityManager
   * @returns The EntityManager instance
   */
  public static getInstance(): EntityManager {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }
    return EntityManager.instance;
  }
}

/** Singleton instance of the EntityManager */
export const entityManager = EntityManager.getInstance();
