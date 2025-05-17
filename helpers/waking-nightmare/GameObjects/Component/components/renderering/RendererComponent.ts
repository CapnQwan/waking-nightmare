import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';

export interface IRenderComponentConstructor extends IBehaviourConstructor {
  material?: Material;
  mesh?: Mesh;
}

export class RendererComponent extends Behaviour {
  material: Material;
  mesh: Mesh;

  constructor(params: IRenderComponentConstructor) {
    super(params);
    this.material = params.material ?? new Material({});
    this.mesh = params.mesh ?? new Mesh({});
  }

  renderComponent(viewProjectionMatrix: Float32Array) {
    const modelMatrix = this.transform?.getModelMatrix();

    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    this.material.use();

    this.material.setUniform('uViewProjectionMatrix', viewProjectionMatrix);
    this.material.setUniform('uModelMatrix', modelMatrix);
    this.material.updateUniforms();

    this.mesh.bind();
    this.mesh.draw();
  }
}
