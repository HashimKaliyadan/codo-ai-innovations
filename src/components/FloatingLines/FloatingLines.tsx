"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
  Vector2,
  Clock,
  NoToneMapping
} from 'three';
import { vertexShader, fragmentShader } from './shaders';

// --- Quality Presets & Device Detection ---
const QUALITY_PRESETS = {
  low: {
    lineCount: 3,
    parallax: false,
    interactive: false,
    dpr: 1.0,
    bendRadius: 3,
  },
  medium: {
    lineCount: 5,
    parallax: true,
    interactive: false,
    dpr: 1.25,
    bendRadius: 5,
  },
  high: {
    lineCount: 8,
    parallax: true,
    interactive: true,
    dpr: 1.5,
    bendRadius: 8,
  },
};

const getQualityTier = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'high';
  const width = window.innerWidth;
  const isLowEnd = /budget|low-end|android [4-9]/i.test(navigator.userAgent);

  if (isLowEnd || width < 480) return 'low';
  if (width < 1024) return 'medium';
  return 'high';
};

const colorCache = new Map<string, Vector3>();
function hexToVec3(hex: string): Vector3 {
  const trimmed = hex.trim();
  if (colorCache.has(trimmed)) {
    return colorCache.get(trimmed)!.clone();
  }
  
  let value = trimmed;
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
  const vec = new Vector3(r / 255, g / 255, b / 255);
  colorCache.set(trimmed, vec);
  return vec;
}

const MAX_GRADIENT_STOPS = 8;

