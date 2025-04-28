import ServiceLocator from '../../ServiceLocator/ServiceLocator';
import Vector2 from '../../utils/math/Vectors/Vector2';
import Vector3 from '../../utils/math/Vectors/Vector3';
import Canvas from '../Canvas';

/**
 * Configuration object for creating a new Mesh instance
 */
type TMeshConstructor = {
  /** Name of the mesh */
  name?: string;
  /** Array of triangle indices (3 indices per triangle) */
  triangles?: Uint16Array;
  /** Array of vertex positions in 3D space */
  verticies?: Float32Array;
  /** Array of UV coordinates for texture mapping */
  uvs?: Float32Array;
  /** Array of normal vectors for lighting calculations */
  normals?: Float32Array;
};

/**
 * Mesh class represents a 3D mesh with vertices, triangles, UVs, and normals.
 * It's used to define the geometry of 3D objects in the scene.
 */
class Mesh {
  /** Name of the mesh */
  public name: string;
  /** Array of triangle indices (3 indices per triangle) */
  private _triangles: Uint16Array;
  /** Array of vertex positions in 3D space */
  private _vertices: Float32Array;
  /** Array of UV coordinates for texture mapping */
  private _uvs: Float32Array;
  /** Array of normal vectors for lighting calculations */
  private _normals: Float32Array;
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
  get triangles(): Uint16Array {
    return this._triangles;
  }

  /**
   * Sets the array of triangles from either a number array or a Uint16Array
   */
  set triangles(triangles: number[] | Uint16Array) {
    this._triangles = Uint16Array.from(triangles);
  }

  /**
   * Gets the array of vertex positions
   */
  get verticies(): Float32Array {
    return this._vertices;
  }

  /**
   * Sets the array of vertex positions
   */
  set verticies(vertices: Vector2[] | Vector3[] | Float32Array) {
    if (vertices instanceof Float32Array) {
      this._vertices = vertices;
      return;
    }

    const newVertices = new Float32Array(vertices.length * 3);

    vertices.forEach((vertex, index) => {
      const offset = index * 3;

      newVertices[offset] = vertex.x;
      newVertices[offset + 1] = vertex.y;
      newVertices[offset + 2] = vertex instanceof Vector3 ? vertex.z : 0;
    });

    this._vertices;
  }

  /**
   * Gets the array of UV coordinates
   */
  get uvs(): Float32Array {
    return this._uvs;
  }

  /**
   * Gets the array of normal vectors
   */
  get normals(): Float32Array {
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
    name = '',
    triangles = Uint16Array.from([]),
    verticies = Float32Array.from([]),
    uvs = Float32Array.from([]),
    normals = Float32Array.from([]),
  }: TMeshConstructor = {}) {
    this.name = name;
    this._triangles = triangles;
    this._vertices = verticies;
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
    // Validate indices
    if (v1 > 65535 || v2 > 65535 || v3 > 65535 || v1 < 0 || v2 < 0 || v3 < 0) {
      throw new Error('Triangle indices must be between 0 and 65535');
    }
    const newTriangles = new Uint16Array(this._triangles.length + 3);
    newTriangles.set(this._triangles);
    newTriangles.set([v1, v2, v3], this._triangles.length);
    this._triangles = newTriangles;
  }

  /**
   * Adds a new vertex to the mesh
   * @param vertex - The vertex position to add
   * @returns The index of the added vertex
   */
  addVertex(vertex: Vector3): number {
    const index = this._vertices.length / 3;
    const newVertices = new Float32Array(this._vertices.length + 3);
    newVertices.set(this._vertices);
    newVertices.set([vertex.x, vertex.y, vertex.z], this._vertices.length);
    this._vertices = newVertices;
    return index;
  }

  /**
   * Adds a new UV coordinate to the mesh
   * @param uv - The UV coordinate to add
   */
  addUV(uv: Vector2) {
    const newUVs = new Float32Array(this._uvs.length + 2);
    newUVs.set(this._uvs);
    newUVs.set([uv.x, uv.y], this._uvs.length);
    this._uvs = newUVs;
  }

  /**
   * Adds a new normal vector to the mesh
   * @param normal - The normal vector to add
   */
  addNormal(normal: Vector3) {
    // Note: Normals should be Vector3, not Vector2
    const newNormals = new Float32Array(this._normals.length + 3);
    newNormals.set(this._normals);
    newNormals.set([normal.x, normal.y, normal.z], this._normals.length);
    this._normals = newNormals;
  }

  /**
   * Binds the mesh data to WebGL buffers
   * @returns true if binding was successful
   */
  bind(): boolean {
    const gl = ServiceLocator.get<Canvas>('canvas').gl;

    this._vao = gl.createVertexArray();
    gl.bindVertexArray(this._vao);

    // Vertex buffer
    this._vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    // UV buffer
    if (this._uvs.length > 0) {
      this._uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this._uvs, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    }

    // Normal buffer
    if (this._normals.length > 0) {
      this._normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this._normals, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(2);
      gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0); // Normals are 3D
    }

    // Index buffer
    this._indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._triangles, gl.STATIC_DRAW);

    gl.bindVertexArray(null);
    return true;
  }
}

export default Mesh;
