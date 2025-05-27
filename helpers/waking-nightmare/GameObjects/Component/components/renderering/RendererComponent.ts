import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';
import { Vector3 } from '@/helpers/waking-nightmare/utils/math/Vectors/Vector3';
import { Matrix4x4 } from '@/helpers/waking-nightmare/utils/math/Matrix/Matrix4x4';

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
    viewMatrix: Matrix4x4,
    projectionMatrix: Matrix4x4,
    cameraPosition: Vector3
  ) {
    const modelMatrix = this.transform?.getModelMatrix();

    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    this.material.use();

    if (this.mesh.vbo)
      this.material.bindAttribute('aPosition', this.mesh.vbo, 3);
    if (this.mesh.uvbo) this.material.bindAttribute('aUV', this.mesh.uvbo, 2);
    if (this.mesh.nbo) this.material.bindAttribute('aNormal', this.mesh.nbo, 3);

    const modelViewMatrix = Matrix4x4.multiply(modelMatrix, viewMatrix);
    const normalMatrix = Matrix4x4.normalFromMat4(modelViewMatrix)?.elements;

    // Set up MVP properties
    this.material.setUniform('uViewPosition', cameraPosition.toFloat32Array());
    this.material.setUniform('uProjectionMatrix', projectionMatrix.elements);
    this.material.setUniform('uViewMatrix', viewMatrix.elements);
    this.material.setUniform('uModelMatrix', modelMatrix.elements);
    this.material.setUniform(
      'uNormalMatrix',
      normalMatrix ?? new Float32Array(9)
    );

    this.mesh.draw();
  }
}
