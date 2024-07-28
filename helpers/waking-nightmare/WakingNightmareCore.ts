import WN_Time from './classes/math/WN_Time';
import WN_EntityManager from './EntityManager/WN_EntityManager';
import WN_GameObject from './GameObjects/GameObject/WN_GameObject';
import WN_Canvas from './Rendering/WN_Canvas';
import WN_Renderer from './Rendering/WN_Renderer';
import WN_SceneManager from './SceneManager/WN_SceneManager';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<WN_GameObject>;
}

class WNCore {
  isDebugging: boolean;
  time: WN_Time;
  canvas: WN_Canvas;
  entityManager: WN_EntityManager;
  sceneManager: WN_SceneManager;
  renderer: WN_Renderer;

  constructor({ isDebugging = true, scene = [] }: constructionProps) {
    this.isDebugging = isDebugging;

    this.time = new WN_Time();
    this.canvas = new WN_Canvas();
    this.sceneManager = new WN_SceneManager({ core: this });
    this.entityManager = new WN_EntityManager();
    this.renderer = new WN_Renderer(this.entityManager);

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.canvas.clearCanvas();

    if (this.isDebugging) {
      this.time.renderPerformance(this.canvas);
    }

    requestAnimationFrame(this.update);
  };
}

export default WNCore;
