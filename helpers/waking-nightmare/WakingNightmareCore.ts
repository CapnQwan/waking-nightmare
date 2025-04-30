import { GameObject } from './GameObjects/GameObject/GameObject';
import { Canvas } from './Rendering/Canvas';
import { Renderer } from './Rendering/Renderer';
import { SceneManager } from './SceneManager/SceneManager';
import ServiceLocator from './ServiceLocator/ServiceLocator';
import { Time } from './utils/math/Time';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<GameObject>;
}

export class WNCore {
  isDebugging: boolean = true;
  canvas!: Canvas;
  sceneManager!: SceneManager;
  renderer!: Renderer;
  time!: Time;

  private static instance: WNCore;

  constructor({ isDebugging = true }: constructionProps) {
    if (WNCore.instance) {
      return WNCore.instance;
    }

    this.isDebugging = isDebugging;

    this.canvas = new Canvas();
    this.sceneManager = new SceneManager({});
    this.renderer = new Renderer();
    this.time = new Time();

    const services = ServiceLocator;
    services.register('core', this);
    services.register('canvas', this.canvas);
    services.register('sceneManager', this.sceneManager);
    services.register('renderer', this.renderer);
    services.register('time', this.time);

    WNCore.instance = this;

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.sceneManager.activeScene.updateBehaviours();
    this.renderer.render();

    requestAnimationFrame(this.update);
  };
}
