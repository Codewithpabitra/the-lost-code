import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import ContinueJourney from "../components/dashboard/ContinueJourney";
import MissionList from "../components/dashboard/MissionList";

import { useAuth } from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { progress, loading, error, refreshProgress } = useProgress();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950 dark:bg-[#09090e] dark:text-white">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <DashboardHeader />

        <div className="mx-auto max-w-375 space-y-9 p-5 sm:p-7 lg:p-10">
          {/* Player Account */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-neutral-200 bg-white p-4 shadow-[0_4px_0_#d4d4d4] dark:border-white/10 dark:bg-[#11131a] dark:shadow-[0_4px_0_#20232d]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-blue-500/30 bg-blue-500/10 text-blue-500">
                <UserRound size={21} />
              </div>

              <div className="min-w-0">
                <p className="font-pixel text-[9px] tracking-wider text-blue-500 dark:text-blue-400">
                  CURRENT PLAYER
                </p>

                <p className="mt-1 truncate text-sm font-bold text-neutral-900 dark:text-white">
                  {user?.username || "Player"}
                </p>

                <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 border-2 border-red-500/20 bg-red-500/5 px-4 py-2.5 font-pixel text-[9px] text-red-500 shadow-[0_3px_0_rgba(239,68,68,0.2)] transition-all hover:border-red-500/50 hover:bg-red-500/10 active:translate-y-[2px] active:shadow-none"
            >
              <LogOut size={15} />
              LOG OUT
            </button>
          </div>

          <WelcomeSection />

          <StatsGrid progress={progress} loading={loading} />

          <ContinueJourney progress={progress} loading={loading} />

          <MissionList
            progress={progress}
            loading={loading}
            error={error}
            refreshProgress={refreshProgress}
          />
        </div>
      </main>
    </div>
  );
}
