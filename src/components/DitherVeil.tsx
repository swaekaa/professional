import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture, RenderTarget } from 'ogl';

import './DitherVeil.css';

const DEFAULT_SRC = 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1400&auto=format&fit=crop';

const ORDERED: Record<string, number> = { bayer: 0, noise: 1, lines: 2 };

const KERNELS: Record<string, [number, number, number][]> = {
  atkinson: [
    [1, 0, 1 / 8],
    [2, 0, 1 / 8],
    [-1, 1, 1 / 8],
    [0, 1, 1 / 8],
    [1, 1, 1 / 8],
    [0, 2, 1 / 8]
  ],
  floyd: [
    [1, 0, 7 / 16],
    [-1, 1, 3 / 16],
    [0, 1, 5 / 16],
    [1, 1, 1 / 16]
  ]
};

const MASK_SCALE = 0.5;
const MAX_BURSTS = 4;
const BURST_SECONDS = 1.2;
const HOLD = 1.6;
const INTRO_MS = 1100;

const hexToRgb = (hex: string): [number, number, number] => {
  let h = String(hex || '').replace('#', '');
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h.slice(0, 6), 16);
  return Number.isNaN(n) ? [0, 0, 0] : [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const fitScale = (w: number, h: number, iw: number, ih: number, contain: boolean): [number, number] => {
  const ratio = (w / h) / (iw / ih);
  if (contain) return ratio > 1 ? [ratio, 1] : [1, 1 / ratio];
  return ratio > 1 ? [1, 1 / ratio] : [ratio, 1];
};

const wanderAt = (t: number, w: number, h: number): [number, number] => [
  w * (0.5 + 0.33 * Math.sin(t * 0.53) + 0.08 * Math.sin(t * 1.31 + 0.6)),
  h * (0.5 + 0.28 * Math.sin(t * 0.71 + 1.1) + 0.07 * Math.cos(t * 1.57))
];

const measureEdge = (context: CanvasRenderingContext2D, image: HTMLImageElement): { matte: number[]; plain: boolean } => {
  const size = 32;
  context.canvas.width = size;
  context.canvas.height = size;
  context.drawImage(image, 0, 0, size, size);
  const data = context.getImageData(0, 0, size, size).data;
  const sum = [0, 0, 0];
  const squares = [0, 0, 0];
  let count = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (x > 0 && y > 0 && x < size - 1 && y < size - 1) continue;
      for (let c = 0; c < 3; c++) {
        const v = data[(y * size + x) * 4 + c] / 255;
        sum[c] += v;
        squares[c] += v * v;
      }
      count++;
    }
  }
  const matte = [sum[0] / count, sum[1] / count, sum[2] / count];
  const spread =
    matte.reduce((total, mean, c) => total + Math.sqrt(Math.max(0, squares[c] / count - mean * mean)), 0) / 3;
  return { matte, plain: spread < 0.06 };
};

let blueNoiseCache: Uint8Array | null = null;

const getBlueNoise = (): Uint8Array => {
  if (blueNoiseCache) return blueNoiseCache;
  const size = 64;
  const n = size * size;
  const wrap = size - 1;
  const taps: number[] = [];
  for (let dy = -6; dy <= 6; dy++) {
    for (let dx = -6; dx <= 6; dx++) taps.push(dx, dy, Math.exp(-(dx * dx + dy * dy) / 4.5));
  }
  const energy = new Float32Array(n);
  const on = new Uint8Array(n);
  const splat = (i: number, sign: number) => {
    const x = i % size;
    const y = (i - x) / size;
    for (let k = 0; k < taps.length; k += 3) {
      energy[((y + taps[k + 1]) & wrap) * size + ((x + taps[k]) & wrap)] += sign * taps[k + 2];
    }
  };
  const find = (state: number, highest: boolean): number => {
    let best = 0;
    let value = highest ? -Infinity : Infinity;
    for (let i = 0; i < n; i++) {
      if (on[i] !== state) continue;
      if (highest ? energy[i] > value : energy[i] < value) {
        value = energy[i];
        best = i;
      }
    }
    return best;
  };
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const initial = Math.round(n * 0.1);
  for (let placed = 0; placed < initial; ) {
    const i = Math.floor(random() * n);
    if (on[i]) continue;
    on[i] = 1;
    splat(i, 1);
    placed++;
  }
  for (let guard = 0; guard < n; guard++) {
    const cluster = find(1, true);
    on[cluster] = 0;
    splat(cluster, -1);
    const gap = find(0, false);
    on[gap] = 1;
    splat(gap, 1);
    if (gap === cluster) break;
  }
  const seedOn = on.slice();
  const seedEnergy = energy.slice();
  const rank = new Uint16Array(n);
  for (let r = initial - 1; r >= 0; r--) {
    const cluster = find(1, true);
    on[cluster] = 0;
    splat(cluster, -1);
    rank[cluster] = r;
  }
  on.set(seedOn);
  energy.set(seedEnergy);
  for (let r = initial; r < n; r++) {
    const gap = find(0, false);
    on[gap] = 1;
    splat(gap, 1);
    rank[gap] = r;
  }
  const data = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    const v = Math.floor((rank[i] / n) * 256);
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  blueNoiseCache = data;
  return data;
};

