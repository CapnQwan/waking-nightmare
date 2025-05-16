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

  renderComponent(
    mvpMatrix: Float32Array,
    projectionMatrix: Float32Array,
    resolution: Float32Array
  ) {
    const positionMatrix = this.transform?.position.toMatrix();

    this.material.use();

    this.material.setAttribute('aPosition', positionMatrix);
    this.material.updateAttributes();

    this.material.setUniform('uModelViewMatrix', mvpMatrix);
    this.material.setUniform('uProjectionMatrix', projectionMatrix);
    this.material.setUniform('uResolution', resolution);
    this.material.updateUniforms();

    this.mesh.bind();
    this.mesh.draw();
  }
}
