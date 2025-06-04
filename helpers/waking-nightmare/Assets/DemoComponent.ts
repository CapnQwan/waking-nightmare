import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import { random } from '../utils/math/Random';
import { time } from '../utils/math/Time';

export class DemoComponent extends MonoBehaviour {
  awake(): void {}

  start(): void {}

  onUpdate(): void {
    this.parent?.transform.rotation.rotateYaw(random.nextInRange(0.02, 0.05));
    this.parent?.transform.rotation.rotatePitch(random.nextInRange(0.02, 0.05));
    if (this.parent) {
      this.parent.transform.position.x = -7;
      this.parent.transform.position.y = 3;
      //this.parent.transform.position.x = Math.sin(time.time * 3) * 3;
      //this.parent.transform.position.y = Math.cos(time.time * 4);
    }
  }
}
