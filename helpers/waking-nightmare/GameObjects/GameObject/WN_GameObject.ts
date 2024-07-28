import WN_RendererComponent from '@WN/components/renderers/WN_RendererComponent';
import WN_Transform from '@WN/classes/math/WN_Transform';
import WN_Object from '../WN_Object';
import WN_EntityManager from '@WN/EntityManager/WN_EntityManager';
import WN_Component from '../Component/WN_Component';

class WN_GameObject extends WN_Object {
  id: number;
  transform: WN_Transform = new WN_Transform();
  entityManager: WN_EntityManager;
  children: Array<WN_GameObject> = new Array();
  components: Array<WN_Component> = new Array();
  renderComponents: Array<WN_RendererComponent> = new Array();

  constructor({
    id,
    name,
    entityManager,
  }: {
    id: number;
    name: string;
    entityManager: WN_EntityManager;
  }) {
    super({ name });
    this.id = id;
    this.entityManager = entityManager;
  }

  addComponent = (component: WN_Component) => {
    this.components.push(component);

    if (component instanceof WN_RendererComponent) {
      this.renderComponents.push(component);
    }
  };

  addChild = (gameObject: WN_GameObject) => {
    this.children.push(gameObject);
  };
}

export default WN_GameObject;
