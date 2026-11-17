import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Campus Boost — Investissez dans les talents de demain",
    template: "%s · Campus Boost",
  },
  description:
    "Connectez les enjeux de votre entreprise aux compétences de l’UFR Mathématiques et Informatique de l’Université Paris Cité. Explorez MATCH, les projets pédagogiques et le parcours SOLTéA.",
  icons: { icon: "/brand/favicon.png", apple: "/brand/icon.png" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Campus Boost",
    description: "Investissez dans les talents de demain.",
    locale: "fr_FR",
    type: "website",
  },
};
export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body id="top">
        <Providers>
          <a href="#main-content" className="skip-link">
            Aller au contenu
          </a>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
