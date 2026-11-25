"use client";

import Image from "next/image";
import { Play, Film, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { Eyebrow } from "@/components/ui";

export function VideoSection() {
  const [failed, setFailed] = useState(false);
  const hasVideo = Boolean(siteConfig.video.src && !failed);
  return (
    <section id="video" className="video-section">
      <div className="container video-layout">
        <div className="video-copy">
          <Eyebrow>LE PROJET EN MOUVEMENT</Eyebrow>
          <h2>
            Une ambition
            <br />
            <em>à partager.</em>
          </h2>
          <p>
            Une future vidéo pour raconter notre démarche, présenter l’UFR et
            donner la parole à celles et ceux qui la font vivre.
          </p>
          <a className="text-link" href="/demo">
            En attendant, explorez la démo{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="video-frame">
          {hasVideo ? (
            <video
              controls
              preload="metadata"
              poster={siteConfig.video.poster}
              onError={() => setFailed(true)}
              aria-label={siteConfig.video.title}
            >
              <source src={siteConfig.video.src!} type="video/mp4" />
              {siteConfig.video.subtitles && (
                <track
                  kind="captions"
                  src={siteConfig.video.subtitles}
                  srcLang="fr"
                  label="Français"
                  default
                />
              )}
              Votre navigateur ne prend pas en charge la vidéo.
            </video>
          ) : (
            <>
              <Image
                src={siteConfig.video.poster}
                alt=""
                fill
                sizes="(max-width: 800px) 100vw, 60vw"
              />
              <div className="video-placeholder">
                <span className="video-play" aria-hidden="true">
                  <Play size={26} />
                </span>
                <h3>La suite s’écrit ici.</h3>
                <p>
                  {failed
                    ? "La vidéo est momentanément indisponible."
                    : "Vidéo Campus Boost à venir"}
                </p>
                <span>
                  <Film size={13} aria-hidden="true" />{" "}
                  {failed
                    ? "Vous pouvez explorer la démonstration interactive."
                    : "Aucune vidéo disponible dans cette démonstration."}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