const diffuse = (
  pixels: Uint8ClampedArray,
  cols: number,
  rows: number,
  kernel: [number, number, number][],
  levels: number,
  rgb: boolean,
  grade: (v: number) => number
): Uint8Array => {
  const channels = rgb ? 3 : 1;
  const values = new Float32Array(cols * rows * channels);
  for (let i = 0; i < cols * rows; i++) {
    const r = pixels[i * 4] / 255;
    const g = pixels[i * 4 + 1] / 255;
    const b = pixels[i * 4 + 2] / 255;
    if (rgb) {
      values[i * 3] = grade(r);
      values[i * 3 + 1] = grade(g);
      values[i * 3 + 2] = grade(b);
    } else {
      values[i] = grade(0.2126 * r + 0.7152 * g + 0.0722 * b);
    }
  }
  const steps = levels - 1;
  const out = new Uint8Array(cols * rows * 4);
  for (let y = 0; y < rows; y++) {
    const dir = y & 1 ? -1 : 1;
    for (let i = 0; i < cols; i++) {
      const x = dir > 0 ? i : cols - 1 - i;
      const p = y * cols + x;
      for (let c = 0; c < channels; c++) {
        const old = values[p * channels + c];
        const q = Math.min(steps, Math.max(0, Math.round(old * steps))) / steps;
        const err = old - q;
        const byte = Math.round(q * 255);
        if (rgb) out[p * 4 + c] = byte;
        else out[p * 4] = out[p * 4 + 1] = out[p * 4 + 2] = byte;
        for (let k = 0; k < kernel.length; k++) {
          const nx = x + kernel[k][0] * dir;
          const ny = y + kernel[k][1];
          if (nx < 0 || nx >= cols || ny >= rows) continue;
          values[(ny * cols + nx) * channels + c] += err * kernel[k][2];
        }
      }
      out[p * 4 + 3] = 255;
    }
  }
  return out;
};

const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const maskFragment = `#version 300 es
precision highp float;

uniform sampler2D tPrev;
uniform vec2 uSize;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uRadius;
uniform float uSoftness;
uniform float uStrength;
uniform float uFade;
uniform float uHold;

in vec2 vUv;
out vec4 fragColor;

float strokeDistance(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float h = clamp(dot(p - a, ab) / max(dot(ab, ab), 0.0001), 0.0, 1.0);
  return length(p - a - ab * h);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float trail = max(texture(tPrev, vUv).r - uFade, 0.0);
  float band = max(uRadius * uSoftness, 1.0) * uHold;
  float d = strokeDistance(p, uFrom, uTo);
  trail = max(trail, clamp((uRadius - d) / band, 0.0, 1.0) * uStrength);
  fragColor = vec4(trail, 0.0, 0.0, 1.0);
}
`;

