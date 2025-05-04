export class SceneManager {
  activeScene: string = '';

  saveScene(scene: string) {}

  saveGameObjects() {}

  saveComponents() {}

  loadScene(scene: string) {
    this.activeScene = scene;
    this.loadGameObjects();
  }

  /**
   * Iterate through the game objects of a scene and
   * generate the game objects for the current scene
   */
  loadGameObjects() {
    //TODO: Register game objects here
  }

  /**
   * Iterate through the scene data of an object and
   * generate the components for the current object
   */
  loadComponents() {
    // TODO: Register components here
  }
}
