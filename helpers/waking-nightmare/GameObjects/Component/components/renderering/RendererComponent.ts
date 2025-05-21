import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';
import { Canvas } from '@/helpers/waking-nightmare/Rendering/Canvas';
import ServiceLocator from '@/helpers/waking-nightmare/ServiceLocator/ServiceLocator';
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

    if (!this.mesh.vbo) return;

    if (!modelMatrix) {
      console.error('Model matrix is not defined.');
      return;
    }

    const modelViewMatrix = Matrix4x4.multiply(modelMatrix, viewMatrix);
    const normalMatrix = Matrix4x4.normalFromMat4(modelViewMatrix);

    this.material.use();

    this.material.bindAttribute('aPosition', this.mesh.vbo, 3);

    // Set up light properties
    this.material.setUniform('uLightPosition', [-10.0, -10.0, -10.0]);
    this.material.setUniform('uLightAmbient', [0.2, 0.2, 0.2]);
    this.material.setUniform('uLightDiffuse', [0.8, 0.8, 0.8]);
    this.material.setUniform('uLightSpecular', [1.0, 1.0, 1.0]);

    // Set up light properties
    this.material.setUniform('uMaterialAmbient', [0.2, 0.2, 0.2]);
    this.material.setUniform('uMaterialDiffuse', [0.5, 0.5, 0.5]);
    this.material.setUniform('uMaterialSpecular', [1.0, 1.0, 1.0]);
    this.material.setUniform('uMaterialShininess', 32);

    // Set up camera properties
    this.material.setUniform('uViewPosition', cameraPosition.toArray());

    //this.material.setUniform('uViewProjectionMatrix', viewProjectionMatrix);
    this.material.setUniform('uProjectionMatrix', projectionMatrix);
    this.material.setUniform('uViewMatrix', viewMatrix);
    this.material.setUniform('uModelMatrix', modelMatrix);
    this.material.setUniform('uNormalMatrix', normalMatrix);
    this.material.updateUniforms();

    this.mesh.bind();
    this.mesh.draw();
  }
}
