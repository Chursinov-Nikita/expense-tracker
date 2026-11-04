// category icons
import {
  DollarSign,
  Briefcase,
  TrendingUp,
  Gift,
  Ellipsis,
  Utensils,
  Car,
  Clapperboard,
  ShoppingCart,
  Receipt,
  HeartPulse,
  GraduationCap,
  Plane,
  type LucideIcon,
} from "lucide-react";
import type { CategoryType } from "@/generated/prisma/enums";

export const CATEGORY_ICONS = {
  salary: DollarSign,
  freelance: Briefcase,
  investment: TrendingUp,
  gift: Gift,
  food: Utensils,
  transport: Car,
  entertainment: Clapperboard,
  shopping: ShoppingCart,
  bills: Receipt,
  health: HeartPulse,
  education: GraduationCap,
  travel: Plane,
  other: Ellipsis,
} satisfies Record<string, LucideIcon>;

export type CategoryIcon = keyof typeof CATEGORY_ICONS;

export function isCategoryIcon(icon: string): icon is CategoryIcon {
  return Object.hasOwn(CATEGORY_ICONS, icon);
}

export function getCategoryIcon(icon: string): LucideIcon {
  if (isCategoryIcon(icon)) {
    return CATEGORY_ICONS[icon];
  } else {
    return CATEGORY_ICONS.other;
  }
}

// category colors
export const CATEGORY_COLORS = {
  INCOME: "#22C55E",
  EXPENSE: "#EF4444",
} satisfies Record<CategoryType, string>;
