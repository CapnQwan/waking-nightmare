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
  // TODO: adjust these values to be input params
  float thickness = 0.5; // Thickness of the SDF font (smaller values for thicker text)
  float smoothness = 0.1; // Smoothness of the SDF edges (smaller for sharper edges)
  float alpha = sdfEdge(distance, thickness, smoothness);
  fragColor = vec4(1.0, 1.0, 1.0, alpha); // White text, alpha from SDF
}