const viewFragment = `#version 300 es
precision highp float;
precision highp int;

uniform sampler2D tImage;
uniform sampler2D tMask;
uniform sampler2D tNoise;
uniform sampler2D tDiffused;
uniform vec2 uResolution;
uniform vec2 uCover;
uniform float uLod;
uniform float uCell;
uniform int uPattern;
uniform int uPalette;
uniform float uLevels;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uRimColor;
uniform float uRim;
uniform float uContrast;
uniform float uBrightness;
uniform float uReverse;
uniform float uIntro;
uniform float uHold;
uniform vec3 uMatte;
uniform float uKey;
uniform vec2 uSize;
uniform vec4 uBursts[4];
uniform float uBurstWidth;

in vec2 vUv;
out vec4 fragColor;

float bayer(vec2 cell) {
  ivec2 p = ivec2(mod(cell, 8.0));
  int v = p.x ^ p.y;
  int m = ((v & 1) << 5) | ((p.y & 1) << 4) | ((v & 2) << 2) | ((p.y & 2) << 1) | ((v & 4) >> 1) | ((p.y & 4) >> 2);
  return (float(m) + 0.5) / 64.0;
}

float blueNoise(vec2 cell) {
  return (texelFetch(tNoise, ivec2(mod(cell, 64.0)), 0).r * 255.0 + 0.5) / 256.0;
}

float engraving(vec2 cell) {
  float period = 6.0;
  float f = (mod(cell.x + cell.y, period) + 0.5) / period;
  return clamp(abs(f * 2.0 - 1.0) + (bayer(cell) - 0.5) * (2.0 / period), 0.0, 1.0);
}

vec2 imageUv(vec2 uv) {
  return (uv - 0.5) * uCover + 0.5;
}

float orderedThreshold(vec2 px) {
  if (uPattern == 0) return bayer(px);
  if (uPattern == 1) return blueNoise(px);
  return engraving(px);
}

float grade(float v) {
  float b = uBrightness * 0.5;
  float c = uContrast;
  return clamp((v + b - 0.5) * c + 0.5, 0.0, 1.0);
}

vec3 grade3(vec3 v) {
  return clamp((v + uBrightness * 0.5 - 0.5) * uContrast + 0.5, 0.0, 1.0);
}

void main() {
  vec2 px = vUv * uResolution;
  vec2 cell = floor(px / uCell);
  vec2 iUv = imageUv(vUv);

  vec4 texel = (iUv.x < 0.0 || iUv.x > 1.0 || iUv.y < 0.0 || iUv.y > 1.0)
    ? vec4(uMatte, 1.0)
    : textureLod(tImage, iUv, uLod);

  float luma = grade(0.2126 * texel.r + 0.7152 * texel.g + 0.0722 * texel.b);

  float threshold = orderedThreshold(cell);
  float steps = uLevels - 1.0;
  float quantized = floor(luma * steps + (1.0 - threshold) * (1.0 - 1.0 / steps)) / steps;

  vec3 col;
  if (uPalette == 0) {
    col = mix(uInk, uPaper, quantized);
  } else if (uPalette == 1) {
    col = mix(uInk, uPaper, quantized);
  } else {
    vec3 graded = grade3(texel.rgb);
    float qt = floor(luma * steps + (1.0 - threshold) * (1.0 - 1.0 / steps)) / steps;
    col = mix(uInk, uPaper, qt);
  }

  float diffusedVal = texture(tDiffused, iUv).r;
  col = mix(col, mix(uInk, uPaper, diffusedVal), 0.0);

  float maskVal = texture(tMask, vec2(vUv.x, 1.0 - vUv.y)).r;

  float burstMask = 0.0;
  for (int i = 0; i < 4; i++) {
    if (uBursts[i].z <= 0.0) continue;
    vec2 bPos = uBursts[i].xy;
    float bAge = uBursts[i].z;
    float bRadius = uBursts[i].w * bAge;
    float bEdge = bRadius * uBurstWidth;
    float d = length(px - bPos);
    float ring = clamp((bRadius - abs(d - bRadius * 0.5)) / max(bEdge, 1.0), 0.0, 1.0);
    burstMask = max(burstMask, ring * (1.0 - bAge));
  }

  float reveal = max(maskVal, burstMask);

  float introFade = clamp(uIntro * 2.0, 0.0, 1.0);
  reveal = max(reveal, introFade);

  vec3 revealed = texel.rgb;
  col = mix(col, revealed, reveal * uReverse + (1.0 - reveal) * (1.0 - uReverse));

  float rimMask = 0.0;
  if (uRim > 0.0) {
    rimMask = clamp((reveal - 0.05) * 8.0, 0.0, 1.0) * clamp((0.95 - reveal) * 8.0, 0.0, 1.0);
    col = mix(col, uRimColor, rimMask * uRim);
  }

  fragColor = vec4(col, 1.0);
}
`;

interface DitherVeilProps {
  src?: string;
  pattern?: 'bayer' | 'noise' | 'lines';
  pixelSize?: number;
  inkColor?: string;
  paperColor?: string;
  revealRadius?: number;
  softness?: number;
  linger?: number;
  fit?: 'cover' | 'contain';
  rimColor?: string;
  palette?: string;
  levels?: number;
  contrast?: number;
  brightness?: number;
  rim?: number;
  reverse?: boolean;
  wander?: boolean;
  clickBurst?: boolean;
}

