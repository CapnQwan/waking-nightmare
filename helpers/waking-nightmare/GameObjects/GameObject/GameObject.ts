import WN_RendererComponent from '@/helpers/waking-nightmare/GameObjects/Component/components/renderering/RendererComponent';
import WN_Transform from '@/helpers/waking-nightmare/utils/math/Transform';
import Object from '../Object';
import EntityManager from '@/helpers/waking-nightmare/EntityManager/EntityManager';
import Component from '../Component/Component';

class GameObject extends Object {
  id: number;
  transform: WN_Transform = new WN_Transform();
  entityManager: EntityManager;
  children: Array<GameObject> = new Array();
  components: Array<Component> = new Array();
  renderComponents: Array<WN_RendererComponent> = new Array();

  constructor({
    id,
    name,
    entityManager,
  }: {
    id: number;
    name: string;
    entityManager: EntityManager;
  }) {
    super({ name });
    this.id = id;
    this.entityManager = entityManager;
  }

  addComponent = (component: Component) => {
    this.components.push(component);

    if (component instanceof WN_RendererComponent) {
      this.renderComponents.push(component);
    }
  };

  addChild = (gameObject: GameObject) => {
    this.children.push(gameObject);
  };
}

export default GameObject;
