class InputInstance {
  public static instance: InputInstance;
  private _keys: Set<string>;
  private _mouseButtons: Set<number>;
  private _mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private _mouseDelta: { x: number; y: number } = { x: 0, y: 0 };
  private _mouseWorldPosition: { x: number; y: number } = { x: 0, y: 0 };
  private _mouseWorldDelta: { x: number; y: number } = { x: 0, y: 0 };

  public get mousePosition(): { x: number; y: number } {
    return this._mousePosition;
  }

  public get mouseDelta(): { x: number; y: number } {
    return this._mouseDelta;
  }

  public get mouseWorldPosition(): { x: number; y: number } {
    return this._mouseWorldPosition;
  }

  public constructor() {
    this._keys = new Set<string>();
    this._mouseButtons = new Set<number>();

    //WNCore.on('')

    window.addEventListener('keydown', (event) => {
      this._keys.add(event.key);
    });

    window.addEventListener('keyup', (event) => {
      this._keys.delete(event.key);
    });

    window.addEventListener('mousedown', (event) => {
      this._mouseButtons.add(event.button);
    });

    window.addEventListener('mouseup', (event) => {
      this._mouseButtons.delete(event.button);
    });

    window.addEventListener('mousemove', (event) => {
      this._mouseDelta.x = this._mousePosition.x
        ? event.clientX - this._mousePosition.x
        : 0;
      this._mouseDelta.y = this._mousePosition.y
        ? (event.clientY - this._mousePosition.y) * -1
        : 0;

      this._mousePosition.x = event.clientX;
      this._mousePosition.y = event.clientY;

      /** @note this assumes the game will always be at (0,0) */
      const ndcX = (event.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -((event.clientY / window.innerHeight) * 2 - 1);
      const ndc = [ndcX, ndcY, -1, 1];

      const previousWorldPosition = this._mouseWorldPosition;

      /** @todo implement world position mouse logic */
      this._mouseWorldPosition.x = event.clientX;
      this._mouseWorldPosition.y = event.clientY;
    });
  }

  public static getInstance(): InputInstance {
    if (!InputInstance.instance) {
      InputInstance.instance = new InputInstance();
    }
    return InputInstance.instance;
  }

  public isKeyPressed(key: string): boolean {
    return this._keys.has(key);
  }

  public isMouseButtonPressed(button: number): boolean {
    return this._mouseButtons.has(button);
  }

  public update(): void {
    this._mouseDelta = { x: 0, y: 0 };
  }
}

export const Input = InputInstance.getInstance();
