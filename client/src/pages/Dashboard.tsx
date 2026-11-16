import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import ContinueJourney from "../components/dashboard/ContinueJourney";
import MissionList from "../components/dashboard/MissionList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950 dark:bg-[#09090e] dark:text-white">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <DashboardHeader />

        <div className="mx-auto max-w-375 space-y-9 p-5 sm:p-7 lg:p-10">
          <WelcomeSection />
          <StatsGrid />
          <ContinueJourney />
          <MissionList />
        </div>
      </main>
    </div>
  );
}