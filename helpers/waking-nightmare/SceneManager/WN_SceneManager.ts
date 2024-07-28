import WNCore from '../WakingNightmareCore';
import WN_Scene from './Scene/WN_Scene';

class WN_SceneManager {
  wncore: WNCore;
  scene: WN_Scene;

  constructor({ core, scene }: { core: WNCore; scene?: WN_Scene }) {
    this.wncore = core;
    this.scene = scene ? scene : new WN_Scene(this);
  }
}

export default WN_SceneManager;
