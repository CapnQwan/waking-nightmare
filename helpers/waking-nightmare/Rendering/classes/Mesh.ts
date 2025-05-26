import { Vector2 } from '../../utils/math/Vectors/Vector2';
import { Vector3 } from '../../utils/math/Vectors/Vector3';
import { gl } from '../Canvas';

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
export class Mesh {
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

  /** buffers */

  /** Vertex Array Object stores the state of vertex attribute bindings */
  private _vao: WebGLVertexArrayObject | null = null;
  /** Buffer containing vertex position data (x, y, z coordinates) */
  private _vbo: WebGLBuffer | null = null;
  /** Buffer containing texture coordinate data (u, v coordinates) */
  private _uvbo: WebGLBuffer | null = null;
  /** Buffer containing vertex normal data for lighting calculations */
  private _nbo: WebGLBuffer | null = null;
  /** Buffer containing triangle indices that define mesh topology */
  private _ibo: WebGLBuffer | null = null;

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
    this.bind();
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

    this._vertices = newVertices;
    this.bind();
  }

  /**
   * Gets the array of UV coordinates
   */
  get uvs(): Float32Array {
    return this._uvs;
  }

  /**
   * Sets the array of UV coordinates
   */
  set uvs(uvs: Float32Array) {
    this._uvs = uvs;
    this.bind();
  }

  /**
   * Gets the array of normals vectors
   */
  get normals(): Float32Array {
    return this._normals;
  }

  /**
   * Sets the array of normals coordinates
   */
  set normals(normals: Float32Array) {
    console.log('Setting normals:', normals);
    this._normals = normals;
    this.bind();
  }

  get vbo(): WebGLBuffer | null {
    return this._vbo;
  }

  get uvbo(): WebGLBuffer | null {
    return this._uvbo;
  }

  get nbo(): WebGLBuffer | null {
    return this._nbo;
  }

  get ibo(): WebGLBuffer | null {
    return this._ibo;
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
    this.bind();
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
   * Recalculates vertex normals for the mesh based on triangle faces
   */
  recalculateNormals(): void {
    // Initialize normals array with zeros
    const vertexCount = this._vertices.length / 3;
    this._normals = new Float32Array(vertexCount * 3);

    // Temporary array to store count of faces per vertex for averaging
    const faceCounts = new Uint16Array(vertexCount);

    // Calculate face normals for each triangle
    for (let i = 0; i < this._triangles.length; i += 3) {
      // Get triangle vertices indices
      const v1Idx = this._triangles[i] * 3;
      const v2Idx = this._triangles[i + 1] * 3;
      const v3Idx = this._triangles[i + 2] * 3;

      // Get vertex positions
      const v1 = new Vector3(
        this._vertices[v1Idx],
        this._vertices[v1Idx + 1],
        this._vertices[v1Idx + 2]
      );
      const v2 = new Vector3(
        this._vertices[v2Idx],
        this._vertices[v2Idx + 1],
        this._vertices[v2Idx + 2]
      );
      const v3 = new Vector3(
        this._vertices[v3Idx],
        this._vertices[v3Idx + 1],
        this._vertices[v3Idx + 2]
      );

      // Calculate face normal
      const edge1 = v2.subtract(v1);
      const edge2 = v3.subtract(v1);
      const faceNormal = edge1.cross(edge2).normalize();

      // Add face normal to each vertex's normal
      const idx1 = this._triangles[i] * 3;
      const idx2 = this._triangles[i + 1] * 3;
      const idx3 = this._triangles[i + 2] * 3;

      // Accumulate normals
      this._normals[idx1] += faceNormal.x;
      this._normals[idx1 + 1] += faceNormal.y;
      this._normals[idx1 + 2] += faceNormal.z;

      this._normals[idx2] += faceNormal.x;
      this._normals[idx2 + 1] += faceNormal.y;
      this._normals[idx2 + 2] += faceNormal.z;

      this._normals[idx3] += faceNormal.x;
      this._normals[idx3 + 1] += faceNormal.y;
      this._normals[idx3 + 2] += faceNormal.z;

      // Increment face counts for averaging
      faceCounts[this._triangles[i]]++;
      faceCounts[this._triangles[i + 1]]++;
      faceCounts[this._triangles[i + 2]]++;
    }

    // Average and normalize the accumulated normals
    for (let i = 0; i < vertexCount; i++) {
      const idx = i * 3;
      if (faceCounts[i] > 0) {
        const normal = new Vector3(
          this._normals[idx] / faceCounts[i],
          this._normals[idx + 1] / faceCounts[i],
          this._normals[idx + 2] / faceCounts[i]
        ).normalize();

        this._normals[idx] = normal.x;
        this._normals[idx + 1] = normal.y;
        this._normals[idx + 2] = normal.z;
      }
    }
  }

  /**
   * Binds the mesh data to WebGL buffers
   * @returns true if binding was successful
   */
  bind(): boolean {
    if (this.triangles.length === 0 || this.verticies.length === 0) {
      return false;
    }

    console.log('Binding mesh:', this.name);

    this._vao = gl.createVertexArray();
    gl.bindVertexArray(this._vao);

    this.bindVertices();
    this.bindNormals();
    this.bindUVs();
    this.bindTriangles();

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return true;
  }

  private bindBuffer(
    bufferData: Float32Array,
    bufferIndex: number,
    bufferSize: number
  ): WebGLBuffer {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(bufferIndex);
    gl.vertexAttribPointer(bufferIndex, bufferSize, gl.FLOAT, false, 0, 0);
    return buffer;
  }

  private bindVertices(): void {
    if (this._vertices.length > 0) {
      this._vbo = this.bindBuffer(this._vertices, 0, 3);
    }
  }

  public bindNormals(): void {
    if (this._normals.length > 0) {
      console.log('Binding normals:', this._normals);
      this._nbo = this.bindBuffer(this._normals, 1, 3);
    }
  }

  private bindUVs(): void {
    if (this._uvs.length > 0) {
      this._uvbo = this.bindBuffer(this._uvs, 2, 2);
    }
  }

  private bindTriangles(): void {
    if (this._triangles.length > 0) {
      this._ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._triangles, gl.STATIC_DRAW);
    }
  }

  /** Makes a draw call to the gpu */
  draw(): void {
    gl.bindVertexArray(this._vao);
    gl.drawElements(gl.TRIANGLES, this._triangles.length, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
  }

  /** Cleans up WebGL resources used by the mesh */
  dispose(): void {
    if (this._vao) {
      gl.deleteVertexArray(this._vao);
      this._vao = null;
    }

    if (this._vbo) {
      gl.deleteBuffer(this._vbo);
      this._vbo = null;
    }

    if (this._uvbo) {
      gl.deleteBuffer(this._uvbo);
      this._uvbo = null;
    }

    if (this._nbo) {
      gl.deleteBuffer(this._nbo);
      this._nbo = null;
    }

    if (this._ibo) {
      gl.deleteBuffer(this._ibo);
      this._ibo = null;
    }
  }
}
