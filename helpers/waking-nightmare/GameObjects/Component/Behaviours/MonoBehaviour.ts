import { Behaviour, IBehaviourConstructor } from './Behaviour';

export interface IMonoBehaviourConstructor extends IBehaviourConstructor {}

export class MonoBehaviour extends Behaviour {
  constructor(params: IMonoBehaviourConstructor) {
    super(params);
  }

  /** Extendable function for handling logic when the component is initialized */
  onAwake() {}

  /** Extendable function for handling logic when the project is started */
  onStart() {}

  /** Extendable function for handling logic every frame */
  onUpdate() {}

  /** Extendable function for handling logic when the component is enabled */
  onEnable() {}

  /** Extendable function for handling logic when the component is disabled */
  onDisable() {}

  /** Extendable function for handling logic when the component is destroyed */
  onDestroy() {}
}
