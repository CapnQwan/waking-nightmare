import { Scene } from './Scene/Scene';

export class SceneManager {
  activeScene: Scene;

  constructor({ scene }: { scene?: Scene }) {
    this.activeScene = scene ? scene : new Scene(this);
  }

  loadScene(scene: Scene) {
    this.activeScene = scene;
  }
}
