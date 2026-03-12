"use client";

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
  Vector2,
  Clock
} from 'three';

// ============================================================================
// SHADER DEFINITIONS - Extracted for reusability and memoization
// ============================================================================

const VERTEX_SHADER = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;
uniform vec3 bgColor;

const vec3 BLACK = vec3(0.0);
const vec3 GREEN = vec3(0.0, 135.0, 100.0) / 255.0;
const vec3 BLUE  = vec3(0.0, 32.0, 63.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = bgColor;
  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;
  col += mix(BLUE, bgColor, smoothstep(0.0, 1.0, abs(m))) * 0.5;
  col += mix(GREEN, bgColor, smoothstep(0.0, 1.0, abs(m - 0.8))) * 0.5;
  return col;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) return baseColor;
  vec3 gradientColor;
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);
    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    gradientColor = mix(c1, c2, f);
  }
  return gradientColor * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = bgColor;
  vec3 b = lineGradientCount > 0 ? bgColor : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi, baseUv, mouseUv, interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

// ============================================================================
// COLOR UTILITY - With memoization
// ============================================================================

const COLOR_CACHE = new Map<string, Vector3>();

function hexToVec3(hex: string): Vector3 {
  if (COLOR_CACHE.has(hex)) {
    return COLOR_CACHE.get(hex)!.clone();
  }

  let value = hex.trim();
  if (value.startsWith('#')) value = value.slice(1);
  let r = 255, g = 255, b = 255;
  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }

  const color = new Vector3(r / 255, g / 255, b / 255);
  COLOR_CACHE.set(hex, color);
  return color.clone();
}

// ============================================================================
// TYPES
// ============================================================================

type WavePosition = { x: number; y: number; rotate: number };

type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: Array<'top' | 'middle' | 'bottom'>;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  backgroundColor?: string;
  opacity?: number;
};

// ============================================================================
// MAIN COMPONENT - Optimized
// ============================================================================

