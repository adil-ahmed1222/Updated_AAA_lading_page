"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "lenis/react"
import { Menu, X } from "lucide-react"
import { NAV_LINKS } from "@/lib/landing-data"
import { GlowButton } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolledRef = useRef(false)
  const lenis = useLenis()

  useLenis(({ scroll }) => {
    const next = scroll > 20
    if (scrolledRef.current === next) return
    scrolledRef.current = next
    setScrolled(next)
  })

  useEffect(() => {
    if (!lenis) return
    if (mobileOpen) {
      lenis.stop()
      document.body.style.overflow = "hidden"
    } else {
      lenis.start()
      document.body.style.overflow = ""
    }
    return () => {
      lenis.start()
      document.body.style.overflow = ""
    }
  }, [mobileOpen, lenis])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300 transform-gpu",
          scrolled
            ? "border-b border-white/10 bg-[#030303]/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <a href="#home" className="group flex min-w-0 items-center gap-2.5 md:gap-3 lg:shrink-0">
            <img
              src="/brand/nv-logo-updated.png"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="size-9 shrink-0 object-contain md:size-10"
            />
            <div className="flex min-w-0 flex-col lg:min-w-max">
              <span className="truncate font-brand text-base font-bold tracking-tight text-white min-[380px]:text-lg md:text-xl lg:overflow-visible lg:text-clip">
                NeuralVarsity
              </span>
              <span className="truncate text-[9px] tracking-[0.14em] text-zinc-300 uppercase min-[380px]:text-[10px] min-[380px]:tracking-widest md:text-xs lg:overflow-visible lg:text-clip">
                AI Agents & Automation
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-4 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-orange-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <GlowButton variant="ghost" modalAction="enroll" className="!px-5 !py-2.5 !text-sm">
              Book Free Masterclass
            </GlowButton>
            <GlowButton variant="primary" modalAction="enroll" className="!px-5 !py-2.5 !text-sm">
              Enroll Now
            </GlowButton>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-300 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex h-full flex-col overflow-y-auto px-6 pt-[calc(6rem+env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-zinc-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <GlowButton variant="ghost" modalAction="enroll" onClick={() => setMobileOpen(false)}>
                  Book Free Masterclass
                </GlowButton>
                <GlowButton
                  variant="primary"
                  modalAction="enroll"
                  onClick={() => setMobileOpen(false)}
                >
                  Enroll Now
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
