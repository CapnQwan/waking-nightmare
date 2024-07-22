import WN_Object from "./WN_Object";
import WN_Transform from "./WN_Transform";
import WN_Component from "./WN_Component";

class WN_GameObject extends WN_Object {
  transform: WN_Transform = new WN_Transform();
  children: Array<WN_GameObject> = new Array();
  components: Array<WN_Component> = new Array();

  constructor({ name }: { name: string }) {
    super({ name });
  }

  AddChild = (gameObject: WN_GameObject) => {
    this.children.push(gameObject);
  };
}

export default WN_GameObject;
