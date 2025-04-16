import { Object, IObjectConstructor } from '../Object';
import { GameObject } from '../GameObject/GameObject';

export interface IComponentConstructor extends IObjectConstructor {
  parent?: GameObject | null;
}

export class Component extends Object {
  parent: GameObject | null;

  constructor(params: IComponentConstructor) {
    super(params);
    this.parent = params.parent ?? null;
  }

  setParent(parent: GameObject) {
    this.parent = parent;
  }
}
