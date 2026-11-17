import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import PixelButton from "../ui/PixelButton";

interface DeleteConfirmationModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  open,
  title = "Reset privacy preferences?",
  description = "Your saved cookie preferences will be deleted. The privacy dialog will appear again the next time you reload the application.",
  confirmLabel = "RESET PREFERENCES",
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto p-4">
            <motion.section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-description"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="my-auto w-full max-w-md overflow-hidden border border-red-500/30 bg-white shadow-2xl dark:bg-[#111116]"
            >
              <div className="h-1 bg-linear-to-r from-red-700 via-red-500 to-orange-500" />

              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-500">
                    <AlertTriangle size={23} />
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close confirmation"
                    className="text-neutral-400 transition hover:text-red-500"
                  >
                    <X size={19} />
                  </button>
                </div>

                <p className="mt-5 font-pixel text-[8px] tracking-widest text-red-500">
                  DANGER / CONFIRMATION REQUIRED
                </p>

                <h2
                  id="delete-modal-title"
                  className="mt-2 text-2xl font-black text-neutral-900 dark:text-white"
                >
                  {title}
                </h2>

                <p
                  id="delete-modal-description"
                  className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
                >
                  {description}
                </p>

                <div className="mt-5 border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-xs leading-relaxed text-red-600 dark:text-red-400">
                    This action cannot be automatically undone.
                  </p>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <PixelButton variant="secondary" size="md" onClick={onClose}>
                    CANCEL
                  </PixelButton>

                  <PixelButton
                    variant="danger"
                    size="md"
                    icon={<Trash2 size={15} />}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </PixelButton>
                </div>
              </div>
            </motion.section>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
