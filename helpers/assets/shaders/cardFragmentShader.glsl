#version 300 es
precision highp float;

in vec2 vUV;
uniform sampler2D uTexture;
uniform vec2 uTextureScale;
uniform vec2 uTextureOffset;
uniform vec2 uResolution;
uniform vec2 uRect;

out vec4 fragColor;

void main() {
    // Apply scale and offset to UV coordinates for atlas sampling
    vec2 atlasUV = vUV * uTextureScale + uTextureOffset;
    vec4 textureColor = texture(uTexture, atlasUV);
    vec4 baseColor = vec4(0.92, 0.92, 0.92, 1.0);
    
    float t = smoothstep(0.0, 1.0, textureColor.a);

    fragColor = mix(baseColor, textureColor, t);
}