export const oceanVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vWaveCrest;

  vec3 gerstnerWave(vec2 pos, float steepness, float wavelength, vec2 dir, float speed, inout vec3 tangent, inout vec3 binormal) {
    float k = 6.2831853 / wavelength;
    float c = sqrt(9.8 / k) * speed;
    vec2 d = normalize(dir);
    float f = k * (dot(d, pos) - c * uTime);
    float a = steepness / k;

    tangent += vec3(
      -d.x * d.x * (steepness * sin(f)),
      d.x * (steepness * cos(f)),
      -d.x * d.y * (steepness * sin(f))
    );
    binormal += vec3(
      -d.x * d.y * (steepness * sin(f)),
      d.y * (steepness * cos(f)),
      -d.y * d.y * (steepness * sin(f))
    );

    return vec3(
      d.x * (a * cos(f)),
      a * sin(f),
      d.y * (a * cos(f))
    );
  }

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec3 gridPoint = worldPos.xyz;
    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 p = gridPoint;

    p += gerstnerWave(gridPoint.xz, 0.24, 9.0, vec2(0.15, 1.0), 1.1, tangent, binormal);
    p += gerstnerWave(gridPoint.xz, 0.16, 4.5, vec2(-0.35, 0.9), 1.3, tangent, binormal);
    p += gerstnerWave(gridPoint.xz, 0.09, 2.1, vec2(0.5, 0.85), 1.5, tangent, binormal);

    vNormal = normalize(cross(binormal, tangent));
    vWorldPosition = p;
    vWaveCrest = clamp((p.y - gridPoint.y) * 1.65, 0.0, 1.0);

    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  }
`;

export const oceanFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uOceanColor;
  uniform vec3 uCyanGlow;
  uniform vec3 uSoftBlue;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vWaveCrest;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.5);
    float shoreZone = smoothstep(-2.0, 5.5, vWorldPosition.z) * (1.0 - smoothstep(5.5, 8.5, vWorldPosition.z));
    float rippleNoise = sin(vWorldPosition.x * 3.5 + uTime * 3.0) * cos(vWorldPosition.z * 4.2 - uTime * 2.5);
    float bioIntensity = clamp(pow(vWaveCrest, 1.8) * (0.45 + shoreZone * 1.4) + rippleNoise * 0.12 * shoreZone, 0.0, 1.4);

    vec3 baseWater = mix(uDeepColor, uOceanColor, fresnel * 0.65);
    vec3 glowColor = mix(uCyanGlow, uSoftBlue, clamp(bioIntensity - 0.5, 0.0, 1.0));

    vec3 finalColor = baseWater + glowColor * bioIntensity * 1.35;
    gl_FragColor = vec4(finalColor, 0.96);
  }
`;
