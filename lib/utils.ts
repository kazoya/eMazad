import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jod(value: number) {
  return new Intl.NumberFormat("ar-JO", { maximumFractionDigits: 0 }).format(value) + " د.أ";
}

export function num(value: number) {
  return new Intl.NumberFormat("ar-JO").format(value);
}
