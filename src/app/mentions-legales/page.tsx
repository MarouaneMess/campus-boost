import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Informations sur le site" };

export default function LegalPage() {
  return (
    <main id="main-content" className="document-page container">
      <Link className="text-link" href="/">
        ← Retour au site
      </Link>
      <Eyebrow>CAMPUS BOOST</Eyebrow>
      <h1>
        Informations <em>sur le site.</em>
      </h1>
      <p className="document-lead">
        Prototype universitaire destiné à une présentation pédagogique.
      </p>
      <section>
        <h2>Nature du projet</h2>
        <p>
          Campus Boost est une initiative de sept étudiants de l’Université
          Paris Cité autour de l’UFR Mathématiques et Informatique. Ce prototype
          ne constitue pas le site institutionnel de l’université et n’encaisse
          aucun paiement.
        </p>
        <p>
          Cette version est préparée pour un usage local. Avant une publication,
          l’équipe devra renseigner l’identité et les coordonnées de l’éditeur,
          le responsable de publication ainsi que les informations de
          l’hébergeur effectivement retenu.
        </p>
      </section>
      <section>
        <h2>Données et stockage local</h2>
        <p>
          Ce site ne comporte ni compte, ni formulaire d’envoi, ni publicité, ni
          outil de mesure d’audience. Les choix de secteur, les filtres et les
          montants restent dans la mémoire du navigateur et sont réinitialisés
          au rechargement.
        </p>
        <p>
          En mode production, la page de démonstration utilise un service worker
          et le cache du navigateur pour enregistrer les fichiers locaux
          nécessaires au fonctionnement hors ligne. Aucun profil d’entreprise
          n’y est conservé. Ce cache peut être supprimé dans les données du site
          de votre navigateur.
        </p>
        <p>
          Les liens officiels ouvrent des sites externes avec leurs propres
          règles. L’hébergeur choisi lors d’une future publication pourra
          conserver des journaux techniques selon sa configuration.
        </p>
      </section>
      <section>
        <h2>Contenus et droits</h2>
        <p>
          Le logo Campus Boost a été fourni dans le dossier du projet. Les
          droits et autorisations de diffusion des contenus définitifs,
          notamment photos, vidéos et témoignages, devront être confirmés par
          l’équipe avant publication.
        </p>
        <p>
          Les données institutionnelles sont accompagnées de leurs{" "}
          <Link href="/sources">sources et limites</Link>. Les estimations,
          exemples et propositions pédagogiques sont explicitement identifiés.
        </p>
      </section>
      <section>
        <h2>Accessibilité</h2>
        <p>
          Le site propose une navigation au clavier, des états de sélection
          annoncés, un menu mobile et des alternatives statiques aux animations
          3D. La préférence de réduction des animations du navigateur est
          respectée. Aucune certification de conformité n’est revendiquée.
        </p>
      </section>
    </main>
  );
}
