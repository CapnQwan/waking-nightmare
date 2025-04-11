import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import SceneManager from '../SceneManager';

class Scene {
  sceneManager: SceneManager;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
  }
}

export default Scene;
