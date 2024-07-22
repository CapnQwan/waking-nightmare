import WN_SpriteRenderer from "../../../classes/modules/components/renderers/WN_SpirteRenderer";
import WN_GameObject from "../../../classes/modules/WN_GameObject";
import QuadrantManager from "./QuadrantManager/QuadrantManager";

class EntityManager {
  entityIdIteration: number = 0;
  entities: Array<WN_GameObject> = [];
  renderers: Array<WN_GameObject> = [];
  quadrantManager: QuadrantManager = new QuadrantManager;

  constructor() {
    const spriteComponent = new WN_GameObject({ name: 'spriteComponent', entityManager: this });
    const sprite = [
      [[22, 22, 22, 255], [22, 22, 22, 255], [22, 22, 22, 255]],
      [[22, 22, 22, 255], [66, 66, 66, 255], [22, 22, 22, 255]],
      [[22, 22, 22, 255], [22, 22, 22, 255], [22, 22, 22, 255]]
    ];
    const spriteRenderer = new WN_SpriteRenderer(sprite);
    spriteComponent.addComponent(spriteRenderer);

    this.addEntity(spriteComponent)
  };

  addEntity = (gameObject: WN_GameObject) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;
  };
}

export default EntityManager;
