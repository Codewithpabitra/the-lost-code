
import { ArrowRight, Sparkles, X } from "lucide-react";
import PixelButton from "../ui/PixelButton";

interface MissionSuccessModalProps {
  isOpen: boolean;
  alreadyCompleted: boolean;
  xpAwarded: number;
  onClose: () => void;
  onContinue: () => void;
}

export default function MissionSuccessModal({
  isOpen,
  alreadyCompleted,
  xpAwarded,
  onClose,
  onContinue,
}: MissionSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-success-title"
        className="relative w-full max-w-sm overflow-hidden border-2 border-blue-400/30 bg-white text-center shadow-2xl shadow-blue-500/20 dark:bg-[#101426]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 z-10 border border-white/20 bg-black/50 p-2 text-white transition hover:bg-black/80"
        >
          <X size={17} />
        </button>

        {/* Pixel art */}
        <div className="relative overflow-hidden bg-[#080F2B]">
          <img
            src="/images/mission-victory.png"
            alt="Pixel art robot celebrating beside a treasure chest"
            className="h-48 w-full object-cover object-center sm:h-52"
          />

          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#101426] to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-2">
          <p className="font-pixel text-[9px] tracking-[0.2em] text-blue-500 dark:text-blue-400">
            QUEST COMPLETE
          </p>

          <h2
            id="mission-success-title"
            className="mt-3 font-pixel text-base text-neutral-900 dark:text-white"
          >
            {alreadyCompleted ? "CLEARED AGAIN!" : "LEVEL CLEARED!"}
          </h2>

          {/* XP reward */}
          <div className="mx-auto mt-5 inline-flex items-center gap-2 border-2 border-amber-400/30 bg-amber-400/10 px-5 py-3">
            <Sparkles size={18} className="text-amber-500" />

            <span className="font-pixel text-sm text-amber-500">
              +{alreadyCompleted ? 0 : xpAwarded} XP
            </span>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-4">
            <PixelButton
              variant="primary"
              size="lg"
              className="w-full"
              icon={<ArrowRight size={15} />}
              onClick={onContinue}
            >
              CONTINUE ADVENTURE
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="md"
              className="w-full"
              onClick={onClose}
            >
              STAY HERE
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}