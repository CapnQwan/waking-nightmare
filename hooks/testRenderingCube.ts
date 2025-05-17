import { useEffect } from 'react';
import {
  createIdentityMatrix,
  createPerspectiveMatrix,
  translateMatrix,
  rotateMatrix,
} from './martrixUtils';
import { Canvas } from '../helpers/waking-nightmare/Rendering/Canvas';

type TUseRenderCube = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

// Vertex Shader
const vertexShaderSource = `
    attribute vec4 aPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
    }
`;

// Fragment Shader (Orange color: RGB = 1.0, 0.5, 0.0)
const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
    }
`;

const vertices = new Float32Array([
  // Front face
  // Vertex 0
  -1.0, -1.0, 1.0,
  // Vertex 1
  1.0, -1.0, 1.0,
  // Vertex 2
  1.0, 1.0, 1.0,
  // Vertex 3
  -1.0, 1.0, 1.0,
  // Back face
  // Vertex 4
  -1.0, -1.0, -1.0,
  // Vertex 5
  -1.0, 1.0, -1.0,
  // Vertex 6
  1.0, 1.0, -1.0,
  // Vertex 7
  1.0, -1.0, -1.0,
]);

const indices = new Uint16Array([
  // Front
  0, 1, 2, 0, 2, 3,
  // Back
  4, 5, 6, 4, 6, 7,
  // Left
  4, 0, 3, 4, 3, 5,
  // Right
  1, 7, 6, 1, 6, 2,
  // Top
  3, 2, 6, 3, 6, 5,
  // Bottom
  4, 7, 1, 4, 1, 0,
]);

export const useRenderCube = () => {
  useEffect(() => {
    const canvasClass = new Canvas();

    // Get the WebGL context
    const canvas = canvasClass.canvas;
    const gl = canvasClass.gl;

    // Create Shader Program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader) {
      console.error('Vertex shader creation failed');
      return;
    }

    if (!fragmentShader) {
      console.error('Fragment shader creation failed');
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      console.error('Failed to create WebGL program');
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Create Vertex Buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Create Index Buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Set up Attributes
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    // Set up Matrices
    let modelViewMatrix = createIdentityMatrix();
    const projectionMatrix = createPerspectiveMatrix(
      Math.PI / 4,
      canvas.width / canvas.height,
      0.1,
      100.0
    );
    modelViewMatrix = translateMatrix(modelViewMatrix, 0.0, 0.0, -5.0);
    modelViewMatrix = rotateMatrix(modelViewMatrix, 0.7, [1, 1, 0]);

    // Pass matrices to shaders
    const uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');
    const uProjectionMatrix = gl.getUniformLocation(
      program,
      'uProjectionMatrix'
    );
    gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    // Set up WebGL rendering
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Render the cube
    function render() {
      if (!gl) return;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      // Optional: Animate by updating modelViewMatrix and calling requestAnimationFrame
      requestAnimationFrame(render);
    }
    render();
  }, []);
};

// Compile Shader
function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    console.error('Unable to create shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
