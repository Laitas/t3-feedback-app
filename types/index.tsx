import { Comment, Reply } from "@prisma/client";
import { categories, statuses } from "../src/constants";

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
export type Status = typeof statuses[number];

interface Repl extends Reply {
  author: Comments["author"];
}

export interface Comments extends Comment {
  author: {
    id: string;
    username: string | null;
    name: string | null;
    image: string | null;
  };
  replies?: Repl[];
}
