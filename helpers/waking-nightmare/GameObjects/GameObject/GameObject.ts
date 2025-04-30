import { IObjectConstructor, Object } from '../Object';
import { Component } from 'react';
import { RendererComponent } from '@/helpers/waking-nightmare/GameObjects/Component/components/renderering/RendererComponent';
import { Transfrom } from '../../utils/math/Transform';

export interface IGameObjectConstructor extends IObjectConstructor {}

export class GameObject extends Object {
  transform: Transfrom = new Transfrom();
  children: GameObject[] = [];
  components: Component[] = [];
  renderComponents: RendererComponent[] = [];

  constructor(params: IGameObjectConstructor) {
    super(params);
  }

  addComponent = (component: Component) => {
    this.components.push(component);

    if (component instanceof RendererComponent) {
      this.renderComponents.push(component);
    }
  };

  addChild = (gameObject: GameObject) => {
    this.children.push(gameObject);
  };
}
