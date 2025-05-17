import {
  getFragmentShader,
  getVertexShader,
} from '@/helpers/WebGL/WebGLShadersHelper';
import { EntityManager } from '../EntityManager/EntityManager';
import { CameraComponent } from '../GameObjects/Component/components/renderering/CameraComponent';
import ServiceLocator from '../ServiceLocator/ServiceLocator';
import defaultVertexShader from '@/public/shaders/defaultVertexShader.glsl';
import defaultFragmentShader from '@/public/shaders/defaultFragmentShader.glsl';
import { Canvas } from './Canvas';
import { getProgram } from '@/helpers/WebGL/WebGLProgramsHelper';
import { generateCube } from './classes/Meshes/Cube';
import { createIdentityMatrix } from '@/hooks/martrixUtils';
import test from 'node:test';

export class Renderer {
  constructor() {}

  render = () => {
    this.clearCanvas();
    this.renderCameras();
  };

  private clearCanvas() {
    const gl = ServiceLocator.get<Canvas>(Canvas).gl;
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  private renderCameras() {
    const entityManager = ServiceLocator.get<EntityManager>(EntityManager);
    const canvas = ServiceLocator.get<Canvas>(Canvas);

    const cameras = entityManager.cameras;

    if (!cameras.length) {
      console.error('No cameras found.');
      return;
    }

    cameras.forEach((camera) =>
      this.renderCamera(camera, canvas, entityManager)
    );
  }

  private renderCamera(
    camera: CameraComponent,
    canvas: Canvas,
    entityManager: EntityManager
  ) {
    const viewMatrix = camera.getViewMatrix();

    const gl = ServiceLocator.get<Canvas>(Canvas).gl;

    const testRenderComponent = entityManager.renderers[0];
    if (!testRenderComponent.transform) {
      console.error('Test render component does not have a transform');
      return;
    }

    testRenderComponent.material.use();
    const program = testRenderComponent.material.shader.program;

    // TODO: update this to use the camers output to get the aspect ratio
    const aspectRatio = this.getAspectRatio(canvas);
    const projectionMatrix = camera.getProjectionMatrix(aspectRatio);

    const renderableEntities = entityManager.renderers;

    const viewProjectionMatrix = projectionMatrix.multiply(viewMatrix);

    testRenderComponent.mesh.bind();

    //// Create Vertex Buffer
    //const vertexBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //gl.bufferData(
    //  gl.ARRAY_BUFFER,
    //  testRenderComponent.mesh.verticies,
    //  gl.STATIC_DRAW
    //);
    //
    //// Create Index Buffer
    //const indexBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    //gl.bufferData(
    //  gl.ELEMENT_ARRAY_BUFFER,
    //  testRenderComponent.mesh.triangles,
    //  gl.STATIC_DRAW
    //);

    // Set up Attributes
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, testRenderComponent.mesh.vbo);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const modelMatrix = testRenderComponent.transform.getModelMatrix();

    const uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix');
    const uViewProjectionMatrix = gl.getUniformLocation(
      program,
      'uViewProjectionMatrix'
    );
    gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix);
    gl.uniformMatrix4fv(
      uViewProjectionMatrix,
      false,
      viewProjectionMatrix.elements
    );

    gl.drawElements(
      gl.TRIANGLES,
      testRenderComponent.mesh.triangles.length,
      gl.UNSIGNED_SHORT,
      0
    );
    // renderableEntities.forEach((renderEntity) => {
    //   renderEntity.renderComponent(viewProjectionMatrix.elements);
    // });
  }

  private getAspectRatio(output: Canvas): number {
    return output.width / output.height;
  }
}
