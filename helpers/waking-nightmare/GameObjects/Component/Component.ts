import { Object, IObjectConstructor } from '../Object';
import { GameObject } from '../GameObject/GameObject';

export interface IComponentConstructor extends IObjectConstructor {
  parent?: GameObject | null;
}

export class Component extends Object {
  private _parent: GameObject | null;

  constructor(params: IComponentConstructor) {
    super(params);
    this._parent = params.parent ?? null;
  }

  get parent(): GameObject | null {
    return this._parent;
  }

  set parent(parent: GameObject | null) {
    this._parent = parent;
  }

  get transform() {
    return this._parent?.transform;
  }
}
