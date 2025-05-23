#version 300 es
precision mediump float;

// Declare an output variable for the fragment color
in vec3 vNormal;
in vec3 vPosition;

uniform vec3 uLightPosition;
uniform vec3 uLightAmbient;
uniform vec3 uLightDiffuse;
uniform vec3 uLightSpecular;

uniform vec3 uMaterialAmbient;
uniform vec3 uMaterialDiffuse;
uniform vec3 uMaterialSpecular;
uniform float uMaterialShininess;

uniform vec3 uViewPosition;

out vec4 fragColor;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(uLightPosition - vPosition);
  vec3 viewDir = normalize(uViewPosition - vPosition);
  vec3 reflectDir = reflect(-lightDir, normal);

  // Ambient
  vec3 ambient = uLightAmbient * uMaterialAmbient;

  // Diffuse
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 diffuse = uLightDiffuse * uMaterialDiffuse * diff;

  // Specular
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterialShininess);
  vec3 specular = uLightSpecular * uMaterialSpecular * spec;

  // Combine components
  vec3 color = ambient + diffuse + specular;
  fragColor = vec4(color, 1.0);
}