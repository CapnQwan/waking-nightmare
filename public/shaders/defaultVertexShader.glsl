export const VERTEX_SHADER_SOURCE = `
    attribute vec2 a_position;
    uniform mediump vec2 u_resolution;
    void main() {
        // Convert from pixels to 0->1, then to -1->1 (clip space)
        vec2 zeroToOne = a_position / u_resolution;
        vec2 clipSpace = zeroToOne * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;
