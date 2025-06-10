import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';
import { MathWN } from '../utils/math/MathWN';
import { random } from '../utils/math/Random';
import { time } from '../utils/math/Time';
import { Vector3 } from '../utils/math/Vectors/Vector3';

export class DemoComponent extends MonoBehaviour {
  rotationVelocity: Vector3 = new Vector3(0, 0, 0);
  maxRotationVelocity: number = 0.5;

  awake(): void {}

  start(): void {}

  onUpdate(): void {
    this.rotationVelocity.x += random.nextInRange(-0.001, 0.001);
    this.rotationVelocity.y += random.nextInRange(-0.001, 0.001);
    this.rotationVelocity.x = MathWN.clamp(
      this.rotationVelocity.x,
      this.maxRotationVelocity * -1,
      this.maxRotationVelocity
    );
    this.rotationVelocity.y = MathWN.clamp(
      this.rotationVelocity.y,
      this.maxRotationVelocity * -1,
      this.maxRotationVelocity
    );

    this.parent?.transform.rotation.rotateYaw(this.rotationVelocity.x);
    this.parent?.transform.rotation.rotatePitch(this.rotationVelocity.y);
    if (this.parent) {
      this.parent.transform.position.x = -7;
      this.parent.transform.position.y = 3;
      //this.parent.transform.position.x = Math.sin(time.time * 3) * 3;
      //this.parent.transform.position.y = Math.cos(time.time * 4);
    }
  }
}
