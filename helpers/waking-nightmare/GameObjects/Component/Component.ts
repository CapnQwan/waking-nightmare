import WN_Transform from '../../utils/math/Transform';
import GameObject from '../GameObject/GameObject';
import Object from '../Object';

class Component extends Object {
  parent: GameObject;
  transform: WN_Transform;

  constructor({ parent }: { parent: GameObject }) {
    super({});
    this.parent = parent;
    this.transform = parent.transform;
  }
}

export default Component;
