import { entityManager } from './entityManager/entityManager';
import { renderer } from './rendering/renderer';
import { time } from './utils/time';

interface constructionProps {
  isDebugging?: boolean;
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

    this.preUpdate = this.preUpdate.bind(this);
    this.earlyUpdate = this.earlyUpdate.bind(this);
    this.update = this.update.bind(this);
    this.lateUpdate = this.lateUpdate.bind(this);
    this.postUpdate = this.postUpdate.bind(this);

    requestAnimationFrame(this.preUpdate);

    time.update();
  }

  private preUpdate() {
    time.update();
    this.earlyUpdate();
  }

  private earlyUpdate() {
    this.update();
  }

  private update() {
    entityManager.updateObjects();
    this.lateUpdate();
  }

  private lateUpdate() {
    this.postUpdate();
  }

  private postUpdate() {
    renderer.render();
    requestAnimationFrame(this.preUpdate);
  }
}