export default function DitherVeil({
  src = DEFAULT_SRC,
  pattern = 'bayer',
  pixelSize = 2,
  inkColor = '#0a0a0a',
  paperColor = '#1a1a1a',
  revealRadius = 200,
  softness = 0.6,
  linger = 1,
  fit = 'cover',
  rimColor = '#a78bfa',
  palette = 'duotone',
  levels = 2,
  contrast = 1.15,
  brightness = 0,
  rim = 0,
  reverse = false,
  wander = false,
  clickBurst = false,
}: DitherVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    let destroyed = false;

    // State
    const mouse = { x: -99999, y: -99999 };
    const prev = { x: -99999, y: -99999 };
    let introStart = performance.now();
    const bursts: Array<{ x: number; y: number; t: number; r: number }> = [];

    // Renderer
    const renderer = new Renderer({ alpha: false, antialias: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    container.appendChild(gl.canvas);

    // Geometry
    const geometry = new Triangle(gl);

    // Noise texture
    const noiseData = getBlueNoise();
    const noiseTex = new Texture(gl, {
      image: noiseData,
      width: 64,
      height: 64,
      wrapS: gl.REPEAT,
      wrapT: gl.REPEAT,
      minFilter: gl.NEAREST,
      magFilter: gl.NEAREST,
    });

    // Mask ping-pong
    const mkRT = () =>
      new RenderTarget(gl, {
        width: Math.ceil(container.clientWidth * MASK_SCALE),
        height: Math.ceil(container.clientHeight * MASK_SCALE),
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
      });
    let maskA = mkRT();
    let maskB = mkRT();

    // Mask program
    const maskProg = new Program(gl, {
      vertex,
      fragment: maskFragment,
      uniforms: {
        tPrev: { value: maskA.texture },
        uSize: { value: [container.clientWidth * MASK_SCALE, container.clientHeight * MASK_SCALE] },
        uFrom: { value: [0, 0] },
        uTo: { value: [0, 0] },
        uRadius: { value: revealRadius },
        uSoftness: { value: softness },
        uStrength: { value: 1.0 },
        uFade: { value: 0.012 / Math.max(linger, 0.01) },
        uHold: { value: HOLD },
      },
    });
    const maskMesh = new Mesh(gl, { geometry, program: maskProg });

    // Image texture
    const imageTex = new Texture(gl, { wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE });
    let imageNaturalW = 1;
    let imageNaturalH = 1;
    let matte = [0, 0, 0];

    // Diffused texture placeholder
    const diffusedTex = new Texture(gl, { wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE });

    // View program
    const palMap: Record<string, number> = { mono: 0, duotone: 1, color: 2 };
    const viewProg = new Program(gl, {
      vertex,
      fragment: viewFragment,
      uniforms: {
        tImage: { value: imageTex },
        tMask: { value: maskB.texture },
        tNoise: { value: noiseTex },
        tDiffused: { value: diffusedTex },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uCover: { value: [1, 1] },
        uLod: { value: 0 },
        uCell: { value: pixelSize },
        uPattern: { value: ORDERED[pattern] ?? 0 },
        uPalette: { value: palMap[palette] ?? 1 },
        uLevels: { value: levels },
        uInk: { value: hexToRgb(inkColor) },
        uPaper: { value: hexToRgb(paperColor) },
        uRimColor: { value: hexToRgb(rimColor) },
        uRim: { value: rim },
        uContrast: { value: contrast },
        uBrightness: { value: brightness },
        uReverse: { value: reverse ? 1.0 : 0.0 },
        uIntro: { value: 0 },
        uHold: { value: HOLD },
        uMatte: { value: [0, 0, 0] },
        uKey: { value: 0 },
        uSize: { value: [container.clientWidth, container.clientHeight] },
        uBursts: { value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        uBurstWidth: { value: 0.4 },
      },
    });
    const viewMesh = new Mesh(gl, { geometry, program: viewProg });

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (destroyed) return;
      imageNaturalW = img.naturalWidth;
      imageNaturalH = img.naturalHeight;
      imageTex.image = img;
      imageTex.needsUpdate = true;

      // Measure edge
      const offscreen = document.createElement('canvas');
      const ctx = offscreen.getContext('2d');
      if (ctx) {
        const edgeInfo = measureEdge(ctx, img);
        matte = edgeInfo.matte;
        viewProg.uniforms.uMatte.value = matte;
      }

      // Build diffused texture for non-ordered patterns
      const kernelKey = pattern === 'noise' ? 'atkinson' : 'floyd';
      const kern = KERNELS[kernelKey];
      if (kern) {
        const dw = Math.min(imageNaturalW, 256);
        const dh = Math.min(imageNaturalH, 256);
        const tmp = document.createElement('canvas');
        tmp.width = dw;
        tmp.height = dh;
        const tc = tmp.getContext('2d');
        if (tc) {
          tc.drawImage(img, 0, 0, dw, dh);
          const pix = tc.getImageData(0, 0, dw, dh);
          const grade = (v: number) => {
            const b = brightness * 0.5;
            return Math.max(0, Math.min(1, (v + b - 0.5) * contrast + 0.5));
          };
          const diffOut = diffuse(pix.data, dw, dh, kern, levels, false, grade);
          diffusedTex.image = diffOut;
          diffusedTex.width = dw;
          diffusedTex.height = dh;
          diffusedTex.needsUpdate = true;
        }
      }

      updateCover();
    };
    img.src = src;

    const updateCover = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h || !imageNaturalW || !imageNaturalH) return;
      const [sx, sy] = fitScale(w, h, imageNaturalW, imageNaturalH, fit === 'contain');
      viewProg.uniforms.uCover.value = [sx, sy];
    };

    const resize = () => {
      if (destroyed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      viewProg.uniforms.uResolution.value = [w, h];
      viewProg.uniforms.uSize.value = [w, h];
      // RenderTarget cleanup — remove canvas from DOM if possible
      try { (maskA as unknown as { destroy?: () => void }).destroy?.(); } catch (_) { /* ignore */ }
      try { (maskB as unknown as { destroy?: () => void }).destroy?.(); } catch (_) { /* ignore */ }
      maskA = mkRT();
      maskB = mkRT();
      maskProg.uniforms.uSize.value = [w * MASK_SCALE, h * MASK_SCALE];
      maskProg.uniforms.tPrev.value = maskA.texture;
      viewProg.uniforms.tMask.value = maskB.texture;
      updateCover();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const onMove = (cx: number, cy: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = cx - rect.left;
      mouse.y = cy - rect.top;
    };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onClick = (e: MouseEvent) => {
      if (!clickBurst) return;
      const rect = container.getBoundingClientRect();
      const bx = e.clientX - rect.left;
      const by = e.clientY - rect.top;
      if (bursts.length >= MAX_BURSTS) bursts.shift();
      bursts.push({ x: bx, y: by, t: 0, r: revealRadius * 2 });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    if (clickBurst) container.addEventListener('click', onClick);

    let lastTime = performance.now();

    const loop = (now: number) => {
      if (destroyed) return;
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = container.clientWidth;
      const h = container.clientHeight;

      let cx = mouse.x;
      let cy = mouse.y;
      if (wander && cx < 0) {
        const t = now / 1000;
        const [wx, wy] = wanderAt(t, w, h);
        cx = wx;
        cy = wy;
      }

      // Mask pass
      maskProg.uniforms.tPrev.value = maskA.texture;
      maskProg.uniforms.uFrom.value = [prev.x < 0 ? cx : prev.x, prev.y < 0 ? cy : prev.y];
      maskProg.uniforms.uTo.value = [cx, cy];
      maskProg.uniforms.uFade.value = 0.012 / Math.max(linger, 0.01) * dt * 60;
      renderer.render({ scene: maskMesh, target: maskB });

      // Swap
      const tmp = maskA;
      maskA = maskB;
      maskB = tmp;
      viewProg.uniforms.tMask.value = maskA.texture;

      // Update bursts
      const burstUniforms: number[] = [];
      for (let i = 0; i < MAX_BURSTS; i++) {
        const b = bursts[i];
        if (b) {
          b.t += dt / BURST_SECONDS;
          if (b.t > 1) { bursts.splice(i, 1); burstUniforms.push(0, 0, 0, 0); }
          else burstUniforms.push(b.x, h - b.y, b.t, b.r);
        } else {
          burstUniforms.push(0, 0, 0, 0);
        }
      }
      viewProg.uniforms.uBursts.value = burstUniforms;

      // Intro — skip if no reveal radius (always-dithered mode)
      const introT = revealRadius > 0 ? Math.min((now - introStart) / INTRO_MS, 1) : 0;
      viewProg.uniforms.uIntro.value = introT < 1 ? introT : 0;

      renderer.render({ scene: viewMesh });

      prev.x = cx;
      prev.y = cy;
    };

    introStart = performance.now();
    animId = requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      if (clickBurst) container.removeEventListener('click', onClick);
      try { gl.canvas.remove(); } catch (_) { /* ignore */ }
    };
  }, [src, pattern, pixelSize, inkColor, paperColor, revealRadius, softness, linger, fit, rimColor, palette, levels, contrast, brightness, rim, reverse, wander, clickBurst]);

  return <div className="dither-veil" ref={containerRef} />;
}
