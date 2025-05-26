import { GameObject } from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import { RendererComponent } from '../GameObjects/Component/components/renderering/RendererComponent';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import { DemoComponent } from '../Assets/DemoComponent';
import { generateCube } from '../Rendering/classes/Meshes/Cube';
import { LitMaterial } from '../Assets/Materials/LitMaterial';

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
    this.tempFunction();
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

    // Create test object with mesh and demo behavior
    const object = new GameObject({ name: 'testObject' });
    object.transform.position.z = -10;
    object.transform.rotation.rotatePitch(45);
    object.transform.rotation.rotateRoll(45);
    const mesh = generateCube(1, 1, 1);
    const meshRenderer = new RendererComponent({
      name: 'testObjectRC',
      mesh,
      material: new LitMaterial({}),
    });
    const demoBehaviour = new DemoComponent({});
    object.addComponent(meshRenderer);
    object.addComponent(demoBehaviour);
    this.addEntity(object);
  }

  /**
   * Adds a game object to the entity manager and registers its components
   * @param gameObject The game object to add
   */
  addEntity(gameObject: GameObject) {
    this._entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;

    // Register components by type
    gameObject.components.forEach((component) => {
      if (component instanceof CameraComponent) {
        this._cameras.push(component);
      }

      if (component instanceof RendererComponent) {
        this._renderers.push(component);
      }

      if (component instanceof MonoBehaviour) {
        this._monoBehaviours.push(component);
      }
    });
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
