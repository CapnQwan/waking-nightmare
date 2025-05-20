import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';
import { Canvas } from '@/helpers/waking-nightmare/Rendering/Canvas';
import ServiceLocator from '@/helpers/waking-nightmare/ServiceLocator/ServiceLocator';
import { createIdentityMatrix } from '@/hooks/martrixUtils';

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

  renderComponent(viewMatrix: Float32Array, projectionMatrix: Float32Array) {
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;
    const modelMatrix = this.transform?.getModelMatrix();
    //const modelMatrix = createIdentityMatrix();

    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    //console.log('model matrix', modelMatrix);

    this.material.use();

    const positionLocation = gl.getAttribLocation(
      this.material.shader.program,
      'aPosition'
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vbo);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    //this.material.setUniform('uViewProjectionMatrix', viewProjectionMatrix);
    this.material.setUniform('uProjectionMatrix', projectionMatrix);
    this.material.setUniform('uViewMatrix', viewMatrix);
    this.material.setUniform('uModelMatrix', modelMatrix);
    this.material.updateUniforms();

    this.mesh.bind();
    this.mesh.draw();
  }
}
