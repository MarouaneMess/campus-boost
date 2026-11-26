import sharp from "sharp";
import { fileURLToPath } from "node:url";

// Conversion du logo fourni : retrait de la matte blanche, dessin inchangé.
const source = fileURLToPath(
  new URL(
    "../public/brand/ufr-mathematiques-informatique.jpg",
    import.meta.url,
  ),
);
const destination = fileURLToPath(
  new URL(
    "../public/brand/ufr-mathematiques-informatique.png",
    import.meta.url,
  ),
);
const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const alpha = 255 - Math.min(data[i], data[i + 1], data[i + 2]);
  data[i + 3] = alpha <= 8 ? 0 : alpha;
  for (let channel = 0; channel < 3; channel++) {
    data[i + channel] =
      alpha <= 8
        ? 0
        : Math.round(((data[i + channel] - (255 - alpha)) * 255) / alpha);
  }
}
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(destination);
console.log(`Logo UFR transparent : ${info.width} × ${info.height}`);
