import { IObjectConstructor, Object } from '../Object';
import { RendererComponent } from '@/helpers/waking-nightmare/GameObjects/Component/components/renderering/RendererComponent';
import { Transform } from '../../utils/math/Transform';
import { Component } from '../Component/Component';

export interface IGameObjectConstructor extends IObjectConstructor {}

export class GameObject extends Object {
  transform: Transform = new Transform();
  children: GameObject[] = [];
  components: Component[] = [];
  renderComponents: RendererComponent[] = [];

  constructor(params: IGameObjectConstructor) {
    super(params);
  }

  addComponent = (component: Component) => {
    this.components.push(component);
    component.parent = this;

    if (component instanceof RendererComponent) {
      this.renderComponents.push(component);
    }
  };

  addChild = (gameObject: GameObject) => {
    this.children.push(gameObject);
  };
}
