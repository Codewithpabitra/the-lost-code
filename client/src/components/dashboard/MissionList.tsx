import { missions } from "../../data/dashboard";
import MissionCard from "./MissionCard";

export default function MissionList() {
  return (
    <section>
      <div className="mb-6">
        <p className="font-pixel text-[9px] text-blue-500">QUEST LOG</p>
        <h2 className="mt-3 text-2xl font-bold">Your Missions</h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Complete missions to earn XP and unlock new regions.
        </p>
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <MissionCard key={mission.title} {...mission} />
        ))}
      </div>
    </section>
  );
}