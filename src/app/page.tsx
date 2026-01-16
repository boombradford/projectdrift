"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { Activity, AlertTriangle, Database, Globe, RefreshCw } from 'lucide-react';

type Severity = 'High' | 'Medium' | 'Low';

interface DriftSnapshot {
    url: string;
    domain: string;
    timestamp: string;
    psi?: {
        lighthouseScore: number;
        lcp: string;
        inp: string;
        cls: string;
        fcp?: string;
        tti?: string;
        speedIndex: string;
        seoScore?: number;
        accessibilityScore?: number;
        bestPracticesScore?: number;
    };
    crux?: {
        lcp?: string;
        inp?: string;
        cls?: string;
        dataSource?: string;
        collectionPeriod?: { firstDate: string; lastDate: string };
    };
    onPage?: {
        title?: string;
        metaDescription?: string;
        canonical?: string;
        metaRobots?: string;
        xRobotsTag?: string;
        h1?: string[];
        h2Count?: number;
        wordCount?: number;
        topKeywords?: Array<{ term: string; count: number }>;
        ctas?: Array<{ text: string; link: string }>;
    };
    diagnostics?: {
        robotsTxt?: { status: number; sitemapUrls?: string[]; error?: string };
    };
}

interface DriftDelta {
    id: string;
    label: string;
    severity: Severity;
    before: string;
    after: string;
    note?: string;
}

interface DriftAction {
    id: string;
    title: string;
    severity: Severity;
    evidence: string[];
}

interface DriftResponse {
    domain: string;
    status: 'baseline' | 'ok';
    latest: DriftSnapshot;
    previous?: DriftSnapshot;
    deltas: DriftDelta[];
    actions: DriftAction[];
    error?: string;
}

const getSeverityColor = (severity: Severity) => {
    switch (severity) {
        case 'High': return 'text-red-300 border-red-500/30 bg-red-500/10';
        case 'Medium': return 'text-orange-300 border-orange-500/30 bg-orange-500/10';
        default: return 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10';
    }
};

const getDriftMood = (deltas: DriftDelta[], status: DriftResponse['status']) => {
    if (status === 'baseline') return 'baseline';
    if (deltas.length === 0) return 'stable';
    const negativeKeywords = ['Dropped', 'Slower', 'Worse', 'Decreased'];
    const isNegative = deltas.some(delta =>
        (delta.note && negativeKeywords.some(word => delta.note?.includes(word)))
    );
    return isNegative ? 'negative' : 'positive';
};

