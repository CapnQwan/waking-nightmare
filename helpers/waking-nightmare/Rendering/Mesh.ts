import Vector2 from "../utils/math/Vectors/Vector2";
import Vector3 from "../utils/math/Vectors/Vector3";

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
}

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
        normals = [] 
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
}

export default Mesh;