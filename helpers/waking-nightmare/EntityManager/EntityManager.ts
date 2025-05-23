import { GameObject } from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import { RendererComponent } from '../GameObjects/Component/components/renderering/RendererComponent';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import { DemoComponent } from '../Assets/DemoComponent';
import { generateCube } from '../Rendering/classes/Meshes/Cube';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import { Canvas } from '../Rendering/Canvas';

export class EntityManager {
  entityIdIteration: number = 0;
  private _entities: GameObject[] = [];
  private _monoBehaviours: MonoBehaviour[] = [];
  private _renderers: RendererComponent[] = [];
  private _cameras: CameraComponent[] = [];

  public get cameras(): CameraComponent[] {
    return this._cameras;
  }

  public get renderers(): RendererComponent[] {
    return this._renderers;
  }

  public get entities(): GameObject[] {
    return this._entities;
  }

  public get monoBehaviours(): MonoBehaviour[] {
    return this._monoBehaviours;
  }

  constructor() {
    this.tempFunction();
  }

  private tempFunction() {
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    const camera = new GameObject({ name: 'defaultCamera' });
    const cameraComponent = new CameraComponent({});
    camera.addComponent(cameraComponent);
    this.addEntity(camera);

    const object = new GameObject({ name: 'testObject' });
    object.transform.position.z = -10;
    object.transform.rotation.rotatePitch(45);
    object.transform.rotation.rotateRoll(45);
    const mesh = generateCube(1, 1, 1);
    const meshRenderer = new RendererComponent({ name: 'testObjectRC', mesh });
    const demoBehaviour = new DemoComponent({});
    object.addComponent(meshRenderer);
    object.addComponent(demoBehaviour);
    this.addEntity(object);
  }

  addEntity(gameObject: GameObject) {
    this._entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;

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

  public updateObjects() {
    this.updateBehaviours();
  }

  private updateBehaviours() {
    this._monoBehaviours.forEach((monoBehaviour) => monoBehaviour.onUpdate());
  }
}
