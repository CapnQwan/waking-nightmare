import WN_GameObject from "../../classes/modules/WN_GameObject";

class EntityManager {
  entityIdIteration: number = 0;
  entities: Array<WN_GameObject> = [];

  constructor() {
    //const spriteComponent = new Component({ name: 'spriteComponent' });
    //const sprite = new spriteComponent({});
    //spriteComponent.AddChild()

    //this.addEntity(spriteComponent)
  };

  addEntity = (gameObject: Component) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;
  };

  updateEntities = () => {
    this.entities.forEach((gameObject: Component) => {
      if ((gameObject as Updatable).update) {
        (gameObject as Updatable).update();
      }
    });
  };
}

export default EntityManager;