export default function DriftPage() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'running' | 'complete'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<DriftResponse | null>(null);

    const runDrift = async () => {
        const trimmed = url.trim();
        if (!trimmed) {
            setError('Please enter a website domain to run Drift.');
            return;
        }

        setStatus('running');
        setError(null);
        setData(null);

        try {
            const res = await fetch('/api/drift/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: trimmed })
            });
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.error || 'Drift run failed');
            setData(payload);
            setStatus('complete');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Drift run failed';
            setError(message);
            setStatus('idle');
        }
    };

    const latest = data?.latest;
    const previous = data?.previous;

    return (
        <div className="min-h-screen bg-[#02040a] text-white">
            <header className="h-16 border-b border-[rgba(255,255,255,0.06)] bg-[#070a12] px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src="/brand/logo.jpg" alt="Flux Nine Labs" className="w-7 h-7 object-contain" />
                    <span className="text-[14px] font-semibold text-[#f8fafc] tracking-tight">Flux Nine Labs</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">DRIFT</div>
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#f06c5b] text-white text-[12px] font-semibold rounded-lg hover:bg-[#ff7d6d] transition-colors"
                    >
                        Contact us
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">DRIFT</div>
                        <h1 className="font-monda text-4xl md:text-[3.35rem] font-semibold tracking-tight text-[#f8fafc] leading-[1.05]">
                            Drift is a signal layer
                            <span className="block text-[#7ea6c9]">for real change.</span>
                        </h1>
                        <p className="text-[16px] text-[#9fb2c7] max-w-xl leading-relaxed">
                            We capture a clean baseline, then track what shifts in performance, SEO, and conversion clarity. Every delta is evidence-backed.
                        </p>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                runDrift();
                            }}
                            className="flex flex-col md:flex-row gap-3"
                        >
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => {
                                    if (error) setError(null);
                                    setUrl(e.target.value);
                                }}
                                placeholder="domain.com"
                                className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl text-white focus:outline-none"
                                aria-label="Website domain"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#f06c5b] text-white font-bold text-[12px] tracking-widest uppercase rounded-xl hover:bg-[#ff7d6d] transition-all"
                            >
                                Run Drift
                            </button>
                        </form>
                        {error && (
                            <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-red-200">{error}</span>
                            </div>
                        )}
                        {data && (
                            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/50">
                                <span>Drift status</span>
                                <span className={clsx(
                                    "px-2 py-1 rounded-full border",
                                    getDriftMood(data.deltas, data.status) === 'negative' && "text-red-300 border-red-500/30",
                                    getDriftMood(data.deltas, data.status) === 'positive' && "text-emerald-300 border-emerald-500/30",
                                    getDriftMood(data.deltas, data.status) === 'baseline' && "text-white/40 border-white/10",
                                    getDriftMood(data.deltas, data.status) === 'stable' && "text-white/60 border-white/20"
                                )}>
                                    {getDriftMood(data.deltas, data.status) === 'negative' && "Negative drift"}
                                    {getDriftMood(data.deltas, data.status) === 'positive' && "Positive drift"}
                                    {getDriftMood(data.deltas, data.status) === 'baseline' && "Baseline"}
                                    {getDriftMood(data.deltas, data.status) === 'stable' && "Stable"}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="glass-card p-6 border-white/[0.08] bg-white/[0.02]">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Drift field</div>
                        <svg viewBox="0 0 520 320" className="w-full h-64">
                            <defs>
                                <linearGradient id="driftGlow" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#f06c5b" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#7ea6c9" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>
                            <rect x="20" y="20" width="480" height="280" rx="28" fill="rgba(8,12,20,0.9)" stroke="rgba(255,255,255,0.08)" />
                            <path
                                d="M60 210 C140 160, 220 240, 300 190 C360 150, 430 180, 460 140"
                                stroke="url(#driftGlow)"
                                strokeWidth="2"
                                fill="none"
                            >
                                <animate
                                    attributeName="d"
                                    dur="6s"
                                    repeatCount="indefinite"
                                    values="
                                    M60 210 C140 160, 220 240, 300 190 C360 150, 430 180, 460 140;
                                    M60 200 C140 150, 220 230, 300 180 C360 160, 430 170, 460 150;
                                    M60 210 C140 160, 220 240, 300 190 C360 150, 430 180, 460 140"
                                />
                            </path>
                            {[
                                { cx: 120, cy: 120, r: 6, dur: '4s' },
                                { cx: 220, cy: 160, r: 8, dur: '5s' },
                                { cx: 320, cy: 110, r: 5, dur: '6s' },
                                { cx: 400, cy: 180, r: 7, dur: '4.5s' }
                            ].map((dot, idx) => (
                                <circle key={idx} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#f06c5b">
                                    <animate
                                        attributeName="cy"
                                        values={`${dot.cy};${dot.cy + 18};${dot.cy}`}
                                        dur={dot.dur}
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="opacity"
                                        values="0.4;1;0.4"
                                        dur={dot.dur}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            ))}
                            <circle cx="260" cy="160" r="70" fill="none" stroke="rgba(126,166,201,0.35)" strokeWidth="1.5">
                                <animate
                                    attributeName="r"
                                    values="64;74;64"
                                    dur="7s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </div>
                </section>

                {status === 'running' && (
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Running Drift scan...
                    </div>
                )}

                <AnimatePresence>
                    {data && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-5 space-y-2">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Domain</div>
                                    <div className="text-white font-semibold">{data.domain}</div>
                                </div>
                                <div className="glass-card p-5 space-y-2">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Latest Run</div>
                                    <div className="text-white/80">{latest?.timestamp ? new Date(latest.timestamp).toLocaleString() : 'N/A'}</div>
                                </div>
                                <div className="glass-card p-5 space-y-2">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Previous Run</div>
                                    <div className="text-white/80">{previous?.timestamp ? new Date(previous.timestamp).toLocaleString() : 'Baseline (first run)'}</div>
                                </div>
                            </section>

                            {data.status === 'baseline' && (
                                <section className="glass-card p-5 border border-white/[0.08] bg-white/[0.02]">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">Baseline Created</div>
                                    <div className="text-sm text-white/70">
                                        This is your first Drift run. Changes and deltas will appear after the next run.
                                    </div>
                                </section>
                            )}

                            <section className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-4 h-4 text-[#f06c5b]" />
                                    <h2 className="text-lg font-semibold text-[#E8E8E8] tracking-tight">Top Drift Signals</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.deltas.length === 0 && (
                                        <div className="glass-card p-5 text-white/60">
                                            {data.status === 'baseline'
                                                ? 'Baseline captured. Run Drift again to see changes.'
                                                : 'No significant deltas detected yet.'}
                                        </div>
                                    )}
                                    {data.deltas.map(delta => (
                                        <div key={delta.id} className="glass-card p-5 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className={clsx("text-[10px] font-bold uppercase tracking-[0.15em]", getSeverityColor(delta.severity))}>{delta.severity}</span>
                                                <span className="text-white/70 text-sm font-semibold">{delta.label}</span>
                                            </div>
                                            <div className="text-xs text-white/50">Before: {delta.before}</div>
                                            <div className="text-xs text-white/50">After: {delta.after}</div>
                                            {delta.note && <div className="text-xs text-white/40">{delta.note}</div>}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Database className="w-4 h-4 text-[#f06c5b]" />
                                    <h2 className="text-lg font-semibold text-[#E8E8E8] tracking-tight">Actionable Next Steps</h2>
                                </div>
                                <div className="space-y-4">
                                    {data.actions.length === 0 && (
                                        <div className="glass-card p-5 text-white/60">
                                            {data.status === 'baseline'
                                                ? 'Actions will appear after a second run.'
                                                : 'No actions generated yet.'}
                                        </div>
                                    )}
                                    {data.actions.map(action => (
                                        <div key={action.id} className="glass-card p-5 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className={clsx("text-[10px] font-bold uppercase tracking-[0.15em]", getSeverityColor(action.severity))}>{action.severity}</span>
                                                <span className="text-white font-semibold">{action.title}</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 text-[11px] text-white/60">
                                                {action.evidence.map((item, idx) => (
                                                    <div key={`${action.id}-ev-${idx}`}>{item}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-card p-5 space-y-3">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Performance (Latest)</div>
                                    <div className="text-sm text-white/70">PSI Score: {latest?.psi?.lighthouseScore ?? 'N/A'}</div>
                                    <div className="text-sm text-white/70">LCP: {latest?.psi?.lcp || 'N/A'}</div>
                                    <div className="text-sm text-white/70">INP: {latest?.psi?.inp || 'N/A'}</div>
                                    <div className="text-sm text-white/70">CLS: {latest?.psi?.cls || 'N/A'}</div>
                                </div>
                                <div className="glass-card p-5 space-y-3">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">On-Page (Latest)</div>
                                    <div className="text-sm text-white/70">Title: {latest?.onPage?.title || 'N/A'}</div>
                                    <div className="text-sm text-white/70">H1: {latest?.onPage?.h1?.join(' | ') || 'N/A'}</div>
                                    <div className="text-sm text-white/70">CTAs: {latest?.onPage?.ctas?.map(c => c.text).join(' | ') || 'N/A'}</div>
                                </div>
                            </section>

                            <section className="glass-card p-5 space-y-3">
                                <div className="flex items-center gap-3 text-white/60 text-sm">
                                    <Globe className="w-4 h-4 text-[#f06c5b]" />
                                    Latest URL: {latest?.url || 'N/A'}
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
