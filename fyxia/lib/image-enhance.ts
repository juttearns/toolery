export interface EnhanceSettings {
  brightness: number; // 100 = no change
  contrast: number; // 100 = no change
  saturation: number; // 100 = no change
  warmth: number; // -100..100, 0 = no change
  sharpen: number; // 0..100, 0 = no change
  autoEnhance: boolean;
}

export const DEFAULT_SETTINGS: EnhanceSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  warmth: 0,
  sharpen: 0,
  autoEnhance: false,
};

/** Auto-levels: stretch each channel's histogram between its ~0.5% and
 * 99.5% percentiles, clipping outliers so a few stray bright/dark pixels
 * don't compress the whole range. */
function applyAutoLevels(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const totalPixels = width * height;

  const histR = new Array(256).fill(0);
  const histG = new Array(256).fill(0);
  const histB = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    histR[data[i]]++;
    histG[data[i + 1]]++;
    histB[data[i + 2]]++;
  }

  function clipRange(hist: number[]) {
    const clip = totalPixels * 0.005;
    let low = 0;
    let acc = 0;
    for (let v = 0; v < 256; v++) {
      acc += hist[v];
      if (acc > clip) {
        low = v;
        break;
      }
    }
    let high = 255;
    acc = 0;
    for (let v = 255; v >= 0; v--) {
      acc += hist[v];
      if (acc > clip) {
        high = v;
        break;
      }
    }
    if (high <= low) return { low: 0, high: 255 };
    return { low, high };
  }

  const r = clipRange(histR);
  const g = clipRange(histG);
  const b = clipRange(histB);

  function buildLUT(low: number, high: number) {
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      lut[v] = ((v - low) / (high - low)) * 255;
    }
    return lut;
  }
  const lutR = buildLUT(r.low, r.high);
  const lutG = buildLUT(g.low, g.high);
  const lutB = buildLUT(b.low, b.high);

  for (let i = 0; i < data.length; i += 4) {
    data[i] = lutR[data[i]];
    data[i + 1] = lutG[data[i + 1]];
    data[i + 2] = lutB[data[i + 2]];
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyWarmth(ctx: CanvasRenderingContext2D, width: number, height: number, warmth: number) {
  if (warmth === 0) return;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const shift = (warmth / 100) * 40; // up to +/-40 per channel
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + shift));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] - shift));
  }
  ctx.putImageData(imageData, 0, 0);
}

/** Simple unsharp-mask style sharpen: blend the image with a 3x3
 * sharpening convolution, scaled by `amount` (0..100). */
function applySharpen(ctx: CanvasRenderingContext2D, width: number, height: number, amount: number) {
  if (amount <= 0) return;
  const k = (amount / 100) * 0.9;
  const weights = [0, -k, 0, -k, 1 + 4 * k, -k, 0, -k, 0];

  const src = ctx.getImageData(0, 0, width, height);
  const srcData = src.data;
  const out = ctx.createImageData(width, height);
  const outData = out.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        let w = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const sx = Math.min(width - 1, Math.max(0, x + kx));
            const sy = Math.min(height - 1, Math.max(0, y + ky));
            sum += srcData[(sy * width + sx) * 4 + c] * weights[w];
            w++;
          }
        }
        outData[idx + c] = Math.min(255, Math.max(0, sum));
      }
      outData[idx + 3] = srcData[idx + 3];
    }
  }
  ctx.putImageData(out, 0, 0);
}

/**
 * Runs the full enhancement pipeline against a canvas that already has the
 * source image drawn onto it, mutating it in place. Order: auto-levels →
 * brightness/contrast/saturation (native canvas filter, fast) → warmth →
 * sharpen (heaviest step, done last on the smaller/already-leveled data).
 */
export function runEnhancePipeline(
  canvas: HTMLCanvasElement,
  settings: EnhanceSettings
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;

  if (settings.autoEnhance) {
    applyAutoLevels(ctx, width, height);
  }

  const needsFilter =
    settings.brightness !== 100 || settings.contrast !== 100 || settings.saturation !== 100;
  if (needsFilter) {
    const filtered = document.createElement("canvas");
    filtered.width = width;
    filtered.height = height;
    const fctx = filtered.getContext("2d");
    if (fctx) {
      fctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`;
      fctx.drawImage(canvas, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(filtered, 0, 0);
    }
  }

  applyWarmth(ctx, width, height, settings.warmth);
  applySharpen(ctx, width, height, settings.sharpen);
}

export async function loadImageToCanvas(file: File): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvas;
}
