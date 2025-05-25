class InputManager {
  public static instance: InputManager;

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }
    return InputManager.instance;
  }
}

export const inputManager = InputManager.getInstance();
