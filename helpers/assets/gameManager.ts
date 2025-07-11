import { MonoBehaviour } from '../waking-nightmare/waking-nightmare_core/gameObject/behaviours/monoBehaviour';

export class GameManager extends MonoBehaviour {
  public static instance: GameManager;
  gameState: string;

  constructor() {
    super({});
    this.gameState = 'initial';

    if (GameManager.instance) {
      return GameManager.instance;
    }

    GameManager.instance = this;
  }

  onUpdate(): void {
    // Game management logic can be implemented here
  }
}
