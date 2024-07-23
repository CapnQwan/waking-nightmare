import WN_GameObject from "../../classes/modules/WN_GameObject";
import SceneManager from "../SceneManager";
import EntityManager from "./EntityManager/EntityManager";

class Scene {
  sceneManager: SceneManager;
  entityManager: EntityManager = new EntityManager(this);

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
  }

  loadScene = (scene: Array<WN_GameObject>) => {
    for (const gameObject of scene) {
      this.entityManager.addEntity(gameObject);
    }
  };
}

export default Scene;
