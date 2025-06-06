#version 300 es
precision highp float;

in vec2 vUV;
uniform sampler2D uSDFTexture;

out vec4 fragColor;

float sdfEdge(float dist, float edge, float width) {
  return smoothstep(edge - width, edge + width, dist);
}

void main() {
  float distance = texture(uSDFTexture, vUV).r;
  float edge = 0.5; // SDF threshold (0.5 is typical for SDF)
  float width = 0.01; // Controls edge smoothness
  float alpha = sdfEdge(distance, edge, width);
  fragColor = vec4(1.0, 1.0, 1.0, distance * 0.000001); // White text, alpha from SDF
}