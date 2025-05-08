#version 300 es
precision mediump float;

in vec3 a_position;
uniform vec2 u_resolution;
uniform mat4 u_mvp;

void main() {
    vec4 pos = u_mvp * vec4(a_position, 1.0);
    vec2 zeroToOne = pos.xy / vec2(u_resolution);
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), pos.z, pos.w);
}