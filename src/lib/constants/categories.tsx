import {
  Zap,
  Flame,
  Droplets,
  Wifi,
  TrendingUp,
  Star,
  BookOpen,
  Rss,
} from "lucide-react";
import React from "react";

/** Color palette for each blog category */
export const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Electricity Bills": { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A", dot: "#F59E0B" },
  "Gas Bills":         { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA", dot: "#EF4444" },
  "Water Bills":       { bg: "#DBEAFE", text: "#1E40AF", border: "#BFDBFE", dot: "#5A9FA2" },
  "Internet Bills":    { bg: "#E0E7FF", text: "#3730A3", border: "#C7D2FE", dot: "#6366F1" },
  "Bill Payment":      { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0", dot: "#10B981" },
  "Energy Saving":     { bg: "#ECFDF5", text: "#047857", border: "#A7F3D0", dot: "#059669" },
  "Guides & Tips":     { bg: "#ECFEFF", text: "#0E7490", border: "#A5F3FC", dot: "#3E8B8E" },
  "Company News":      { bg: "#F3E8FF", text: "#6B21A8", border: "#E9D5FF", dot: "#9333EA" },
};

/** Icons for each blog category */
export const categoryIcons: Record<string, React.ReactNode> = {
  "Electricity Bills": <Zap className="w-3.5 h-3.5" />,
  "Gas Bills":         <Flame className="w-3.5 h-3.5" />,
  "Water Bills":       <Droplets className="w-3.5 h-3.5" />,
  "Internet Bills":    <Wifi className="w-3.5 h-3.5" />,
  "Bill Payment":      <TrendingUp className="w-3.5 h-3.5" />,
  "Energy Saving":     <Star className="w-3.5 h-3.5" />,
  "Guides & Tips":     <BookOpen className="w-3.5 h-3.5" />,
  "Company News":      <Rss className="w-3.5 h-3.5" />,
};
