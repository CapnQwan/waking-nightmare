import WN_SpriteRenderer from "@WN/classes/modules/components/renderers/WN_SpirteRenderer";
import WN_GameObject from "@WN/classes/modules/WN_GameObject";
import QuadrentManager from "./QuadrentManager/QuadrentManager";
import Scene from "../Scene";

class EntityManager {
  scene: Scene;
  entityIdIteration: number = 0;
  entities: Array<WN_GameObject> = [];
  renderers: Array<WN_GameObject> = [];
  quadrantManager: QuadrentManager = new QuadrentManager(this);

  constructor(scene: Scene) {
    this.scene = scene;

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
    if (gameObject.renderComponents.length > 0) {
      this.quadrantManager
    }
  };
}

export default EntityManager;
