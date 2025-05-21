import { EntityManager } from './EntityManager/EntityManager';
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
  time!: Time;
  canvas!: Canvas;
  renderer!: Renderer;
  sceneManager!: SceneManager;
  entityManager!: EntityManager;

  private static instance: WNCore;

  constructor({ isDebugging = true }: constructionProps) {
    if (WNCore.instance) {
      return WNCore.instance;
    }

    this.isDebugging = isDebugging;

    ServiceLocator.register(this);

    this.time = new Time();
    ServiceLocator.register(this.time);

    this.canvas = new Canvas();
    ServiceLocator.register(this.canvas);

    this.renderer = new Renderer();
    ServiceLocator.register(this.renderer);

    this.sceneManager = new SceneManager();
    ServiceLocator.register(this.sceneManager);

    this.entityManager = new EntityManager();
    ServiceLocator.register(this.entityManager);

    WNCore.instance = this;

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.time.update();
    this.entityManager.updateObjects();
    this.renderer.render();

    requestAnimationFrame(this.update);
  };
}
