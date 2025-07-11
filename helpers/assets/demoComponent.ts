import { Input } from '../waking-nightmare/waking-nightmare_inputs/inputs';
import { time } from '../waking-nightmare/waking-nightmare_core/utils/time';
import { MonoBehaviour } from '../waking-nightmare/waking-nightmare_core/gameObject/behaviours/monoBehaviour';
import { Vector3 } from '../waking-nightmare/waking-nightmare_core/utils/math/vectors/vector3';

export class DemoComponent extends MonoBehaviour {
  rotationVelocity: Vector3 = new Vector3(0, 0, 0);
  maxRotationVelocity: number = 0.5;
  isBeingDragged: boolean = false;

  awake(): void {}

  start(): void {}

  onUpdate(): void {
    this.isBeingDragged = Input.isMouseButtonPressed(0);

    if (this.isBeingDragged && this.transform) {
      this.transform.position.x += Input.mouseDelta.x * time.deltaTime;
      this.transform.position.y += Input.mouseDelta.y * time.deltaTime;

      this.transform.rotation.rotatePitch(Input.mouseDelta.y * time.deltaTime);
      this.transform.rotation.rotateYaw(-Input.mouseDelta.x * time.deltaTime);
    }

    if (Input.isKeyPressed('w')) {
      if (this.transform) this.transform.position.y += 0.1;
    }
    if (Input.isKeyPressed('s')) {
      if (this.transform) this.transform.position.y -= 0.1;
    }
    if (Input.isKeyPressed('a')) {
      if (this.transform) this.transform.position.x -= 0.1;
    }
    if (Input.isKeyPressed('d')) {
      if (this.transform) this.transform.position.x += 0.1;
    }
  }
}
