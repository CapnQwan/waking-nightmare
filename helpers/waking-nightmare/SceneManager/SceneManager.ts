import Scene from './Scene/Scene';

class SceneManager {
  activeScene: Scene;

  constructor({ scene }: { scene?: Scene }) {
    this.activeScene = scene ? scene : new Scene(this);
  }
}

export default SceneManager;
