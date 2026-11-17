import type { Equipment } from "../types/content.ts";

export const MAX_AMOUNT = 100000;
export const formatEuro = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export function normalizeAmount(value: number): number {
  return Number.isFinite(value)
    ? Math.min(MAX_AMOUNT, Math.max(0, Math.floor(value)))
    : 0;
}

/** Chaque résultat est une alternative indépendante, jamais un panier cumulé. */
export function simulateEquipment(amount: number, item: Equipment) {
  const budget = normalizeAmount(amount);
  if (item.unitPrice <= 0)
    throw new RangeError("Le prix estimatif doit être positif.");
  const quantity = Math.floor(budget / item.unitPrice);
  return {
    quantity,
    remainder: budget - quantity * item.unitPrice,
    unitPrice: item.unitPrice,
  };
}
