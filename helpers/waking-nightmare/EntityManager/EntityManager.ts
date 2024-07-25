import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';

class EntityManager {
  entityIdIteration: number = 0;
  entities: Array<WN_GameObject> = [];
  renderers: Array<WN_GameObject> = [];

  constructor() {}

  addEntity = (gameObject: WN_GameObject) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;
  };
}

export default EntityManager;
