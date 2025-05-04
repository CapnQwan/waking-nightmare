import { Component, IComponentConstructor } from '../Component';

export interface IBehaviourConstructor extends IComponentConstructor {
  enabled?: boolean;
}

export class Behaviour extends Component {
  private _enabled: boolean = true;

  constructor(params: IBehaviourConstructor) {
    super(params);
    this._enabled = params.enabled ?? true;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }
}
