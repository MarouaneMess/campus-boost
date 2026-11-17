import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Quote,
} from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui";

export function Stories() {
  const icons = [GraduationCap, BookOpen, BriefcaseBusiness];
  return (
    <section
      className="section stories-section"
      aria-labelledby="stories-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="LES VOIX DU CAMPUS"
          id="stories-title"
          title={
            <>
              Derrière les compétences,
              <br />
              <em>des parcours.</em>
            </>
          }
          description="Étudiants, enseignants, diplômés : trois regards que nous souhaitons faire entendre dans la suite du projet."
        />
        <div className="stories-grid">
          {testimonials.map((story, i) => {
            const Icon = icons[i % icons.length];
            const approved =
              story.status === "approved" &&
              story.consentDate &&
              story.name &&
              story.quote;
            return (
              <article className="story-card" key={story.id}>
                <div className="story-top">
                  <span className="story-avatar">
                    {approved && story.photo ? (
                      <Image
                        src={story.photo}
                        alt={story.name!}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <Icon size={23} aria-hidden="true" />
                    )}
                  </span>
                  <span>{story.role}</span>
                  <Quote size={20} aria-hidden="true" />
                </div>
                <h3>{story.title}</h3>
                {approved ? (
                  <>
                    <blockquote>{story.quote}</blockquote>
                    <p>{story.name}</p>
                    {story.video && (
                      <video
                        controls
                        preload="none"
                        src={story.video}
                        aria-label={`Témoignage de ${story.name}`}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <p>{story.description}</p>
                    <span className="story-placeholder">
                      Carte de démonstration · Témoignage à recueillir
                    </span>
                  </>
                )}
              </article>
            );
          })}
        </div>
        <p className="method-note">
          Aucun témoignage réel n’est reproduit dans cette démonstration. Les
          futurs contenus seront publiés après accord des personnes concernées.
        </p>
      </div>
    </section>
  );
}
