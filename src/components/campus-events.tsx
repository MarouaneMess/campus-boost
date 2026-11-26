"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import {
  campusEvents,
  eventStatusLabels,
  getEventStatus,
  type EventStatus,
} from "@/data/events";
import { SectionHeading, ExternalLink } from "@/components/ui";

export function CampusEvents() {
  const [filter, setFilter] = useState<EventStatus | "all">("all");
  const [allVisible, setAllVisible] = useState(false);
  const [today, setToday] = useState("2026-11-18");
  useEffect(() => {
    const update = () =>
      setToday(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "Europe/Paris",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date()),
      );
    const timer = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);
  const filtered = campusEvents.filter(
    (item) => filter === "all" || getEventStatus(item, today) === filter,
  );
  const visible = allVisible ? filtered : filtered.slice(0, 3);
  return (
    <section
      id="terrain"
      className="section events-section"
      aria-labelledby="events-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="CAMPUSBOOST SUR LE TERRAIN"
          id="events-title"
          title={
            <>
              Sortir du campus.
              <br />
              <em>Créer la rencontre.</em>
            </>
          }
          description="Des formats où votre entreprise peut partager un métier, proposer un défi ou rencontrer les étudiants. Une date annoncée ne confirme pas la présence de CampusBoost."
        />
        <div
          className="filter-tabs wrap-filters"
          role="group"
          aria-label="Filtrer les événements"
        >
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            aria-pressed={filter === "all"}
            onClick={() => {
              setFilter("all");
              setAllVisible(false);
            }}
          >
            Tous
          </button>
          {(["envisaged", "confirmed", "past"] as const).map((status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? "active" : ""}
              aria-pressed={filter === status}
              onClick={() => {
                setFilter(status);
                setAllVisible(false);
              }}
            >
              {eventStatusLabels[status]}s
            </button>
          ))}
        </div>
        <p className="filter-result" role="status">
          {filtered.length} rendez-vous ou formats proposés
        </p>
        {visible.length ? (
          <div className="events-grid">
            {visible.map((event) => {
              const status = getEventStatus(event, today);
              return (
                <article className="event-card" key={event.id}>
                  <div className="event-card-top">
                    <span className={`status-label status-${status}`}>
                      {eventStatusLabels[status]}
                    </span>
                    <CalendarDays size={21} aria-hidden="true" />
                  </div>
                  <p className="small-label">{event.category}</p>
                  <h3>{event.name}</h3>
                  <p className="event-date">{event.dateLabel}</p>
                  <p className="event-location">
                    <MapPin size={15} aria-hidden="true" />
                    {event.location}
                  </p>
                  <p>{event.reason}</p>
                  <details>
                    <summary>
                      Ce que votre entreprise peut apporter{" "}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </summary>
                    <dl>
                      <dt>Pour qui ?</dt>
                      <dd>{event.audience}</dd>
                      <dt>Profils invités</dt>
                      <dd>{event.companyProfiles}</dd>
                      <dt>Une manière de participer</dt>
                      <dd>{event.action}</dd>
                    </dl>
                  </details>
                  {event.source && (
                    <ExternalLink href={event.source.url}>
                      {event.source.label}
                    </ExternalLink>
                  )}
                  <p className="method-note">
                    {event.participation === "confirmed" &&
                    event.confirmationSource ? (
                      <ExternalLink href={event.confirmationSource}>
                        Participation documentée
                      </ExternalLink>
                    ) : status === "past" ? (
                      "Événement terminé · aucune présence de CampusBoost attestée."
                    ) : (
                      "Participation CampusBoost non confirmée."
                    )}
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <CalendarDays size={30} aria-hidden="true" />
            <h3>
              {filter === "confirmed"
                ? "Aucune participation confirmée pour le moment."
                : "Aucun événement passé à présenter."}
            </h3>
            <p>
              Les idées restent accessibles dans la sélection « Envisagés ».
            </p>
          </div>
        )}
        {filtered.length > 3 && (
          <button
            type="button"
            className="button button-outline show-more"
            aria-expanded={allVisible}
            onClick={() => setAllVisible(!allVisible)}
          >
            {allVisible
              ? "Réduire la liste"
              : `Explorer les ${filtered.length} pistes`}
            <ArrowDown size={16} aria-hidden="true" />
          </button>
        )}
        <div className="section-endnote">
          <p>
            Vous souhaitez rencontrer l’UFR ou proposer un échange avec vos
            équipes ? Contactez-nous pour choisir le format adapté.
          </p>
          <a href="#contact" className="text-link">
            Contacter l’UFR <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
