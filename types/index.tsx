import { categories } from "../src/constants";

export interface Button {
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  children: string;
}
export interface Link {
  className?: string;
  children: string;
  href?: string;
}

export type Category = typeof categories[number];
