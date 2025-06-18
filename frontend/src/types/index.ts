// frontend/src/types/index.ts

/** Enum zgodny z backendem */
export enum Applicability {
  MZ = "MZ",
  WP = "WP",
  NZ = "NZ",
}

/** Proces zwracany z API */
export interface Process {
  id: number;
  name: string;
  category_id: number;
  applicability: Applicability;
}
