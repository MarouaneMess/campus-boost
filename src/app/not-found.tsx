import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="container error-page">
      <p className="eyebrow">404 · CONNEXION INTROUVABLE</p>
      <h1>
        Ce chemin reste
        <br />
        <em>à tracer.</em>
      </h1>
      <p>
        Cette page n’existe pas. Retrouvez les formations et le projet Campus
        Boost depuis l’accueil.
      </p>
      <Link className="button button-primary" href="/">
        Revenir à l’accueil →
      </Link>
    </main>
  );
}
