"use client"

import { memo, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils"

type SuccessToastProps = {
  message: string
  isVisible: boolean
  onClose: () => void
}

export const SuccessToast = memo(function SuccessToast({
  message,
  isVisible,
  onClose,
}: SuccessToastProps) {
  useEffect(() => {
    if (!isVisible) return
    const timer = window.setTimeout(onClose, 4500)
    return () => window.clearTimeout(timer)
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-4 z-[120] flex max-w-none items-start gap-3 rounded-2xl",
            "border border-emerald-500/25 bg-[#0d1510]/95 p-4 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.45)]",
            "backdrop-blur-xl sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-sm",
          )}
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">Success</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-300">{message}</p>
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
