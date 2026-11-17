import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("MATCH relie les huit secteurs, gère la sélection vide et filtre les formations", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Investissez dans/ }),
  ).toBeVisible();
  const sectors = page.getByRole("group", {
    name: "Choisir votre secteur d’activité",
  });
  for (const name of [
    "Banque et assurance",
    "Informatique et conseil",
    "Aviation et aéronautique",
    "Santé et pharmacie",
    "Énergie",
    "Commerce et distribution",
    "Télécommunications",
    "Transport et logistique",
  ]) {
    await sectors.getByRole("button", { name }).click();
    await expect(sectors.getByRole("button", { name })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator(".match-results .program-card")).toHaveCount(3);
  }
  await sectors
    .getByRole("button", { name: "Aviation et aéronautique" })
    .click();
  const needs = page.getByRole("group", {
    name: "Besoins métiers",
    exact: true,
  });
  for (const button of await needs.getByRole("button").all())
    await button.click();
  await expect(page.getByText("Créons une première connexion.")).toBeVisible();
  await needs.getByRole("button", { name: "Vision artificielle" }).click();
  await expect(page.locator(".match-results")).toContainText(
    "Vision et machine intelligente",
  );
  await page
    .locator(".match-results")
    .getByRole("button", { name: /Voir les/ })
    .click();
  await expect(page.locator(".match-results .program-card")).toHaveCount(6);
  await page
    .getByRole("searchbox", { name: "Rechercher une formation" })
    .fill("biostatistique");
  await expect(page.locator(".catalog-grid .program-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Rechercher une formation" })
    .fill("xyz-introuvable");
  await expect(
    page.getByText("Aucune formation pour cette recherche."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Réinitialiser les filtres" }).click();
  await expect(page.locator(".catalog-grid .program-card")).toHaveCount(9);
  expect(errors).toEqual([]);
});

test("le simulateur calcule les équivalences et ajuste les limites", async ({
  page,
}) => {
  await page.goto("/#simulateur");
  const simulator = page.locator(".impact-simulator");
  const amount = simulator.getByRole("spinbutton", {
    name: "Votre budget hypothétique",
  });
  await expect(simulator.locator(".equipment-count > strong")).toHaveText("2");
  await amount.fill("500");
  await expect(simulator.locator(".equipment-count > strong")).toHaveText("0");
  await simulator.getByRole("combobox").selectOption("network-kit");
  await expect(simulator.locator(".equipment-count > strong")).toHaveText("1");
  await amount.fill("1000000");
  await amount.blur();
  await expect(amount).toHaveValue("100000");
  await expect(simulator.locator(".equipment-count > strong")).toHaveText(
    "200",
  );
  await amount.fill("-500");
  await amount.blur();
  await expect(amount).toHaveValue("0");
  await simulator.getByRole("button", { name: /2.500/ }).click();
  await expect(simulator.locator(".equipment-count > strong")).toHaveText("5");
  await expect(simulator).toContainText(
    "Estimations illustratives, sans devis",
  );
});

test("la démonstration reste fonctionnelle après rechargement hors ligne et se réinitialise", async ({
  page,
  context,
}) => {
  await page.goto("/demo");
  await expect(
    page.getByText("Démo prête hors ligne", { exact: true }),
  ).toBeVisible({ timeout: 35000 });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Investissez",
  );
  await page
    .getByRole("button", { name: "Commencer la démonstration", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Étape suivante" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Aviation et aéronautique" }).click();
  await page.getByRole("button", { name: "Étape suivante" }).click();
  await expect(
    page.getByRole("button", { name: /Optimisation des trajectoires/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Étape suivante" }).click();
  await expect(page.locator(".demo-programs .program-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Étape suivante" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Et si l’on optimisait une trajectoire aérienne ?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Étape suivante" }).click();
  await page.getByRole("button", { name: /5.000/ }).click();
  await expect(page.locator(".equipment-count > strong")).toHaveText("5");
  await page.getByRole("button", { name: "Étape suivante" }).click();
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Suivant", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Confirmez et suivez vos choix" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Accéder à SOLTéA/ }),
  ).toHaveAttribute("href", "https://www.soltea.education.gouv.fr/");
  await page
    .getByRole("button", { name: "Recommencer la démonstration" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Investissez",
  );
  await page.getByRole("button", { name: "Étape suivante" }).click();
  await expect(
    page.getByRole("button", { name: "Étape suivante" }),
  ).toBeDisabled();
  await context.setOffline(false);
});

test("menu mobile, navigation clavier, tailles d’écran et mouvement réduit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Navigation mobile" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Navigation mobile" }),
  ).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await page
    .locator(".sector-grid")
    .getByRole("button", { name: "Aviation et aéronautique" })
    .click();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await mkdir(".local", { recursive: true });
  await page.goto("/");
  await page.screenshot({ path: ".local/home-hero-desktop.png" });
  await page.screenshot({ path: ".local/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: ".local/home-hero-mobile.png" });
  await page.screenshot({ path: ".local/home-mobile.png", fullPage: true });
});

test("les pages et les interactions principales passent les contrôles axe WCAG AA", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".sector-grid")
    .getByRole("button", { name: "Aviation et aéronautique" })
    .click();
  const home = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    home.violations.map((violation) => ({
      rule: violation.id,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        failure: node.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.goto("/demo");
  const demo = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    demo.violations.map((violation) => ({
      rule: violation.id,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        failure: node.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("les routes éditoriales et l’absence de WebGL ne bloquent pas le contenu", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".hero-art .static-network")).toBeVisible();
  await expect(page.locator(".network-canvas")).toHaveCount(0);
  for (const path of ["/sources", "/mentions-legales", "/demo"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  const missing = await page.goto("/page-inexistante");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Revenir à l’accueil" }),
  ).toBeVisible();
});

test("le réseau 3D se met en pause, reprend et résiste à une perte de contexte", async ({
  page,
}) => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const externalRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()))
      warnings.push(message.text());
  });
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:3000"))
      externalRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "deviceMemory", { get: () => 8 });
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 });
  });
  await page.goto("/");
  await expect(page.locator(".hero-art canvas")).toBeVisible();
  await expect(page.locator(".hero-art .network-fallback")).toHaveClass(
    /under-canvas/,
  );
  await page
    .getByRole("button", { name: "Mettre l’animation 3D en pause" })
    .click();
  await expect(page.locator(".hero-art canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Activer l’animation 3D" }).click();
  await expect(page.locator(".hero-art canvas")).toBeVisible();
  await page
    .locator(".sector-grid")
    .getByRole("button", { name: "Aviation et aéronautique" })
    .click();
  await page.locator(".matching-visual").scrollIntoViewIfNeeded();
  await expect(page.locator(".matching-visual canvas")).toBeVisible();
  await page
    .locator(".matching-visual canvas")
    .evaluate((canvas) => canvas.dispatchEvent(new Event("webglcontextlost")));
  await expect(page.locator(".matching-visual .network-canvas")).toHaveCount(0);
  await expect(
    page.locator(".matching-visual .network-fallback"),
  ).not.toHaveClass(/under-canvas/);
  await expect(page.locator(".match-flow")).toContainText("Aviation");
  expect(errors).toEqual([]);
  expect(warnings).toEqual([]);
  expect(externalRequests).toEqual([]);
});
