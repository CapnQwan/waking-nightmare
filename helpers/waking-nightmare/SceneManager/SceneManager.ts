import WNCore from '../WakingNightmareCore';
import Scene from './Scene/Scene';

class SceneManager {
  wncore: WNCore;
  scene: Scene;

  constructor({ core, scene }: { core: WNCore; scene?: Scene }) {
    this.wncore = core;
    this.scene = scene ? scene : new Scene(this);
  }
}

export default SceneManager;
