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
      <motion.path
        d="M40 260 C200 180, 380 320, 560 220 C760 110, 980 220, 1160 160"
        stroke="#f06c5b"
        strokeWidth="4"
        initial={{ opacity: 0.15 }}
        animate={reduced ? { opacity: 0.15 } : { opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  </svg>
);

const DriftParticles = ({ reduced }: { reduced: boolean }) => {
  const particles = [
    { cx: 120, cy: 120, r: 2.5, dur: 12 },
    { cx: 220, cy: 210, r: 3.5, dur: 16 },
    { cx: 360, cy: 160, r: 2.8, dur: 14 },
    { cx: 480, cy: 260, r: 3.2, dur: 18 },
    { cx: 620, cy: 140, r: 2.4, dur: 15 },
    { cx: 760, cy: 230, r: 3.1, dur: 17 },
    { cx: 900, cy: 170, r: 2.6, dur: 13 },
    { cx: 1040, cy: 260, r: 3.4, dur: 19 },
    { cx: 980, cy: 90, r: 2.2, dur: 14 },
    { cx: 540, cy: 90, r: 2.3, dur: 12 },
  ];

  return (
    <svg viewBox="0 0 1200 500" className="w-full h-full">
      <g>
        {particles.map((p, idx) => (
          <motion.circle
            key={idx}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#7ea6c9"
            initial={{ opacity: 0.2 }}
            animate={reduced ? { opacity: 0.2 } : { opacity: [0.15, 0.5, 0.15], cy: [p.cy, p.cy - 18, p.cy] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </g>
    </svg>
  );
};

const DriftOrbs = ({ reduced }: { reduced: boolean }) => {
  const orbs = [
    { size: 260, left: "6%", top: "65%", color: "rgba(126,166,201,0.18)", dur: 26 },
    { size: 220, left: "62%", top: "18%", color: "rgba(240,108,91,0.18)", dur: 22 },
    { size: 180, left: "78%", top: "64%", color: "rgba(126,166,201,0.14)", dur: 24 },
  ];

  return (
    <>
      {orbs.map((orb, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: orb.color,
          }}
          animate={reduced ? { opacity: 0.4 } : { opacity: [0.2, 0.55, 0.25], x: [0, 28, -18, 0], y: [0, -20, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

const DriftGrid = ({ reduced }: { reduced: boolean }) => (
  <motion.div
    className="absolute inset-0 opacity-[0.07]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
      backgroundSize: "90px 90px",
    }}
    animate={
      reduced
        ? { opacity: 0.05 }
        : { opacity: [0.03, 0.1, 0.04], backgroundPosition: ["0px 0px", "120px 90px", "0px 0px"] }
    }
    transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
  />
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
        animate={reduced ? { opacity: 0.6 } : { opacity: [0.45, 0.9, 0.55], backgroundPosition: ["0% 0%", "100% 60%", "0% 0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 60% 70%, rgba(240,108,91,0.12), transparent 55%) , radial-gradient(circle at 30% 80%, rgba(126,166,201,0.14), transparent 60%)",
        }}
        animate={reduced ? { opacity: 0.25 } : { opacity: [0.16, 0.55, 0.2], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(126,166,201,0.16), transparent 45%) , radial-gradient(circle at 15% 65%, rgba(240,108,91,0.12), transparent 50%)",
        }}
        animate={reduced ? { opacity: 0.2 } : { opacity: [0.1, 0.4, 0.12], scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <DriftOrbs reduced={reduced} />

      <DriftGrid reduced={reduced} />

      <motion.div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        animate={reduced ? { opacity: 0.06 } : { opacity: [0.05, 0.14, 0.06], backgroundPosition: ["0% 0%", "100% 120%", "0% 0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -inset-10 opacity-45"
        style={{ willChange: "transform" }}
        animate={reduced ? { x: 0, y: 0 } : { x: [0, -38, 0], y: [0, 28, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <DriftLines reduced={reduced} />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-35"
        style={{ willChange: "transform" }}
        animate={reduced ? { x: 0, y: 0 } : { x: [0, 34, 0], y: [0, -26, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <DriftParticles reduced={reduced} />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-25"
        style={{ willChange: "transform" }}
        animate={reduced ? { x: 0 } : { x: ["-14%", "12%", "-14%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 1200 500" className="w-full h-full">
          <defs>
            <linearGradient id="driftSweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="45%" stopColor="rgba(126,166,201,0.18)" />
              <stop offset="55%" stopColor="rgba(240,108,91,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <rect x="0" y="70" width="1200" height="160" fill="url(#driftSweep)" />
        </svg>
      </motion.div>

      <motion.svg
        viewBox="0 0 1200 500"
        className="absolute inset-0 opacity-40"
        initial={{ opacity: 0.2 }}
        animate={reduced ? { opacity: 0.2 } : { opacity: [0.15, 0.5, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="driftPulse" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ea6c9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f06c5b" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <motion.path
          d="M60 260 C220 140, 420 360, 640 220 C820 120, 1020 260, 1140 160"
          stroke="url(#driftPulse)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="12 18"
          animate={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: [0, -160, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="860"
          cy="120"
          r="36"
          fill="none"
          stroke="rgba(240,108,91,0.5)"
          strokeWidth="1.5"
          animate={reduced ? { r: 36 } : { r: [34, 44, 34] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div
        className="relative z-10 px-6 py-12 md:px-10 md:py-14"
        animate={reduced ? { y: 0 } : { y: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
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
      </motion.div>
    </section>
  );
}
