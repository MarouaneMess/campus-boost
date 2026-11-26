import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

test("les objectifs entreprises, les réalisations et leurs filtres fonctionnent au clavier", async ({
  page,
}) => {
  await page.goto("/entreprises");
  await expect
    .poll(() =>
      page
        .locator("header .ufr-logo")
        .evaluate((img) => (img as HTMLImageElement).naturalWidth > 0),
    )
    .toBe(true);
  await expect(
    page
      .getByRole("navigation", { name: "Votre objectif entreprise" })
      .getByRole("link"),
  ).toHaveCount(3);
  const projects = page.locator("#realisations");
  await expect(projects.locator(".realization-card")).toHaveCount(3);
  await projects
    .getByRole("button", { name: /Découvrir la réalisation : Mini-SGBD/ })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Aucun aperçu visuel");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("link", { name: /Consulter le code public/ }),
  ).toHaveAttribute("href", "https://github.com/MarouaneMess/PROJET_BBDA");
  await page.keyboard.press("Escape");
  await projects
    .getByRole("button", { name: "Cybersécurité", exact: true })
    .click();
  await expect(
    projects.getByText("Aucun projet réel publié pour ce domaine.", {
      exact: false,
    }),
  ).toBeVisible();
  await projects
    .getByRole("button", { name: "Développement", exact: true })
    .click();
  const card = projects.getByRole("button", {
    name: /Découvrir la réalisation : CampusBoost/,
  });
  await card.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("La problématique");
  await expect(
    dialog.getByRole("link", { name: /Consulter le code public/ }),
  ).toHaveAttribute("href", "https://github.com/MarouaneMess/campus-boost");
  await expect(
    dialog.getByRole("button", { name: "Fermer la présentation du projet" }),
  ).toBeFocused();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    accessibility.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
});

test("MATCH ouvre une réalisation et relie les besoins pédagogiques", async ({
  page,
}) => {
  await page.goto("/entreprises");
  await page
    .getByRole("group", { name: "Choisir votre secteur d’activité" })
    .getByRole("button", { name: "Informatique et conseil" })
    .click();
  const matched = page.locator(".match-next-steps");
  await expect(matched).toContainText(
    "Liens proposés par compétences communes",
  );
  const project = matched.getByRole("link", {
    name: /CampusBoost.*Voir la réalisation documentée/,
  });
  await project.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await project.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "Fermer la présentation du projet" })
    .click();
  await matched.getByRole("link", { name: /Des salles informatiques/ }).click();
  const need = page.locator("#besoin-01");
  await need.getByText("Pourquoi et pour qui ?").click();
  await expect(need).toContainText(
    "Développer, tester et présenter une application",
  );
  await need
    .getByRole("link", { name: "Explorer les idées de projets par formation" })
    .click();
  await expect(page.locator("#topics-title")).toBeInViewport();
  await expect(page.locator("#sujets .topic-card")).toHaveCount(8);
});

test("témoignages, calendrier et événements gardent leurs statuts explicites", async ({
  page,
}) => {
  await page.goto("/ambassadeurs");
  const stories = page.locator("#temoignages");
  for (const label of ["Étudiants actuels", "Alumni", "Enseignants"]) {
    await stories.getByRole("button", { name: label, exact: true }).click();
    await expect(stories.locator(".story-card")).toHaveCount(1);
    await expect(stories.locator(".story-card")).toContainText(
      "Témoignage à recueillir",
    );
  }
  await page.goto("/entreprises#terrain");
  const events = page.locator("#terrain");
  await events.getByRole("button", { name: "Confirmés", exact: true }).click();
  await expect(events).toContainText("Aucune participation confirmée");
  await events.getByRole("button", { name: "Tous", exact: true }).click();
  await events.getByRole("button", { name: "Explorer les 7 pistes" }).click();
  await expect(events.locator(".event-card")).toHaveCount(7);
  await events
    .locator(".event-card")
    .first()
    .getByText("Ce que votre entreprise peut apporter", { exact: true })
    .click();
  await expect(events.locator(".event-card").first()).toContainText(
    "Une manière de participer",
  );
  await page.goto("/ambassadeurs#competitions");
  await page.locator("#competitions summary").first().click();
  await expect(page.locator("#competitions")).toContainText(
    "France Cybersecurity Challenge",
  );
  await page.goto("/entreprises#calendrier");
  await expect(page.locator(".soltea-timeline .timeline-status")).toHaveText([
    "À confirmer",
    "À confirmer",
    "À confirmer",
    "À confirmer",
  ]);
  await expect(page.locator(".company-actions > article")).toHaveCount(2);
});

test("le kit copie les vrais modèles et télécharge des fichiers complets", async ({
  page,
  context,
  request,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/ambassadeurs#ambassadeurs");
  const kit = page.locator("#ambassadeurs");
  await kit
    .getByRole("button", { name: "Message LinkedIn", exact: true })
    .click();
  const template = await kit.locator("textarea").inputValue();
  await kit
    .getByRole("button", { name: "Copier le modèle", exact: true })
    .click();
  await expect(kit.getByRole("status")).toHaveText("Modèle copié.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    template,
  );
  const downloadPromise = page.waitForEvent("download");
  await kit.getByRole("button", { name: "Télécharger le texte" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("campusboost-linkedin.txt");
  const file = await download.path();
  expect(file).not.toBeNull();
  expect((await readFile(file!, "utf8")).replace(/^\uFEFF/, "")).toBe(template);
  await kit.getByRole("button", { name: "Copier le lien à partager" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "https://campus-boost.vercel.app/entreprises",
  );
  const pdf = await request.get("/documents/campusboost-brochure.pdf");
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const pdfDownload = page.waitForEvent("download");
  await kit.getByRole("link", { name: "Télécharger la brochure PDF" }).click();
  expect((await pdfDownload).suggestedFilename()).toBe(
    "campusboost-brochure.pdf",
  );
  await kit.getByRole("link", { name: /Lire la version accessible/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Investissez",
  );
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    a11y.violations.map((item) => ({
      id: item.id,
      targets: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("la navigation V2 reste utilisable aux tailles mobiles et intermédiaires", async ({
  page,
}) => {
  await page.goto("/entreprises");
  for (const width of [320, 390, 768, 1024, 1200, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    const brand = page.locator("header .brand-system");
    await expect(brand.locator(".ufr-logo")).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  const nav = page.getByRole("navigation", { name: "Navigation mobile" });
  await nav.getByRole("link", { name: "Changer de parcours" }).click();
  await page
    .getByRole("link", { name: "Je suis un ambassadeur", exact: true })
    .click();
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await nav.getByRole("link", { name: "Kit ambassadeur", exact: true }).click();
  await expect(nav).toHaveCount(0);
  await expect(page).toHaveURL(/#ambassadeurs$/);
  await expect(page.locator("#ambassador-title")).toBeInViewport();
  await page.goto("/entreprises");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await nav.getByRole("link", { name: "Calendrier", exact: true }).click();
  await expect(page.locator("#roadmap-title")).toBeInViewport();
  const mobile = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    mobile.violations.map((item) => ({
      id: item.id,
      targets: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});
