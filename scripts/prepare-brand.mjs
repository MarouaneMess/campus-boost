import sharp from "sharp";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const original = path.join(root, "logo", "CampusBoost_logo.png");
const destination = path.join(root, "public", "brand");
await mkdir(destination, { recursive: true });
await copyFile(original, path.join(destination, "campus-boost-original.png"));
// Retire uniquement la marge transparente, jamais une partie du dessin.
const { data, info } = await sharp(original)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let left = info.width,
  top = info.height,
  right = 0,
  bottom = 0;
const bins = new Map();
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] > 8) {
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
    if (
      data[i + 3] > 240 &&
      Math.max(data[i], data[i + 1], data[i + 2]) -
        Math.min(data[i], data[i + 1], data[i + 2]) >
        35
    ) {
      const key = [data[i], data[i + 1], data[i + 2]]
        .map((v) => Math.round(v / 16) * 16)
        .join(",");
      bins.set(key, (bins.get(key) ?? 0) + 1);
    }
  }
}
const crop = { left, top, width: right - left + 1, height: bottom - top + 1 };
await sharp(original)
  .extract(crop)
  .resize({ width: 480 })
  .webp({ lossless: true })
  .toFile(path.join(destination, "campus-boost.webp"));
await sharp(original)
  .extract(crop)
  .resize(180, 180, { fit: "contain", background: "#faf9f6" })
  .png()
  .toFile(path.join(destination, "icon.png"));
await sharp(original)
  .extract(crop)
  .resize(32, 32, { fit: "contain", background: "#faf9f6" })
  .png()
  .toFile(path.join(destination, "favicon.png"));
const palette = [...bins.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
await writeFile(
  path.join(destination, "palette.json"),
  JSON.stringify(
    {
      source: "CampusBoost_logo.png",
      crop,
      dominantQuantizedColors: palette,
      tokens: { navy: "#0b2146", fuchsia: "#b60055", paper: "#faf9f6" },
    },
    null,
    2,
  ),
);
console.log(JSON.stringify({ crop, palette }));
