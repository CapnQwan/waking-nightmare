import { Object, IObjectConstructor } from '../Object';
import { GameObject } from '../GameObject/GameObject';

export interface IComponentConstructor extends IObjectConstructor {
  parent?: GameObject | null;
}

export class Component extends Object {
  public parent: GameObject | null;

  constructor(params: IComponentConstructor) {
    super(params);
    this.parent = params.parent ?? null;
  }

  get transform() {
    return this.parent?.transform ?? null;
  }
}
