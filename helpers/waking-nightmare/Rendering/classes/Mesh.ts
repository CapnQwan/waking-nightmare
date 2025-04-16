import ServiceLocator from '../../ServiceLocator/ServiceLocator';
import Vector2 from '../../utils/math/Vectors/Vector2';
import Vector3 from '../../utils/math/Vectors/Vector3';
import Canvas from '../Canvas';

/**
 * Configuration object for creating a new Mesh instance
 */
type TMeshConstructor = {
  /** Array of triangle indices (3 indices per triangle) */
  triangles?: number[];
  /** Array of vertex positions in 3D space */
  verticies?: Vector3[];
  /** Array of UV coordinates for texture mapping */
  uvs?: Vector2[];
  /** Array of normal vectors for lighting calculations */
  normals?: Vector2[];
};

/**
 * Mesh class represents a 3D mesh with vertices, triangles, UVs, and normals.
 * It's used to define the geometry of 3D objects in the scene.
 */
class Mesh {
  /** Array of triangle indices (3 indices per triangle) */
  private _triangles: number[];
  /** Array of vertex positions in 3D space */
  private _verticies: Vector3[];
  /** Array of UV coordinates for texture mapping */
  private _uvs: Vector2[];
  /** Array of normal vectors for lighting calculations */
  private _normals: Vector2[];
  /** Vertex Array Object stores the state of vertex attribute bindings */
  private _vao: WebGLVertexArrayObject | null = null;
  /** Buffer containing vertex position data (x, y, z coordinates) */
  private _vertexBuffer: WebGLBuffer | null = null;
  /** Buffer containing texture coordinate data (u, v coordinates) */
  private _uvBuffer: WebGLBuffer | null = null;
  /** Buffer containing vertex normal data for lighting calculations */
  private _normalBuffer: WebGLBuffer | null = null;
  /** Buffer containing triangle indices that define mesh topology */
  private _indexBuffer: WebGLBuffer | null = null;

  /**
   * Gets the array of triangle indices
   */
  get triangles(): number[] {
    return this._triangles;
  }

  /**
   * Gets the array of vertex positions
   */
  get verticies(): Vector3[] {
    return this._verticies;
  }

  /**
   * Gets the array of UV coordinates
   */
  get uvs(): Vector2[] {
    return this._uvs;
  }

  /**
   * Gets the array of normal vectors
   */
  get normals(): Vector2[] {
    return this._normals;
  }

  /**
   * Creates a new Mesh instance
   * @param triangles - Optional array of triangle indices
   * @param verticies - Optional array of vertex positions
   * @param uvs - Optional array of UV coordinates
   * @param normals - Optional array of normal vectors
   */
  constructor({
    triangles = [],
    verticies = [],
    uvs = [],
    normals = [],
  }: TMeshConstructor = {}) {
    this._triangles = triangles;
    this._verticies = verticies;
    this._uvs = uvs;
    this._normals = normals;
  }

  /**
   * Adds a new triangle to the mesh
   * @param v1 - Index of first vertex
   * @param v2 - Index of second vertex
   * @param v3 - Index of third vertex
   */
  addTriangle(v1: number, v2: number, v3: number) {
    this._triangles.push(v1, v2, v3);
  }

  /**
   * Adds a new vertex to the mesh
   * @param vertex - The vertex position to add
   * @returns The index of the added vertex
   */
  addVertex(vertex: Vector3): number {
    this._verticies.push(vertex);
    return this._verticies.length - 1;
  }

  /**
   * Adds a new UV coordinate to the mesh
   * @param uv - The UV coordinate to add
   */
  addUV(uv: Vector2) {
    this._uvs.push(uv);
  }

  /**
   * Adds a new normal vector to the mesh
   * @param normal - The normal vector to add
   */
  addNormal(normal: Vector2) {
    this._normals.push(normal);
  }

  /**
   * Binds the mesh data to WebGL buffers
   * @returns true if binding was successful
   */
  bind(): boolean {
    const gl = ServiceLocator.get<Canvas>('canvas').gl;

    // Create and bind VAO
    this._vao = gl.createVertexArray();
    gl.bindVertexArray(this._vao);

    // Create and bind vertex buffer
    this._vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    const vertexData = this._verticies.flatMap((v) => [v.x, v.y, v.z]);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexData),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    // Create and bind UV buffer
    if (this._uvs.length > 0) {
      this._uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
      const uvData = this._uvs.flatMap((uv) => [uv.x, uv.y]);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    }

    // Create and bind normal buffer
    if (this._normals.length > 0) {
      this._normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
      const normalData = this._normals.flatMap((n) => [n.x, n.y]);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normalData),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(2);
      gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
    }

    // Create and bind index buffer
    this._indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this._triangles),
      gl.STATIC_DRAW
    );

    // Unbind VAO
    gl.bindVertexArray(null);

    return true;
  }
}

export default Mesh;
