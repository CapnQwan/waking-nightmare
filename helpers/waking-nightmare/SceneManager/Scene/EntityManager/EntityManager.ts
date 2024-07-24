import QuadrentManager from './QuadrentManager/QuadrentManager';
import Scene from '../Scene';
import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_SpriteRenderer from '@WN/components/renderers/WN_SpirteRenderer';

class EntityManager {
  scene: Scene;
  entityIdIteration: number = 0;
  entities: Array<WN_GameObject> = [];
  renderers: Array<WN_GameObject> = [];
  quadrantManager: QuadrentManager;

  constructor(scene: Scene) {
    this.scene = scene;
    this.quadrantManager = new QuadrentManager(this);

    const spriteComponent = new WN_GameObject({
      id: this.entityIdIteration,
      name: 'spriteComponent',
      entityManager: this,
    });
    const sprite = [
      [
        [22, 22, 22, 255],
        [22, 22, 22, 255],
        [22, 22, 22, 255],
      ],
      [
        [22, 22, 22, 255],
        [66, 66, 66, 255],
        [22, 22, 22, 255],
      ],
      [
        [22, 22, 22, 255],
        [22, 22, 22, 255],
        [22, 22, 22, 255],
      ],
    ];
    const spriteRenderer = new WN_SpriteRenderer(sprite);
    spriteComponent.addComponent(spriteRenderer);

    this.addEntity(spriteComponent);
  }

  addEntity = (gameObject: WN_GameObject) => {
    this.entities.push(gameObject);
    gameObject.id = this.entityIdIteration++;
    if (gameObject.renderComponents.length > 0) {
      this.quadrantManager;
    }
  };
}

export default EntityManager;
