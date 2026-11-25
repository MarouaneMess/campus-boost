import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("l’accueil sépare les parcours et conserve les anciens liens", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Je suis",
  );
  await expect(page.locator("#match, #ambassadeurs")).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  await page.screenshot({ path: ".local/audience-home.png", fullPage: true });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole("link", { name: "Je suis une entreprise", exact: true })
    .click();
  await expect(page).toHaveURL(/\/entreprises$/);
  await expect(page.locator("#match")).toHaveCount(1);
  await expect(page.locator("#ambassadeurs, #temoignages")).toHaveCount(0);
  await page.goto("/ambassadeurs");
  await expect(page.locator("#ambassadeurs")).toHaveCount(1);
  await expect(
    page.locator("#match, #calendrier, #sujets, #projets, #terrain"),
  ).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  await page.screenshot({ path: ".local/ambassador-hero.png" });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.goto("/#match");
  await expect(page).toHaveURL(/\/entreprises#match$/);
  await page.goto("/#ambassadeurs");
  await expect(page).toHaveURL(/\/ambassadeurs#ambassadeurs$/);
});

test("les idées de projets se filtrent uniquement dans le parcours entreprises", async ({
  page,
}) => {
  await page.goto("/entreprises#sujets");
  const topics = page.locator("#sujets");
  await topics.getByRole("button", { name: "L3", exact: true }).click();
  await expect(topics.locator(".topic-card")).toHaveCount(2);
  await topics.getByRole("button", { name: "M1", exact: true }).click();
  await topics
    .getByLabel("Formation", { exact: true })
    .selectOption("Informatique · Intelligence Artificielle Distribuée (IAD)");
  await expect(topics.locator(".topic-card")).toHaveCount(1);
  await expect(topics.locator(".topic-card")).toContainText(
    "Orienter les demandes du support client",
  );
  await expect(
    topics.getByRole("link", { name: "Consulter la formation" }),
  ).toHaveAttribute(
    "href",
    "https://math-info.u-paris.fr/master-informatique/parcours-intelligence-artificielle-distribuee/",
  );
  await topics.getByRole("button", { name: "L3", exact: true }).click();
  await expect(
    topics.getByText("Aucun sujet proposé pour cette combinaison."),
  ).toBeVisible();
  await topics
    .getByRole("button", { name: "Réinitialiser les filtres" })
    .click();
  await expect(topics.locator(".topic-card")).toHaveCount(8);
  await expect(page.locator("#contact-taxe .button")).toHaveAttribute(
    "href",
    /^mailto:taxe-apprentissage.defi@u-paris.fr\?/,
  );
  await expect(page.locator("#calendrier")).not.toContainText(
    "Créer les supports",
  );
  for (const route of ["/entreprises", "/ambassadeurs"]) {
    await page.goto(route);
    await expect(page.locator("#projets")).toHaveCount(0);
    if (route === "/entreprises") {
      await expect(topics.getByRole("heading", { level: 2 })).toContainText(
        "À chaque formation,",
      );
      await topics.getByRole("button", { name: "M2", exact: true }).click();
      await expect(topics.locator(".topic-card")).toHaveCount(2);
    } else {
      await expect(topics).toHaveCount(0);
    }
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href")!)
          .filter(
            (href) =>
              href.length > 1 && !document.getElementById(href.slice(1)),
          ),
      );
    expect(broken).toEqual([]);
  }
});
