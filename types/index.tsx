export interface Button {
  onClick: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  children: string;
}
