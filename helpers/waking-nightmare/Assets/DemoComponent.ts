import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import { Time } from '../utils/math/Time';

export class DemoComponent extends MonoBehaviour {
  awake(): void {}

  start(): void {}

  onUpdate(): void {
    const time = ServiceLocator.get<Time>(Time);

    this.parent?.transform.rotation.rotateRoll(0.1);
    if (this.parent) {
      console.log(time.time);
      this.parent.transform.position.x = Math.sin(time.time) * 3;
    }
  }
}
