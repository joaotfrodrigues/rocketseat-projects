import type { LucideIcon } from "lucide-react";

declare global {
  interface Button {
    Icon?: LucideIcon | null
    text?: string
    iconAlt?: string
    size?: "big" | "small"
    onClick?: () => any
  }
}
