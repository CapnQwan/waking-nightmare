import {
  Component,
  IComponentConstructor,
} from '@/helpers/waking-nightmare/GameObjects/Component/Component';
import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';

export interface IRenderComponentConstructor extends IComponentConstructor {
  material?: Material;
  mesh?: Mesh;
}

export class RendererComponent extends Component {
  material: Material;
  mesh: Mesh;

  constructor(params: IRenderComponentConstructor) {
    super(params);
    this.material = params.material ?? new Material({});
    this.mesh = params.mesh ?? new Mesh({});
  }

  renderComponet() {
    this.material.use();
    this.mesh.bind();
  }
}
