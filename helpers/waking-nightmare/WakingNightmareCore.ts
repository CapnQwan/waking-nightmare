import GameObject from "./classes/game-objects/GameObject";
import Time from "./classes/math/Time";
import Renderer from "./Renderer/Renderer";
import Scene from "./scene/scene";

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<GameObject>;
}

class WNCore {
  isDebugging: boolean;
  renderer: Renderer = new Renderer();
  time: Time = new Time();
  scene: Scene = new Scene();

  constructor({
    isDebugging = true,
    scene = [],
  }: constructionProps) {
    this.isDebugging = isDebugging;
    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.renderer.ctx?.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

    if (this.isDebugging) {
      this.time.renderPerformance(this.renderer);
    }
    this.scene.update();
    requestAnimationFrame(this.update);
  }
};

export default WNCore;
