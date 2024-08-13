import WN_Behaviour from '../waking-nightmare/GameObjects/Component/Behaviours/WN_Behaviour';
import time from '../waking-nightmare/classes/math/WN_Time';

class MovingComponent extends WN_Behaviour {
  velocityX: number = 80;
  velocityY: number = 80;
  minX: number = 20;
  minY: number = 20;
  maxX: number = 400;
  maxY: number = 400;

  update = () => {
    this.transform.position.x += this.velocityX * time.deltaTime;
    this.transform.position.y += this.velocityY * time.deltaTime;

    if (
      (this.transform.position.x < this.minX && this.velocityX < 0) ||
      (this.transform.position.x > this.maxX && this.velocityX > 0)
    ) {
      this.velocityX *= -1;
    }
    if (
      (this.transform.position.y < this.minY && this.velocityY < 0) ||
      (this.transform.position.y > this.maxY && this.velocityY > 0)
    ) {
      this.velocityY *= -1;
    }
  };
}

export default MovingComponent;
