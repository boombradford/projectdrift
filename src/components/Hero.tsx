 "use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

const CTA = ({ label, variant = "primary" }: { label: string; variant?: "primary" | "secondary" }) => (
  <button
    type="button"
    className={clsx(
      "px-5 py-3 text-[12px] font-semibold rounded-lg transition-colors",
      variant === "primary"
        ? "bg-[#f06c5b] text-white hover:bg-[#ff7d6d]"
        : "border border-white/[0.12] text-white/80 hover:border-[#f06c5b]/50 hover:text-white"
    )}
  >
    {label}
  </button>
);

const DriftLines = ({ reduced }: { reduced: boolean }) => (
  <svg viewBox="0 0 1200 500" className="w-full h-full">
    <defs>
      <linearGradient id="driftLine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f06c5b" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7ea6c9" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <g fill="none" strokeLinecap="round">
      <motion.path
        d="M80 340 C260 220, 420 420, 620 300 C780 200, 940 240, 1120 120"
        stroke="url(#driftLine)"
        strokeWidth="10"
        initial={{ opacity: 0.4 }}
        animate={reduced ? { opacity: 0.4 } : { opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M20 400 C220 300, 460 520, 720 360 C920 240, 1080 320, 1180 200"
        stroke="#7ea6c9"
        strokeWidth="6"
        initial={{ opacity: 0.2 }}
        animate={reduced ? { opacity: 0.2 } : { opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  </svg>
);

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#060912]">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(126,166,201,0.18), transparent 55%) , radial-gradient(circle at 80% 20%, rgba(240,108,91,0.16), transparent 55%), linear-gradient(180deg, rgba(4,6,12,0.2), rgba(2,4,10,0.9))",
        }}
        initial={{ opacity: 0.6 }}
        animate={reduced ? { opacity: 0.6 } : { opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -inset-10 opacity-40"
        style={{ willChange: "transform" }}
        animate={reduced ? { x: 0, y: 0 } : { x: [0, -16, 0], y: [0, 10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <DriftLines reduced={reduced} />
      </motion.div>

      <div className="relative z-10 px-6 py-12 md:px-10 md:py-14">
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/40">Drift</div>
        <h1 className="mt-4 font-monda text-4xl md:text-[3.4rem] font-semibold tracking-tight text-[#f8fafc] leading-[1.05]">
          DRIFT
          <span className="block text-[#7ea6c9]">A signal layer for real change.</span>
        </h1>
        <p className="mt-5 text-[16px] text-[#9fb2c7] max-w-xl leading-relaxed">
          Drift compares your latest scan to the previous baseline and isolates the shifts that matter most in performance,
          SEO, and conversion clarity.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <CTA label="Book a consult" />
          <CTA label="Learn more" variant="secondary" />
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.2em] text-white/50">
          <div>Evidence-backed</div>
          <div>PSI + CrUX</div>
          <div>Baseline ready</div>
        </div>
      </div>
    </section>
  );
}
