"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import anime from "animejs";
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

export function Hero() {
  const reduced = useReducedMotion();
  const blueprintRef = useRef<SVGSVGElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) {
      return undefined;
    }

    const svg = blueprintRef.current;
    if (!svg) {
      return undefined;
    }

    const animations: anime.AnimeInstance[] = [];

    animations.push(
      anime({
        targets: svg.querySelectorAll(".drift-path"),
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2600,
        delay: anime.stagger(180),
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      })
    );

    animations.push(
      anime({
        targets: svg.querySelectorAll(".drift-flow"),
        strokeDashoffset: [0, -260],
        duration: 5200,
        delay: anime.stagger(220),
        easing: "linear",
        loop: true,
      })
    );

    const packets = Array.from(svg.querySelectorAll<SVGCircleElement>(".drift-packet"));
    packets.forEach((packet, index) => {
      const pathId = packet.getAttribute("data-path");
      const pathEl = pathId ? svg.querySelector<SVGPathElement>(`#${pathId}`) : null;
      if (!pathEl) {
        return;
      }

      const path = anime.path(pathEl);
      animations.push(
        anime({
          targets: packet,
          translateX: path("x"),
          translateY: path("y"),
          duration: 5200 + (index % 4) * 900,
          delay: index * 260,
          easing: "linear",
          loop: true,
        })
      );
      animations.push(
        anime({
          targets: packet,
          opacity: [0.1, 0.95, 0.18],
          duration: 1800,
          delay: 600 + index * 220,
          easing: "easeInOutSine",
          loop: true,
        })
      );
    });

    animations.push(
      anime({
        targets: svg.querySelectorAll(".drift-node"),
        scale: [1, 1.6, 1],
        opacity: [0.4, 1, 0.45],
        duration: 2800,
        delay: anime.stagger(240),
        easing: "easeInOutSine",
        loop: true,
      })
    );

    animations.push(
      anime({
        targets: svg.querySelectorAll(".drift-panel"),
        opacity: [0.18, 0.6, 0.2],
        duration: 3200,
        delay: anime.stagger(260),
        easing: "easeInOutSine",
        loop: true,
      })
    );

    animations.push(
      anime({
        targets: svg.querySelectorAll(".drift-core"),
        scale: [1, 1.14, 1],
        opacity: [0.45, 0.9, 0.5],
        duration: 3600,
        easing: "easeInOutSine",
        loop: true,
      })
    );

    if (beamRef.current) {
      animations.push(
        anime({
          targets: beamRef.current,
          translateX: ["-40%", "40%"],
          duration: 7600,
          easing: "easeInOutSine",
          direction: "alternate",
          loop: true,
        })
      );
    }

    return () => {
      animations.forEach((instance) => instance.pause());
    };
  }, [reduced]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#060912]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(126,166,201,0.18), transparent 55%) , radial-gradient(circle at 80% 20%, rgba(240,108,91,0.16), transparent 55%), linear-gradient(180deg, rgba(4,6,12,0.2), rgba(2,4,10,0.9))",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute inset-0 opacity-[0.85]">
        <svg ref={blueprintRef} viewBox="0 0 1200 520" className="h-full w-full">
          <defs>
            <linearGradient id="driftLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7ea6c9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f06c5b" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="driftNode" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7ea6c9" stopOpacity="0.3" />
            </radialGradient>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1200" height="520" fill="url(#grid)" opacity="0.35" />

          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              className="drift-path"
              id="drift-route-main"
              d="M80 420 C240 340, 360 380, 520 300 C700 210, 860 250, 1060 160"
              stroke="url(#driftLine)"
              strokeWidth="2.2"
            />
            <path
              className="drift-path"
              id="drift-route-upper"
              d="M140 140 C320 220, 480 120, 640 200 C820 290, 980 220, 1120 260"
              stroke="url(#driftLine)"
              strokeWidth="2"
            />
            <path
              className="drift-path"
              id="drift-route-latent"
              d="M60 280 C260 180, 420 260, 600 160 C780 80, 980 140, 1140 80"
              stroke="#7ea6c9"
              strokeWidth="1.6"
              opacity="0.6"
            />
            <path
              className="drift-path"
              id="drift-route-branch"
              d="M120 360 C300 260, 460 340, 660 250 C820 180, 980 320, 1140 220"
              stroke="#f06c5b"
              strokeWidth="1.4"
              opacity="0.55"
            />

            <path
              className="drift-flow"
              d="M80 420 C240 340, 360 380, 520 300 C700 210, 860 250, 1060 160"
              stroke="#f8fafc"
              strokeWidth="1"
              strokeDasharray="6 14"
              opacity="0.6"
            />
            <path
              className="drift-flow"
              d="M140 140 C320 220, 480 120, 640 200 C820 290, 980 220, 1120 260"
              stroke="#f8fafc"
              strokeWidth="1"
              strokeDasharray="6 16"
              opacity="0.5"
            />
            <path
              className="drift-flow"
              d="M60 280 C260 180, 420 260, 600 160 C780 80, 980 140, 1140 80"
              stroke="#f8fafc"
              strokeWidth="0.9"
              strokeDasharray="5 18"
              opacity="0.4"
            />
          </g>

          <g>
            <circle className="drift-packet" data-path="drift-route-main" cx="0" cy="0" r="3.2" fill="#f8fafc" opacity="0.55" />
            <circle className="drift-packet" data-path="drift-route-main" cx="0" cy="0" r="2.6" fill="#7ea6c9" opacity="0.4" />
            <circle className="drift-packet" data-path="drift-route-main" cx="0" cy="0" r="2.1" fill="#f06c5b" opacity="0.35" />
            <circle className="drift-packet" data-path="drift-route-main" cx="0" cy="0" r="1.8" fill="#f8fafc" opacity="0.3" />
            <circle className="drift-packet" data-path="drift-route-upper" cx="0" cy="0" r="3" fill="#f8fafc" opacity="0.45" />
            <circle className="drift-packet" data-path="drift-route-upper" cx="0" cy="0" r="2.4" fill="#f06c5b" opacity="0.38" />
            <circle className="drift-packet" data-path="drift-route-upper" cx="0" cy="0" r="2" fill="#7ea6c9" opacity="0.32" />
            <circle className="drift-packet" data-path="drift-route-latent" cx="0" cy="0" r="2.6" fill="#7ea6c9" opacity="0.32" />
            <circle className="drift-packet" data-path="drift-route-latent" cx="0" cy="0" r="2.1" fill="#f8fafc" opacity="0.3" />
            <circle className="drift-packet" data-path="drift-route-branch" cx="0" cy="0" r="2.5" fill="#f8fafc" opacity="0.38" />
            <circle className="drift-packet" data-path="drift-route-branch" cx="0" cy="0" r="2.1" fill="#f06c5b" opacity="0.36" />
            <circle className="drift-packet" data-path="drift-route-branch" cx="0" cy="0" r="1.8" fill="#7ea6c9" opacity="0.28" />
          </g>

          <g className="drift-panels" fill="none" stroke="rgba(126,166,201,0.35)">
            <rect className="drift-panel" x="140" y="110" width="160" height="90" rx="10" strokeWidth="1" />
            <rect className="drift-panel" x="280" y="320" width="180" height="110" rx="12" strokeWidth="1" />
            <rect className="drift-panel" x="700" y="80" width="190" height="110" rx="12" strokeWidth="1" />
            <rect className="drift-panel" x="820" y="300" width="210" height="120" rx="12" strokeWidth="1" />
          </g>

          <g fill="url(#driftNode)">
            <circle className="drift-node" cx="140" cy="140" r="6" />
            <circle className="drift-node" cx="320" cy="220" r="5" />
            <circle className="drift-node" cx="520" cy="300" r="6" />
            <circle className="drift-node" cx="700" cy="210" r="6" />
            <circle className="drift-node" cx="880" cy="250" r="6" />
            <circle className="drift-node" cx="980" cy="320" r="5" />
            <circle className="drift-node" cx="1060" cy="160" r="6" />
            <circle className="drift-node" cx="260" cy="360" r="4.5" />
            <circle className="drift-node" cx="820" cy="140" r="4.5" />
          </g>

          <g fill="none" stroke="rgba(248,250,252,0.5)" strokeWidth="1.2">
            <circle className="drift-core" cx="600" cy="240" r="46" />
            <circle className="drift-core" cx="600" cy="240" r="70" opacity="0.35" />
          </g>
        </svg>
      </div>

      <div
        ref={beamRef}
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[60%] opacity-40"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(126,166,201,0.18), rgba(240,108,91,0.18), rgba(255,255,255,0))",
          filter: "blur(8px)",
        }}
      />

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
