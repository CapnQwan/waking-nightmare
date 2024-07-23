import WN_Time from "./classes/math/WN_Time";
import WN_GameObject from "./classes/modules/WN_GameObject";
import Renderer from "./Renderer/Renderer";
import SceneManager from "./SceneManager/SceneManager";

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<WN_GameObject>;
}

class WNCore {
  isDebugging: boolean;
  renderer: Renderer = new Renderer();
  time: WN_Time = new WN_Time();
  sceneManager: SceneManager = new SceneManager();

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

    requestAnimationFrame(this.update);
  }
};

export default WNCore;
