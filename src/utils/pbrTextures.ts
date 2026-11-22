import * as THREE from 'three';

export interface ProceduralPbrMaps {
  map: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  aoMap: THREE.CanvasTexture;
}

export type PbrPreset = 'brushed-metal' | 'carbon-tech' | 'pcb-grid' | 'glass-micro' | 'floor-grid';

function makeCanvas(size = 256): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D canvas context unavailable for procedural PBR generation');
  }
  return [canvas, ctx];
}

function detHash(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

const CACHE: Partial<Record<PbrPreset, ProceduralPbrMaps>> = {};

export function getProceduralPbrMaps(preset: PbrPreset): ProceduralPbrMaps {
  if (CACHE[preset]) {
    return CACHE[preset]!;
  }

  const size = 256;
  const [albedoC, albedoCtx] = makeCanvas(size);
  const [roughC, roughCtx] = makeCanvas(size);
  const [bumpC, bumpCtx] = makeCanvas(size);
  const [aoC, aoCtx] = makeCanvas(size);

  const seedMap: Record<PbrPreset, number> = {
    'brushed-metal': 11,
    'carbon-tech': 23,
    'pcb-grid': 37,
    'glass-micro': 53,
    'floor-grid': 71,
  };
  const seed = seedMap[preset];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const h = detHash(x, y, seed);
      const streak = detHash(0, y, seed + 5);

      let aVal = 210;
      let rVal = 80;
      let bVal = 128;
      let aoVal = 235;

      if (preset === 'brushed-metal') {
        const brush = streak * 0.75 + h * 0.25;
        aVal = Math.round(175 + brush * 65);
        rVal = Math.round(45 + (1 - brush) * 55);
        bVal = Math.round(112 + brush * 36);
        aoVal = Math.round(215 + brush * 35);
      } else if (preset === 'carbon-tech') {
        const cellX = x % 16;
        const cellY = y % 16;
        const weave = (cellX < 8 && cellY < 8) || (cellX >= 8 && cellY >= 8) ? 1 : 0.72;
        const micro = (cellX === 0 || cellY === 0) ? 0.55 : weave;
        aVal = Math.round(42 * micro + h * 14);
        rVal = Math.round(90 + (1 - micro) * 70);
        bVal = Math.round(95 + micro * 95);
        aoVal = Math.round(165 + micro * 80);
      } else if (preset === 'pcb-grid') {
        const major = x % 32 === 0 || y % 32 === 0;
        const minor = x % 8 === 0 || y % 8 === 0;
        const via = x % 64 === 16 && y % 64 === 16;
        aVal = major ? 225 : minor ? 145 : Math.round(68 + h * 16);
        rVal = major ? 42 : minor ? 72 : 118;
        bVal = major ? 210 : minor ? 168 : Math.round(110 + h * 18);
        aoVal = via ? 95 : major ? 200 : 238;
      } else if (preset === 'glass-micro') {
        const diag = ((x + y) % 64) / 64;
        aVal = Math.round(220 + h * 25);
        rVal = Math.round(18 + diag * 22 + h * 10);
        bVal = Math.round(124 + (h - 0.5) * 14);
        aoVal = 248;
      } else if (preset === 'floor-grid') {
        const gx = x % 32;
        const gy = y % 32;
        const line = gx < 2 || gy < 2;
        const sub = gx % 8 === 0 || gy % 8 === 0;
        aVal = line ? 235 : sub ? 95 : Math.round(28 + h * 10);
        rVal = line ? 35 : sub ? 75 : 135;
        bVal = line ? 220 : sub ? 155 : 120;
        aoVal = line ? 245 : 210;
      }

      albedoCtx.fillStyle = `rgb(${aVal},${aVal},${aVal})`;
      albedoCtx.fillRect(x, y, 1, 1);

      roughCtx.fillStyle = `rgb(${rVal},${rVal},${rVal})`;
      roughCtx.fillRect(x, y, 1, 1);

      bumpCtx.fillStyle = `rgb(${bVal},${bVal},${bVal})`;
      bumpCtx.fillRect(x, y, 1, 1);

      aoCtx.fillStyle = `rgb(${aoVal},${aoVal},${aoVal})`;
      aoCtx.fillRect(x, y, 1, 1);
    }
  }

  const setupTex = (canvas: HTMLCanvasElement, isColor: boolean, repeat: [number, number]) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
    tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  };

  const repeatMap: Record<PbrPreset, [number, number]> = {
    'brushed-metal': [2, 2],
    'carbon-tech': [3, 3],
    'pcb-grid': [2, 2],
    'glass-micro': [1, 1],
    'floor-grid': [14, 14],
  };

  const rep = repeatMap[preset];
  const bundle: ProceduralPbrMaps = {
    map: setupTex(albedoC, true, rep),
    roughnessMap: setupTex(roughC, false, rep),
    bumpMap: setupTex(bumpC, false, rep),
    aoMap: setupTex(aoC, false, rep),
  };

  CACHE[preset] = bundle;
  return bundle;
}
