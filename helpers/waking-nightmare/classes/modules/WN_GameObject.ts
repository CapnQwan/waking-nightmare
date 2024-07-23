import WN_Object from "./WN_Object";
import WN_Transform from "./WN_Transform";
import WN_Component from "./WN_Component";
import WN_RendererComponent from "./components/renderers/WN_RendererComponent";
import EntityManager from "../../SceneManager/Scene/EntityManager/EntityManager";

class WN_GameObject extends WN_Object {
  transform: WN_Transform = new WN_Transform();
  entityManager: EntityManager;
  children: Array<WN_GameObject> = new Array();
  components: Array<WN_Component> = new Array();
  renderComponents: Array<WN_RendererComponent> = new Array();

  constructor({ name, entityManager }: { name: string, entityManager: EntityManager }) {
    super({ name });
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
