import WN_Transform from '../../classes/math/WN_Transform';
import WN_GameObject from '../GameObject/WN_GameObject';
import WN_Object from '../WN_Object';

class WN_Component extends WN_Object {
  parent: WN_GameObject;
  transform: WN_Transform;

  constructor({ parent }: { parent: WN_GameObject }) {
    super({});
    this.parent = parent;
    this.transform = parent.transform;
  }
}

export default WN_Component;
