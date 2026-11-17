"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="container error-page">
      <p className="eyebrow">UNE PAUSE INATTENDUE</p>
      <h1>
        Rétablissons
        <br />
        <em>la connexion.</em>
      </h1>
      <p>
        La page a rencontré un problème. Vous pouvez réessayer ou revenir à
        l’accueil.
      </p>
      <div className="hero-buttons">
        <button type="button" className="button button-primary" onClick={reset}>
          Réessayer
        </button>
        <Link className="button button-outline" href="/">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
