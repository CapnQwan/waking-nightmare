#version 300 es
precision mediump float;

in vec3 aPosition;
in vec3 aNormal;

out vec3 vFragPos; 
out vec3 vNormal;
out vec3 vPosition;

uniform mat3 uNormalMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
  gl_Position = uProjectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
  vFragPos = vec3(uModelMatrix * vec4(aPosition, 1.0));
  vNormal = aNormal * uNormalMatrix;
  vPosition = (modelViewMatrix * vec4(aPosition, 1.0)).xyz;
}