import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import SceneManager from '../SceneManager';

class Scene {
  sceneManager: SceneManager;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
  }
}

export default Scene;
