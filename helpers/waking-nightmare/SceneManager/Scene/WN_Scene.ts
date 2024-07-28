import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_SceneManager from '../WN_SceneManager';

class WN_Scene {
  sceneManager: WN_SceneManager;

  constructor(sceneManager: WN_SceneManager) {
    this.sceneManager = sceneManager;
  }
}

export default WN_Scene;
