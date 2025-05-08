import { Material } from '@/helpers/waking-nightmare/Rendering/classes/Material';
import { Mesh } from '@/helpers/waking-nightmare/Rendering/classes/Mesh';
import { Behaviour, IBehaviourConstructor } from '../../Behaviours/Behaviour';
import { Component } from '../../Component';
import ServiceLocator from '@/helpers/waking-nightmare/ServiceLocator/ServiceLocator';
import { Canvas } from '@/helpers/waking-nightmare/Rendering/Canvas';

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

  renderComponet(component: Component, mvpMatrix: Float32Array) {
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;

    this.material.use();
    this.material.setUniform('u_mvp', mvpMatrix);
    this.material.setUniform(
      'u_resolution',
      new Float32Array([gl.canvas.width, gl.canvas.height])
    );
    this.material.updateUniforms();

    this.mesh.draw();
  }
}
