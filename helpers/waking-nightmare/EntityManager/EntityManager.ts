import { GameObject } from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import { RendererComponent } from '../GameObjects/Component/components/renderering/RendererComponent';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import { Behaviour } from '../GameObjects/Component/Behaviours/Behaviour';

export class EntityManager {
  entityIdIteration: number = 0;
  private entities: GameObject[] = [];
  private behaviours: Behaviour[] = [];
  private monoBehaviours: MonoBehaviour[] = [];
  private renderers: RendererComponent[] = [];
  private cameras: CameraComponent[] = [];

  constructor() {
    this.tempFunction();
  }

  tempFunction() {
    const object = new GameObject({ name: 'testObject' });
    const meshRenderer = new RendererComponent({});
    object.addComponent(meshRenderer);
    this.addEntity(object);
  }

  addEntity(gameObject: GameObject) {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;

    gameObject.components.forEach((component) => {
      if (component instanceof CameraComponent) {
        this.cameras.push(component);
      }

      if (component instanceof RendererComponent) {
        this.renderers.push(component);
      }

      if (component instanceof MonoBehaviour) {
        this.monoBehaviours.push(component);
      }
    });
  }

  public updateObjects() {
    this.updateBehaviours();
  }

  private updateBehaviours() {
    this.monoBehaviours.forEach((monoBehaviour) => monoBehaviour.onUpdate());
  }

  getEntities = () => this.entities;
  getRenderableEntities = () => this.renderers;
  getCameras = () => this.cameras;
}
