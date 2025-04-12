interface shaderConstructor {
    vertexShader?: string;
    fragmentShader?: string;
    program?: WebGLProgram;
}

class Shader {
    vertexShader: string;
    fragmentShader: string;
    program: WebGLProgram;

    constructor({vertexShader, fragmentShader, program}: shaderConstructor) {
     this.vertexShader = vertexShader;
     this.fragmentShader = fragmentShader;   
    }
}