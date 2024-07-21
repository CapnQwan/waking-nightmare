import GameObject from "../../classes/game-objects/GameObject";

class EntityManager {
  entities: Array<GameObject> = [];

  addEntity = (gameObject: GameObject) => {
    this.entities.push(GameObject);
  };

  updateEntities = () => {
    this.entities.forEach((gameObject) => {
      if (typeof gameObject?.update === 'function') {
        gameObject.update();
      }
    });
  };
}

export default EntityManager;
