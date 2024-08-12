import WN_Behaviour from '../waking-nightmare/GameObjects/Component/Behaviours/WN_Behaviour';
import time from '../waking-nightmare/classes/math/WN_Time';

class MovingComponent extends WN_Behaviour {
  velocityX: number = 5;
  velocityY: number = 5;
  minX: number = 5;
  minY: number = 5;
  maxX: number = 100;
  maxY: number = 100;

  update = () => {
    this.transform.position.x += this.velocityX * time.deltaTime;
    this.transform.position.y += this.velocityY * Math.asin(time.deltaTime);

    if (
      this.transform.position.x < this.minX ||
      this.transform.position.x > this.maxX
    ) {
      this.velocityX *= -1;
    }
    if (
      this.transform.position.y < this.minY ||
      this.transform.position.y > this.maxY
    ) {
      this.velocityY *= -1;
    }
  };
}

export default MovingComponent;
