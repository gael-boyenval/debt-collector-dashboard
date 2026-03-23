export type AdoptionResult = {
  id: string;
  name: string;
  isAdopted: boolean;
  totalScore: number;
  totalDebt: number;
  adoptionRate: number;
};

export type AdoptionSnapshot = {
  date: number;
  label: string;
  adoptedCount: number;
  totalCount: number;
  adoptionRate: number;
  adoptedNames: string[];
  newlyAdopted: string[];
  lost: string[];
};
