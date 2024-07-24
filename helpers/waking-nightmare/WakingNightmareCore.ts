import WN_Time from './classes/math/WN_Time';
import WN_GameObject from './GameObjects/GameObject/WN_GameObject';
import Renderer from './renderer/Renderer';
import QuadrentManager from './SceneManager/Scene/EntityManager/QuadrentManager/QuadrentManager';
import SceneManager from './SceneManager/SceneManager';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<WN_GameObject>;
}

class WNCore {
  isDebugging: boolean;
  time: WN_Time = new WN_Time();
  quadrentManager: QuadrentManager;
  renderer: Renderer = new Renderer(this);
  sceneManager: SceneManager = new SceneManager(this);

  constructor({ isDebugging = true, scene = [] }: constructionProps) {
    this.isDebugging = isDebugging;
    this.quadrentManager =
      this.sceneManager.scene.entityManager.quadrantManager;

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.renderer.ctx?.clearRect(
      0,
      0,
      this.renderer.canvas.width,
      this.renderer.canvas.height
    );

    if (this.isDebugging) {
      this.time.renderPerformance(this.renderer);
    }

    requestAnimationFrame(this.update);
  };
}

export default WNCore;
