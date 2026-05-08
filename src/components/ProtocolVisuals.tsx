import { useEffect, useRef } from 'react';
import { Stethoscope } from 'lucide-react';

// FIX #6.1 — Concentric circles (CSS spin)
export function CirclesVisual() {
  return (
    <div className="relative aspect-square w-full max-w-md">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#CC5833"
          strokeWidth="0.6"
          strokeDasharray="2 6"
          opacity="0.55"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#F2F0E9"
          strokeWidth="0.4"
          strokeDasharray="1 4"
          opacity="0.35"
        />
      </svg>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-reverse"
      >
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="#F2F0E9"
          strokeWidth="0.6"
          opacity="0.4"
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="#CC5833"
          strokeWidth="0.6"
          opacity="0.7"
        />
        <circle cx="100" cy="100" r="6" fill="#CC5833" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Stethoscope className="text-cream/70" size={36} strokeWidth={1.4} />
      </div>
    </div>
  );
}

// FIX #6.2 — Canvas laser scanner over dot grid
export function ScannerVisual() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let scanY = 0;
    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const step = 16;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const offsetX = (w - cols * step) / 2;
      const offsetY = (h - rows * step) / 2;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * step;
          const y = offsetY + r * step;
          const dist = Math.abs(y - scanY);
          const alpha = Math.max(0.1, 1 - dist / 60);
          const onLine = dist < 24;
          ctx.beginPath();
          ctx.arc(x, y, onLine ? 1.6 : 0.9, 0, Math.PI * 2);
          ctx.fillStyle = onLine
            ? `rgba(204,88,51,${alpha})`
            : `rgba(242,240,233,${0.12 + alpha * 0.1})`;
          ctx.fill();
        }
      }

      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, 'rgba(204,88,51,0)');
      grad.addColorStop(0.5, 'rgba(204,88,51,0.55)');
      grad.addColorStop(1, 'rgba(204,88,51,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, w, 60);

      ctx.fillStyle = 'rgba(204,88,51,0.95)';
      ctx.fillRect(0, scanY, w, 1);

      scanY += 1.4;
      if (scanY > h + 30) scanY = -30;

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-md rounded-3xl border border-cream/15 bg-charcoal/40 overflow-hidden">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-4 left-4 font-data text-[10px] uppercase tracking-[0.22em] text-cream/55 flex items-center gap-2">
        <span className="live-dot" /> Scan capillaire
      </div>
      <div className="absolute bottom-4 right-4 font-data text-[10px] uppercase tracking-[0.22em] text-cream/35">
        04 µL · 08:42
      </div>
    </div>
  );
}

// FIX #6.3 — EKG waveform stroke-dashoffset
export function EkgVisual() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    let raf = 0;
    let start: number | null = null;
    const dur = 2000;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = ((t - start) % dur) / dur;
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative aspect-[5/4] w-full max-w-md rounded-3xl border border-cream/15 bg-charcoal/40 overflow-hidden flex items-center">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <defs>
          <linearGradient id="ekg-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CC5833" stopOpacity="0" />
            <stop offset="20%" stopColor="#CC5833" stopOpacity="1" />
            <stop offset="100%" stopColor="#CC5833" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="50"
          x2="200"
          y2="50"
          stroke="rgba(242,240,233,0.08)"
          strokeWidth="0.4"
        />
        <path
          ref={pathRef}
          d="M0,50 L30,50 L40,20 L50,80 L60,20 L70,80 L80,50 L200,50"
          fill="none"
          stroke="url(#ekg-grad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute top-4 left-4 font-data text-[10px] uppercase tracking-[0.22em] text-cream/55 flex items-center gap-2">
        <span className="live-dot" /> Transmission
      </div>
      <div className="absolute bottom-4 right-4 font-data text-[10px] uppercase tracking-[0.22em] text-cream/35">
        Médecin · Aidant · Patient
      </div>
    </div>
  );
}
