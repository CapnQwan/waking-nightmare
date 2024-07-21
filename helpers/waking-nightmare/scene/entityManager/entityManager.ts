import { Updatable } from "../../classes/game-objects/Component";
import GameObject from "../../classes/game-objects/GameObject";

class EntityManager {
  entities: Array<GameObject> = [];

  addEntity = (gameObject: GameObject) => {
    this.entities.push(GameObject);
  };

  updateEntities = () => {
    this.entities.forEach((gameObject: GameObject) => {
      if ((gameObject as Updatable).update) {
        (gameObject as Updatable).update();
      }
    });


  };
}

export default EntityManager;
