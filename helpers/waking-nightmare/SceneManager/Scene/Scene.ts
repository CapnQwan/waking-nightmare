import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import SceneManager from '../SceneManager';
import Behaviour from '../../GameObjects/Component/Behaviours/Behaviour';
import CameraComponent from '../../GameObjects/Component/components/renderering/CameraComponent';
import RendererComponent from '../../GameObjects/Component/components/renderering/RendererComponent';

class Scene {
  private _sceneManager: SceneManager;
  private _entityIdIteration: number = 0;

  private _entities: Array<GameObject> = [];
  private _behaviours: Array<Behaviour> = [];
  private _renderers: Array<RendererComponent> = [];
  private _cameras: Array<CameraComponent> = [];

  get entities() {
    return this._entities;
  }

  get renderers() {
    return this._renderers;
  }

  get cameras() {
    return this._cameras;
  }

  constructor(sceneManager: SceneManager) {
    this._sceneManager = sceneManager;
  }

  addEntity = (gameObject: GameObject) => {
    this._entities.push(gameObject);
    gameObject.id = this._entityIdIteration++;

    gameObject.components.forEach((component) => {
      if (component instanceof CameraComponent) {
        this._cameras.push(component);
      }

      if (component instanceof RendererComponent) {
        this._renderers.push(component);
      }

      if (component instanceof Behaviour) {
        this._behaviours.push(component);
      }
    });
  };

  updateBehaviours = () => {
    this._behaviours.forEach((behaviour) => behaviour.update());
  };
}

export default Scene;
