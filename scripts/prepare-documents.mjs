import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

// Uniquement local : le serveur doit être lancé dans un autre terminal.
const origin = process.env.CAMPUS_PREVIEW_URL || "http://127.0.0.1:3000";
const url = new URL(origin);
if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
  throw new Error(
    "La génération des supports utilise uniquement un serveur local.",
  );
}
const browser = await chromium.launch({
  channel: process.platform === "win32" ? "msedge" : undefined,
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    reducedMotion: "reduce",
  });
  const response = await page.goto(`${url.origin}/kit-ambassadeur/brochure`, {
    waitUntil: "networkidle",
  });
  if (!response?.ok())
    throw new Error("La page de brochure locale n’est pas disponible.");
  await page.evaluate(() => document.fonts.ready);
  await mkdir("public/documents", { recursive: true });
  await page.pdf({
    path: "public/documents/campusboost-brochure.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  await page.emulateMedia({ media: "screen" });
  await page.evaluate(() => {
    document.body.innerHTML = `<main style="width:1200px;height:630px;padding:60px 75px;background:#faf9f6;position:relative;overflow:hidden">
      <div style="display:flex;gap:36px;align-items:center"><img src="/brand/campus-boost.webp" alt="Campus Boost" style="width:130px;height:87px;object-fit:contain"><img src="/brand/universite-paris-cite.png" alt="Université Paris Cité" style="width:180px;height:70px;object-fit:contain"><span style="border-left:1px solid #ccc;padding-left:25px;font-size:16px;color:#0b2146">UFR Mathématiques<br>et Informatique</span></div>
      <p style="font-size:13px;letter-spacing:3px;color:#b60055;margin-top:42px">LES ENTREPRISES & LES TALENTS DE DEMAIN</p>
      <h1 style="font-size:70px;line-height:1.08;color:#0b2146;margin-top:22px;font-weight:500">Des savoirs solides.<br><em style="font-size:78px">Des connexions qui font grandir.</em></h1>
      <p style="font-size:17px;color:#5f6a7b;margin-top:28px">MATCH · Projets étudiants · Parcours · SOLTéA</p>
      <div style="height:8px;background:#b60055;position:absolute;left:0;right:0;bottom:0"></div>
    </main>`;
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode()));
  });
  await page.screenshot({ path: "public/brand/campusboost-social.png" });
  console.log("Brochure PDF et aperçu social générés localement.");
} finally {
  await browser.close();
}
