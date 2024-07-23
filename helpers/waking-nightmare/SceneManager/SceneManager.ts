import WNCore from "../WakingNightmareCore";
import Scene from "./Scene/Scene";

class SceneManager {
  wncore: WNCore;
  scene: Scene = new Scene(this);

  constructor(core: WNCore) {
    this.wncore = core;
  }
}

export default SceneManager;
