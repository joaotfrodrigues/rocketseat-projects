import type { LucideIcon } from "lucide-react";

declare global {
  interface Button {
    Icon: LucideIcon
    text?: string
    iconAlt?: string
    size?: "big" | "small"
    onClick?: () => any
  }
}
