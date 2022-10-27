import { atom } from "jotai";
import { Category } from "../types";

export const categories = [
  "UI",
  "UX",
  "Enhancement",
  "Bug",
  "Feature",
] as const;

export const statuses = ["Planned", "In-Progress", "Live", "None"] as const;

export const cat = atom<Category | "All">("All");
