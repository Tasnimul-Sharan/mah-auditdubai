"use client";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusModal({ show, type, message, onClose }) {
  const isSuccess = type === "success";

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
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="relative w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary via-primary_light to-white opacity-25" />

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border_color bg-white/80 text-secondary_two shadow-sm backdrop-blur transition hover:bg-secondary hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="relative z-10 px-8 pb-8 pt-10 text-center">
              <motion.div
                initial={{ scale: 0.75, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border shadow-xl ${
                  isSuccess
                    ? "border-primary/30 bg-gradient-to-br from-primary to-primary_light text-white shadow-primary/30"
                    : "border-red-200 bg-gradient-to-br from-red-500 to-red-400 text-white shadow-red-200"
                }`}
              >
                {isSuccess ? (
                  <FaCheckCircle size={42} />
                ) : (
                  <FaTimesCircle size={42} />
                )}
              </motion.div>

              <span
                className={`mb-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                  isSuccess
                    ? "bg-primary/10 text-primary"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {isSuccess ? "Completed" : "Failed"}
              </span>

              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-soft_black">
                {isSuccess ? "Success!" : "Action Failed"}
              </h2>

              <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-secondary_two/75">
                {message}
              </p>

              <button
                type="button"
                onClick={onClose}
                className={`group relative w-full overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                  isSuccess
                    ? "bg-secondary shadow-secondary/25 hover:bg-secondary_two"
                    : "bg-red-500 shadow-red-200 hover:bg-red-600"
                }`}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {isSuccess ? "Continue" : "Try Again"}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
