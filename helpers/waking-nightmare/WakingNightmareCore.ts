import Time from "./classes/math/Time";
import Renderer from "./Renderer/Renderer";

interface constructionProps {
  isDebugging: boolean;
}

class WNCore {
  isDebugging: boolean;
  renderer: Renderer;
  time: Time;

  constructor({
    isDebbuging = true,
  }) {
    this.isDebugging = isDebbuging;
    this.renderer = new Renderer();
    this.time = new Time();
    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.renderer.ctx?.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

    if (this.isDebugging) {
      this.time.renderPerformance(this.renderer);
    }

    requestAnimationFrame(this.update);
  }
};

export default WNCore;