export default function FloatingLines({
  linesGradient,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'screen',
  backgroundColor = '#0A0A0B',
  opacity = 1
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const uniformsRef = useRef<Record<string, any> | null>(null);
  const rafRef = useRef<number>(0);

  // Input smoothing refs
  const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef<number>(0);
  const currentInfluenceRef = useRef<number>(0);
  const targetParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const currentParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const targetBgColorRef = useRef<Vector3>(hexToVec3(backgroundColor));
  const currentBgColorRef = useRef<Vector3>(hexToVec3(backgroundColor));

  // Throttle pointer updates to 60fps max
  const pointerUpdateTimeRef = useRef<number>(0);
  const POINTER_UPDATE_THROTTLE = 16;

  // Debounce resize
  let resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate static line configuration once
  const getLineCount = useCallback((waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineCount === 'number') return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    const index = enabledWaves.indexOf(waveType);
    return lineCount[index] ?? 6;
  }, [lineCount, enabledWaves]);

  const getLineDistance = useCallback((waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineDistance === 'number') return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    const index = enabledWaves.indexOf(waveType);
    return lineDistance[index] ?? 0.1;
  }, [lineDistance, enabledWaves]);

  const topLineCount = useMemo(() => enabledWaves.includes('top') ? getLineCount('top') : 0, [enabledWaves, getLineCount]);
  const middleLineCount = useMemo(() => enabledWaves.includes('middle') ? getLineCount('middle') : 0, [enabledWaves, getLineCount]);
  const bottomLineCount = useMemo(() => enabledWaves.includes('bottom') ? getLineCount('bottom') : 0, [enabledWaves, getLineCount]);

  const topLineDistance = useMemo(() => enabledWaves.includes('top') ? getLineDistance('top') * 0.01 : 0.01, [enabledWaves, getLineDistance]);
  const middleLineDistance = useMemo(() => enabledWaves.includes('middle') ? getLineDistance('middle') * 0.01 : 0.01, [enabledWaves, getLineDistance]);
  const bottomLineDistance = useMemo(() => enabledWaves.includes('bottom') ? getLineDistance('bottom') * 0.01 : 0.01, [enabledWaves, getLineDistance]);

  // Update background color target
  useEffect(() => {
    const newColor = hexToVec3(backgroundColor);
    targetBgColorRef.current.set(newColor.x, newColor.y, newColor.z);
  }, [backgroundColor]);

  // =========================================================================
  // SCENE INITIALIZATION - Happens once, never recreated
  // =========================================================================

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    // Optimized renderer settings
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      precision: 'highp',
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
      logarithmicDepthBuffer: false,
      preserveDrawingBuffer: false,
    });

    rendererRef.current = renderer;

    // Optimize pixel ratio
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    containerRef.current.appendChild(renderer.domElement);

    // Static uniforms (set once, never change)
    const staticUniforms = {
      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },
      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },
      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },
      topWavePosition: { value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4) },
      middleWavePosition: { value: new Vector3(middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2) },
      bottomWavePosition: { value: new Vector3(bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
    };

    // Dynamic uniforms (update every frame)
    const dynamicUniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      iMouse: { value: new Vector2(-1000, -1000) },
      bendInfluence: { value: 0 },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
      bgColor: { value: hexToVec3(backgroundColor) }
    };

    // Merge uniforms
    const uniforms = { ...staticUniforms, ...dynamicUniforms };
    uniformsRef.current = uniforms;

    // Setup gradient if provided
    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(color.x, color.y, color.z);
      });
    }

    // Create material with optimized settings
    const material = new ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      side: 1, // FrontSide only
      glslVersion: '300es',
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    // Handle size changes with debounce
    const setSize = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const width = el.clientWidth || 1;
      const height = el.clientHeight || 1;
      renderer.setSize(width, height, false);
      const canvasWidth = renderer.domElement.width;
      const canvasHeight = renderer.domElement.height;
      uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1);
    };

    const debouncedSetSize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(setSize, 150);
    };

    setSize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(debouncedSetSize) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    // Pointer handlers with throttling
    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - pointerUpdateTimeRef.current < POINTER_UPDATE_THROTTLE) {
        return;
      }
      pointerUpdateTimeRef.current = now;

      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = renderer.getPixelRatio();
      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;

      if (parallax) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / rect.width;
        const offsetY = -(y - centerY) / rect.height;
        targetParallaxRef.current.set(offsetX * parallaxStrength, offsetY * parallaxStrength);
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    if (interactive) {
      renderer.domElement.addEventListener('pointermove', handlePointerMove);
      renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    }

    let isRenderingEnabled = opacity > 0;

    // Optimized render loop
    const renderLoop = () => {
      const currentOpacity = (containerRef.current as any)?.renderOpacity?.current ?? opacity;

      // Only render if visible
      if (currentOpacity > 0.001) {
        isRenderingEnabled = true;

        const uniforms = uniformsRef.current!;
        uniforms.iTime.value = clock.getElapsedTime();

        // Update only dynamic values
        if (interactive && uniforms.bendInfluence.value > 0.001) {
          currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
          uniforms.iMouse.value.copy(currentMouseRef.current);

          currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
          uniforms.bendInfluence.value = currentInfluenceRef.current;
        }

        if (parallax && currentParallaxRef.current.length() > 0.001) {
          currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
          uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
        }

        currentBgColorRef.current.lerp(targetBgColorRef.current, 0.07);
        uniforms.bgColor.value.copy(currentBgColorRef.current);

        renderer.render(scene, camera);
      } else if (isRenderingEnabled) {
        // One last render at opacity 0 for smooth fade
        isRenderingEnabled = false;
        renderer.render(scene, camera);
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // =====================================================================
    // CLEANUP
    // =====================================================================

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

      if (interactive) {
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
        renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      }

      if (ro) ro.disconnect();

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement?.contains(renderer.domElement)) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }

      rendererRef.current = null;
      uniformsRef.current = null;
    };
  }, []); // Empty dependency array - scene setup happens once

  // =========================================================================
  // FINE-GRAINED UPDATES - Only recreate when properties actually change
  // =========================================================================

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.animationSpeed.value = animationSpeed;
    }
  }, [animationSpeed]);

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.bendRadius.value = bendRadius;
    }
  }, [bendRadius]);

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.bendStrength.value = bendStrength;
    }
  }, [bendStrength]);

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.parallaxStrength.value = parallaxStrength;
    }
  }, [parallaxStrength]);

  useEffect(() => {
    if (containerRef.current && (containerRef.current as any).renderOpacity) {
      (containerRef.current as any).renderOpacity.current = opacity;
    }
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ mixBlendMode }}
    />
  );
}
