import WNCore from '../WakingNightmareCore';
import Scene from './Scene/Scene';

class SceneManager {
  wncore: WNCore;
  scene: Scene;

  constructor(core: WNCore) {
    this.wncore = core;
    this.scene = new Scene(this);
  }
}

export default SceneManager;
