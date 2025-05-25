import { entityManager } from './EntityManager/EntityManager';
import { GameObject } from './GameObjects/GameObject/GameObject';
import { renderer } from './Rendering/Renderer';
import { time } from './utils/math/Time';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<GameObject>;
}

export class WNCore {
  isDebugging: boolean = true;

  private static instance: WNCore;

  constructor({ isDebugging = true }: constructionProps) {
    if (WNCore.instance) {
      return WNCore.instance;
    }

    this.isDebugging = isDebugging;

    WNCore.instance = this;

    requestAnimationFrame(this.update);

    time.update();
  }

  update = () => {
    time.update();
    entityManager.updateObjects();
    renderer.render();

    requestAnimationFrame(this.update);
  };
}
