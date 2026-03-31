/**
 * Utilitaires de formatage pour la devise FCFA (XAF) — Anibaha Cameroun
 * À utiliser PARTOUT dans l'application. Ne jamais utiliser EUR.
 */

/**
 * Formate un montant en FCFA
 * @exemple formatFCFA(15000) → "15 000 FCFA"
 */
export const formatFCFA = (montant: number | string | undefined | null): string => {
  const valeur = Number(montant) || 0;
  return `${valeur.toLocaleString("fr-FR")} FCFA`;
};

/**
 * Formate un montant en FCFA avec le symbole abrégé
 * @exemple formatFCFACourt(15000) → "15 000 F"
 */
export const formatFCFACourt = (montant: number | string | undefined | null): string => {
  const valeur = Number(montant) || 0;
  return `${valeur.toLocaleString("fr-FR")} F`;
};

/**
 * Analyse une chaîne de prix et renvoie un nombre
 * @exemple parsePrix("15 000 FCFA") → 15000
 */
export const parsePrix = (prixStr: string): number => {
  return Number(prixStr.replace(/[^\d]/g, "")) || 0;
};

/**
 * Calcule et formate une remise en FCFA
 * @exemple remiseFCFA(20000, 15000) → "−5 000 FCFA"
 */
export const remiseFCFA = (prixOriginal: number, prixReduit: number): string => {
  const remise = prixOriginal - prixReduit;
  return `−${remise.toLocaleString("fr-FR")} FCFA`;
};

/**
 * Calcule le pourcentage de remise
 * @exemple pourcentageRemise(20000, 15000) → 25
 */
export const pourcentageRemise = (
  prixOriginal: number,
  prixReduit: number
): number => {
  if (prixOriginal === 0) return 0;
  return Math.round(((prixOriginal - prixReduit) / prixOriginal) * 100);
};

/**
 * Constante de la devise pour les métadonnées
 */
export const DEVISE = {
  code: "XAF",
  symbole: "FCFA",
  symboleAbrevie: "F",
  pays: "Cameroun",
  locale: "fr-FR",
} as const;