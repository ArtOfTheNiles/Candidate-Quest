import Candidate from "../interfaces/Candidate.interface";

const STORAGE_KEY = "saved_candidates";

export const saveCandidatesToLocalStorage = (candidates: Candidate[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

export const loadCandidatesFromLocalStorage = (): Candidate[] => {
  const candidatesJSON = localStorage.getItem(STORAGE_KEY);
  if (candidatesJSON) {
    return JSON.parse(candidatesJSON) as Candidate[];
  }
  return [];
};

export default { saveCandidatesToLocalStorage, loadCandidatesFromLocalStorage };