"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Info } from "lucide-react";
import { equipment } from "@/data/impact";
import {
  formatEuro,
  MAX_AMOUNT,
  normalizeAmount,
  simulateEquipment,
} from "@/lib/simulator";
import { EquipmentVisual } from "./equipment-visual";

export function ImpactSimulator({
  compact = false,
  initialAmount = 2500,
}: {
  compact?: boolean;
  initialAmount?: number;
}) {
  const [amount, setAmount] = useState(normalizeAmount(initialAmount));
  const [rawInput, setRawInput] = useState(
    String(normalizeAmount(initialAmount)),
  );
  const [equipmentId, setEquipmentId] = useState("workstation");
  const id = useId();
  const current = equipment.find((item) => item.id === equipmentId)!;
  const result = simulateEquipment(amount, current);
  const updateAmount = (value: number) => {
    const next = normalizeAmount(value);
    setAmount(next);
    setRawInput(String(next));
  };

  return (
    <div className={`impact-simulator ${compact ? "simulator-compact" : ""}`}>
      <div className="simulator-controls">
        <p className="eyebrow">
          <span /> LE SIMULATEUR D’IMPACT
        </p>
        <h3>
          Un montant.
          <br />
          <em>Des possibilités concrètes.</em>
        </h3>
        <p>Donnez une échelle à votre contribution hypothétique.</p>
        <label htmlFor={`${id}-amount`} className="input-label">
          Votre budget hypothétique
        </label>
        <div className="amount-input">
          <input
            id={`${id}-amount`}
            type="number"
            inputMode="numeric"
            min={0}
            max={MAX_AMOUNT}
            step={1}
            value={rawInput}
            aria-describedby={`${id}-disclaimer ${id}-range-note`}
            onChange={(event) => {
              setRawInput(event.target.value);
              setAmount(normalizeAmount(Number(event.target.value)));
            }}
            onBlur={() => updateAmount(amount)}
          />
          <span>€</span>
        </div>
        <p className="small muted" id={`${id}-range-note`}>
          De 0 à 100 000 €. Les valeurs hors limites sont ajustées.
        </p>
        <div
          className="amount-presets"
          role="group"
          aria-label="Montants suggérés"
        >
          {[500, 1000, 2500, 5000, 10000].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={amount === value}
              className={amount === value ? "active" : ""}
              onClick={() => updateAmount(value)}
            >
              {formatEuro(value)}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor={`${id}-range`}>
          Ajuster le budget entre 0 et 10 000 euros
        </label>
        <input
          id={`${id}-range`}
          className="amount-range"
          type="range"
          min={0}
          max={10000}
          step={100}
          value={Math.min(amount, 10000)}
          aria-valuetext={formatEuro(Math.min(amount, 10000))}
          onChange={(event) => updateAmount(Number(event.target.value))}
        />
        <div className="range-labels">
          <span>0 €</span>
          <span>10 000 €</span>
        </div>
        <div className="simulator-note" id={`${id}-disclaimer`}>
          <Info size={16} aria-hidden="true" />
          <p>
            Estimations illustratives, sans devis. Ce budget ne correspond pas
            nécessairement à votre solde disponible. L’affectation ne réserve
            aucun équipement : l’utilisation réelle des fonds relève de
            l’établissement.
          </p>
        </div>
      </div>
      <div className="simulator-result">
        <div className="result-topline">
          <span>UNE ÉQUIVALENCE POSSIBLE</span>
          <span className="mini-pill">Illustration</span>
        </div>
        <label className="sr-only" htmlFor={`${id}-equipment`}>
          Type d’équipement à simuler
        </label>
        <select
          id={`${id}-equipment`}
          value={equipmentId}
          onChange={(event) => setEquipmentId(event.target.value)}
        >
          {equipment.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <EquipmentVisual kind={equipmentId} />
        <div className="equipment-count" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.strong
              key={`${equipmentId}-${result.quantity}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              {result.quantity}
            </motion.strong>
          </AnimatePresence>
          <div>
            <h4>{result.quantity === 1 ? current.name : current.pluralName}</h4>
            <p>à {formatEuro(current.unitPrice)} l’unité estimée</p>
          </div>
        </div>
        <p className="equipment-description">
          {result.quantity === 0
            ? "Ce budget est inférieur au coût estimatif d’une unité. Essayez un autre équipement ou ajustez le montant."
            : current.description}
        </p>
        <div className="remaining-budget">
          <span>Reste théorique de cette simulation</span>
          <strong>{formatEuro(result.remainder)}</strong>
        </div>
        <div
          className="budget-visual"
          aria-label={`Répartition illustrative : ${formatEuro(amount - result.remainder)} d’équipements et ${formatEuro(result.remainder)} restants`}
        >
          <div className="budget-bar" aria-hidden="true">
            <span
              style={{
                width: `${amount > 0 ? ((amount - result.remainder) / amount) * 100 : 0}%`,
              }}
            />
          </div>
          <div>
            <span>
              Équivalents matériels{" "}
              <strong>{formatEuro(amount - result.remainder)}</strong>
            </span>
            <span>
              Reste théorique <strong>{formatEuro(result.remainder)}</strong>
            </span>
          </div>
        </div>
        <p className="small muted">
          Chaque équipement constitue une alternative indépendante. Les
          quantités ne s’additionnent pas.
        </p>
        {!compact && (
          <a className="text-link" href="#soutenir">
            Passer de l’idée à l’engagement{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