type WavePosition = { x: number; y: number; rotate: number; };

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
};

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
  backgroundColor = '#0A0A0B'
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [qualityTier, setQualityTier] = useState<'low' | 'medium' | 'high'>('high');

  useEffect(() => {
    setMounted(true);
    setQualityTier(getQualityTier());
  }, []);

  const activePreset = QUALITY_PRESETS[qualityTier];

  const resolvedLineCount = lineCount ?? activePreset.lineCount;
  const resolvedInteractive = interactive && activePreset.interactive;
  const resolvedParallax = parallax && activePreset.parallax;
  const resolvedDpr = activePreset.dpr;
  const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef<number>(0);
  const currentInfluenceRef = useRef<number>(0);
  const targetParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const currentParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const targetBgColorRef = useRef<Vector3>(hexToVec3(backgroundColor));
  const currentBgColorRef = useRef<Vector3>(hexToVec3(backgroundColor));

  const rendererRef = useRef<WebGLRenderer | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniformsRef = useRef<any>(null);
  const clockRef = useRef<Clock>(new Clock());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const newColor = hexToVec3(backgroundColor);
    targetBgColorRef.current.copy(newColor);
  }, [backgroundColor]);

  const waveData = useMemo(() => {
    const getCount = (type: 'top' | 'middle' | 'bottom') => {
      if (typeof resolvedLineCount === 'number') return resolvedLineCount;
      const index = enabledWaves.indexOf(type);
      return index !== -1 ? (resolvedLineCount[index] ?? 6) : 0;
    };
    const getDist = (type: 'top' | 'middle' | 'bottom') => {
      if (typeof lineDistance === 'number') return lineDistance;
      const index = enabledWaves.indexOf(type);
      return index !== -1 ? (lineDistance[index] ?? 5) : 5;
    };

    return {
      topCount: enabledWaves.includes('top') ? getCount('top') : 0,
      midCount: enabledWaves.includes('middle') ? getCount('middle') : 0,
      botCount: enabledWaves.includes('bottom') ? getCount('bottom') : 0,
      topDist: (enabledWaves.includes('top') ? getDist('top') : 0.1) * 0.01,
      midDist: (enabledWaves.includes('middle') ? getDist('middle') : 0.1) * 0.01,
      botDist: (enabledWaves.includes('bottom') ? getDist('bottom') : 0.1) * 0.01,
    };
  }, [resolvedLineCount, lineDistance, enabledWaves]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ 
      antialias: true,
      alpha: false,
      precision: 'highp',
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    });
    
    renderer.setPixelRatio(resolvedDpr);
    renderer.outputColorSpace = 'srgb';
    renderer.toneMapping = NoToneMapping;
    
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      iMouse: { value: new Vector2(-1000, -1000) },
      bendInfluence: { value: 0 },
      parallaxOffset: { value: new Vector2(0, 0) },
      bgColor: { value: currentBgColorRef.current.clone() },
      
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },
      topLineCount: { value: waveData.topCount },
      middleLineCount: { value: waveData.midCount },
      bottomLineCount: { value: waveData.botCount },
      topLineDistance: { value: waveData.topDist },
      middleLineDistance: { value: waveData.midDist },
      bottomLineDistance: { value: waveData.botDist },
      topWavePosition: { value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4) },
      middleWavePosition: { value: new Vector3(middleWavePosition?.x ?? 5.0, middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2) },
      bottomWavePosition: { value: new Vector3(bottomWavePosition?.x ?? 2.0, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4) },
      interactive: { value: resolvedInteractive },
      bendRadius: { value: bendRadius ?? activePreset.bendRadius },
      bendStrength: { value: bendStrength },
      parallax: { value: resolvedParallax },
      parallaxStrength: { value: parallaxStrength },
      lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
    };
    uniformsRef.current = uniforms;

    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        uniforms.lineGradient.value[i].copy(color);
      });
    }

    const material = new ShaderMaterial({ 
      uniforms, 
      vertexShader, 
      fragmentShader 
    });
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const updateSize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const el = containerRef.current;
      const width = el.clientWidth || 1;
      const height = el.clientHeight || 1;
      rendererRef.current.setSize(width, height, false);
      uniforms.iResolution.value.set(rendererRef.current.domElement.width, rendererRef.current.domElement.height, 1);
    };

    let resizeTimeout: NodeJS.Timeout;
    const setSize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 150);
    };

    updateSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(containerRef.current);

    const handlePointerMove = (event: PointerEvent) => {
      if (!rendererRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = rendererRef.current.getPixelRatio();
      
      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;

      if (parallax) {
        const offsetX = (x - rect.width / 2) / rect.width;
        const offsetY = -(y - rect.height / 2) / rect.height;
        targetParallaxRef.current.set(offsetX * parallaxStrength, offsetY * parallaxStrength);
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    if (resolvedInteractive) {
      renderer.domElement.addEventListener('pointermove', handlePointerMove);
      renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    }

    const renderLoop = () => {
      if (rendererRef.current && scene && camera) {
        const dt = clockRef.current.getElapsedTime();
        uniforms.iTime.value = dt;

        if (resolvedInteractive) {
          currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
          uniforms.iMouse.value.copy(currentMouseRef.current);
          currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
          uniforms.bendInfluence.value = currentInfluenceRef.current;
        }

        if (resolvedParallax) {
          currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
          uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
        }

        currentBgColorRef.current.lerp(targetBgColorRef.current, 0.07);
        uniforms.bgColor.value.copy(currentBgColorRef.current);

        rendererRef.current.render(scene, camera);
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      ro.disconnect();
      
      if (resolvedInteractive && renderer.domElement) {
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
        renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
      uniformsRef.current = null;
    };
  }, [mounted, waveData, resolvedInteractive, resolvedParallax, resolvedDpr, activePreset.bendRadius, animationSpeed, bendRadius, bendStrength, bottomWavePosition?.rotate, bottomWavePosition?.x, bottomWavePosition?.y, enabledWaves, linesGradient, middleWavePosition?.rotate, middleWavePosition?.x, middleWavePosition?.y, mouseDamping, parallaxStrength, topWavePosition?.rotate, topWavePosition?.x, topWavePosition?.y]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ mixBlendMode } as React.CSSProperties}
    />
  );
}
