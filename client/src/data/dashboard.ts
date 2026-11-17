import { LayoutDashboard, Map, BookOpen, Trophy } from "lucide-react";
import { apiRequest } from "../lib/api";

export const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "World Map", path: "/world", icon: Map },
  { label: "Missions", path: "/missions", icon: BookOpen },
  { label: "Achievements", path: "/achievements", icon: Trophy },
];

export interface DashboardProgress {
  xp: number;
  completedChapterIds: string[];
  unlockedChapterIds: string[];
  totalCompletedMissions: number;
  totalChapters: number;
}

interface DashboardProgressResponse {
  success: boolean;
  progress: DashboardProgress;
}

export async function getDashboardProgress(): Promise<DashboardProgress> {
  const response = await apiRequest<DashboardProgressResponse>("/progress/me");

  if (!response.success) {
    throw new Error("Unable to load dashboard progress");
  }

  return response.progress;
}
