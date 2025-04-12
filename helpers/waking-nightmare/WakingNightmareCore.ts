import EntityManager from './EntityManager/EntityManager';
import GameObject from './GameObjects/GameObject/GameObject';
import Canvas from './Rendering/Canvas';
import Renderer from './Rendering/Renderer';
import SceneManager from './SceneManager/SceneManager';
import ServiceLocator from './ServiceLocator/ServiceLocator';
import time from './utils/math/Time';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<GameObject>;
}

class WNCore {
  isDebugging: boolean = true;
  canvas!: Canvas;
  entityManager!: EntityManager;
  sceneManager!: SceneManager;
  renderer!: Renderer;

  private static instance: WNCore;

  constructor({ isDebugging = true, scene = [] }: constructionProps) {
    if (WNCore.instance) {
      return WNCore.instance;
    }

    this.isDebugging = isDebugging;

    this.canvas = new Canvas();
    this.entityManager = new EntityManager();
    this.sceneManager = new SceneManager({ core: this });
    this.renderer = new Renderer(this.entityManager);

    const services = ServiceLocator.getInstance();
    services.register('canvas', this.canvas);
    services.register('entityManager', this.entityManager);
    services.register('sceneManager', this.sceneManager);
    services.register('renderer', this.renderer);
    services.register('time', time);

    WNCore.instance = this;

    requestAnimationFrame(this.update);

    time.update();
  }

  update = () => {
    this.entityManager.updateBehaviours();
    this.renderer.render();

    if (this.isDebugging) {
      time.renderPerformance(this.canvas);
    }

    requestAnimationFrame(this.update);
  };
}

export default WNCore;
