import { Zap, Flame, Droplets, Wifi, MoreHorizontal } from "lucide-react";
import { createElement } from "react";

/** Current step of the bill-check wizard */
export type Step = "company" | "reference" | "result";

/** Icon map for bill types, keyed by slug */
export const billTypeIcons: Record<string, React.ReactNode> = {
  electricity: createElement(Zap, { className: "w-5 h-5", strokeWidth: 2.5 }),
  gas: createElement(Flame, { className: "w-5 h-5", strokeWidth: 2.5 }),
  water: createElement(Droplets, { className: "w-5 h-5", strokeWidth: 2.5 }),
  internet: createElement(Wifi, { className: "w-5 h-5", strokeWidth: 2.5 }),
  other: createElement(MoreHorizontal, { className: "w-5 h-5", strokeWidth: 2.5 }),
};
