"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  show,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/80 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 35 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary via-primary_light to-white opacity-20" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border_color bg-white/80 text-secondary_two shadow-sm backdrop-blur transition hover:bg-secondary hover:text-white disabled:opacity-50"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 px-8 pb-8 pt-10 text-center">
              <motion.div
                initial={{ scale: 0.75, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-red-200 bg-gradient-to-br from-red-500 to-red-400 text-white shadow-xl shadow-red-200"
              >
                <AlertTriangle size={44} />
              </motion.div>

              <span className="mb-3 inline-flex rounded-full bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
                Confirmation
              </span>

              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-soft_black">
                {title}
              </h2>

              <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-secondary_two/75">
                {message}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="rounded-2xl border border-border_color bg-white px-5 py-4 text-sm font-bold text-secondary transition hover:bg-background disabled:opacity-50"
                >
                  {cancelText}
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={loading}
                  className="rounded-2xl bg-red-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
