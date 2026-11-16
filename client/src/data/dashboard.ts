import {
  LayoutDashboard,
  Map,
  BookOpen,
  Trophy,
  Settings,
  Flame,
  Zap,
  Star,
} from "lucide-react";

export const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "World Map", path: "/world", icon: Map },
  { label: "Missions", path: "/missions", icon: BookOpen },
  { label: "Achievements", path: "/achievements", icon: Trophy },
];

export const stats = [
  { label: "PLAYER LEVEL", value: "01", detail: "Novice Coder", icon: Star },
  { label: "TOTAL XP", value: "240", detail: "XP earned", icon: Zap },
  { label: "DAY STREAK", value: "03", detail: "Days in a row", icon: Flame },
  { label: "MISSIONS", value: "04/20", detail: "Missions cleared", icon: Trophy },
];

export const missions = [
  {
    title: "The First Signal",
    description: "Discover the mysterious JavaScript transmission.",
    progress: 100,
    status: "Completed",
    xp: 50,
  },
  {
    title: "Awakening the Console",
    description: "Learn variables and send your first signal.",
    progress: 60,
    status: "In Progress",
    xp: 100,
  },
  {
    title: "The Forgotten Syntax",
    description: "Restore the broken logic of the ancient system.",
    progress: 0,
    status: "Locked",
    xp: 150,
  },
];