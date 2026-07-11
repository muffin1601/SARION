"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Copy, Share2 } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { links, comingSoon, contactEmail } from "@/components/links/links-data";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function LinksPageClient() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  async function handleShare() {
    const shareData = {
      title: "SARION | Links",
      text: "Official links for SARION.",
      url: "https://trysarion.com/links",
    };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ambient gradient glow background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-xl flex-col items-center px-5 pb-20 pt-16 sm:pt-24"
      >
        {/* Hero */}
        <motion.div variants={item} className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.04] shadow-[0_0_40px_-8px_rgba(59,130,246,0.5)] backdrop-blur-sm">
            <Logo variant="icon" priority className="h-9 w-9" />
          </div>
          <h1 className="mt-5 bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-heading font-bold tracking-tight text-transparent sm:text-4xl">
            SARION
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-transparent">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
              AI &bull; Software &bull; Automation &bull; Productivity
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-sm text-balance text-sm leading-relaxed text-white/55">
            Helping professionals discover AI tools, software, automation workflows and productivity systems.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-95"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-cyan-300" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-95"
            >
              {shared ? <Check className="h-3.5 w-3.5 text-cyan-300" /> : <Share2 className="h-3.5 w-3.5" />}
              {shared ? "Link copied" : "Share profile"}
            </button>
          </div>
        </motion.div>

        {/* Link buttons */}
        <div className="mt-10 flex w-full flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                variants={item}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-4.5"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-cyan-400/10 group-hover:opacity-100"
                />
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-white/80 transition-colors group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="relative flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-semibold text-white">{link.title}</span>
                  <span className="truncate text-[13px] text-white/45">{link.description}</span>
                </span>
                <ArrowUpRight className="relative h-4.5 w-4.5 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </motion.a>
            );
          })}
        </div>

        {/* Coming soon */}
        <motion.div variants={item} className="mt-14 w-full">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Coming Soon
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {comingSoon.map((entry, i) => (
              <motion.div
                key={entry.id}
                variants={item}
                custom={i}
                className={cn(
                  "relative flex min-h-[92px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.04]",
                  comingSoon.length % 3 === 1 && i === comingSoon.length - 1 && "col-span-2 sm:col-span-1",
                )}
              >
                <span className="w-fit rounded-full border border-blue-400/25 bg-blue-400/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-blue-300">
                  Coming Soon
                </span>
                <span className="text-sm font-medium leading-snug text-white/80">{entry.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer variants={item} className="mt-16 flex flex-col items-center gap-3">
          <Logo variant="icon" className="h-7 w-7 opacity-70" />
          <p className="text-sm font-medium text-white/60">Made with ❤️ by SARION</p>
          <p className="text-xs text-white/30">&copy; 2026 SARION</p>
        </motion.footer>
      </motion.main>
    </div>
  );
}
