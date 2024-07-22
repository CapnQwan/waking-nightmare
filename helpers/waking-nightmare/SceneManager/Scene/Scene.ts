import GameObject from "../classes/game-objects/GameObject";
import EntityManager from "./EntityManager/EntityManager";

class Scene {
  entityManager: EntityManager = new EntityManager();

  loadScene = (scene: Array<GameObject>) => {
    for (const gameObject of scene) {
      this.entityManager.addEntity(gameObject);
    }
  };
}

export default Scene;
