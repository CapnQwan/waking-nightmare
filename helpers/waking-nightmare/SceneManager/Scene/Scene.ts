import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import SceneManager from '../SceneManager';
import EntityManager from './EntityManager/EntityManager';

class Scene {
  sceneManager: SceneManager;
  entityManager: EntityManager;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
    this.entityManager = new EntityManager(this);
  }

  loadScene = (scene: Array<WN_GameObject>) => {
    for (const gameObject of scene) {
      this.entityManager.addEntity(gameObject);
    }
  };
}

export default Scene;
