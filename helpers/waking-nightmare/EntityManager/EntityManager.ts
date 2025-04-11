import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import WN_RendererComponent from '../GameObjects/Component/components/renderers/RendererComponent';
import Camera from '../Rendering/Camera';
import WN_Behaviour from '../GameObjects/Component/Behaviours/Behaviour';

class EntityManager {
  entityIdIteration: number = 0;
  private entities: Array<GameObject> = [];
  private behaviours: Array<WN_Behaviour> = [];
  private renderers: Array<WN_RendererComponent> = [];
  private cameras: Array<Camera> = [];

  constructor() {}

  addEntity = (gameObject: GameObject) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;

    gameObject.components.forEach((component) => {
      if (component instanceof Camera) {
        this.cameras.push(component);
      }

      if (component instanceof WN_RendererComponent) {
        this.renderers.push(component);
      }

      if (component instanceof WN_Behaviour) {
        this.behaviours.push(component);
      }
    });
  };

  updateBehaviours = () => {
    this.behaviours.forEach((behaviour) => behaviour.update());
  };

  getEntities = () => this.entities;
  getRenderableEntities = () => this.renderers;
  getCameras = () => this.cameras;
}

export default EntityManager;
