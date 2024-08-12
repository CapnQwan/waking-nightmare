import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_RendererComponent from '../components/renderers/WN_RendererComponent';
import WN_Camera from '../Rendering/WN_Camera';
import WN_Behaviour from '../GameObjects/Component/Behaviours/WN_Behaviour';

class WN_EntityManager {
  entityIdIteration: number = 0;
  private entities: Array<WN_GameObject> = [];
  private behaviours: Array<WN_Behaviour> = [];
  private renderers: Array<WN_RendererComponent> = [];
  private cameras: Array<WN_Camera> = [];

  constructor() {}

  addEntity = (gameObject: WN_GameObject) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;

    gameObject.components.forEach((component) => {
      if (component instanceof WN_Camera) {
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

export default WN_EntityManager;
