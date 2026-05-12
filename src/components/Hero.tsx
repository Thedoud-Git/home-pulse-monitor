import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, useIsoLayoutEffect } from '@/lib/gsap';
import { splitWords } from '@/lib/splitWords';

export default function Hero() {
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.15,
      );

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const targets = splitWords(el);
        tl.to(
          targets,
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.95, ease: 'power3.out' },
          0.3 + i * 0.15,
        );
      });

      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.95,
      );

      tl.fromTo(
        '.hero-meta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
        1.05,
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-charcoal text-cream"
    >
      <img
        src="https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?auto=format&fit=crop&w=2000&q=80"
        alt="Forêt humide, mousse et fougères — pont entre nature et laboratoire"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* FIX #4 — Double gradient overlay (two stacked divs) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #000 0%, #000 30%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(46,64,54,0.55) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex h-full min-h-[100dvh] flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-5xl">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-md px-3.5 py-1.5 mb-6 md:mb-8 opacity-0"
          >
            <span className="live-dot" />
            <span className="font-data text-[11px] uppercase tracking-[0.22em] text-cream/85">
              Medtech · Diagnostic à domicile
            </span>
          </div>

          <h1 className="font-heading font-extrabold leading-[0.95] tracking-[-0.02em] text-cream">
            <span
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              className="block text-[10vw] md:text-[6.5vw] lg:text-xs"
            >
              Le diagnostic est
            </span>
            <span
              ref={(el) => {
                lineRefs.current[1] = el;
              }}
              className="block font-drama italic font-light text-clay text-[14vw] md:text-[10vw] lg:text-[8.4vw] leading-[0.9] mt-1"
            >
              entre vos mains.
            </span>
          </h1>

          <p
            ref={(el) => {
              lineRefs.current[2] = el;
            }}
            className="mt-6 md:mt-8 max-w-2xl text-lg md:text-xl text-cream/75 font-light leading-relaxed text-balance"
          >
            HomePulse place les usagers, aidants et professionnels de santé au
            cœur de sa démarche d'innovation. Des analyses biologiques fiables,
            là où vous êtes — sans devoir vous déplacer.
          </p>

          <div
            ref={ctaRef}
            className="mt-9 md:mt-11 flex flex-wrap items-center gap-4 opacity-0"
          >
            <a href="#pricing" className="btn btn-primary !text-base !py-4 !px-6">
              Investir dans HomePulse
              <ArrowRight size={18} strokeWidth={2.4} />
            </a>
            <a href="#philosophy" className="btn btn-ghost !text-base !py-4 !px-6">
              Découvrir notre approche
            </a>
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-data text-[11px] uppercase tracking-[0.22em] text-cream/55">
            <span className="hero-meta inline-flex items-center gap-2 opacity-0">
              <span className="h-1 w-1 rounded-full bg-clay" />
              Pensé par une infirmière
            </span>
            <span className="hero-meta inline-flex items-center gap-2 opacity-0">
              <span className="h-1 w-1 rounded-full bg-clay" />
              Conçu pour les patients
            </span>
            <span className="hero-meta inline-flex items-center gap-2 opacity-0">
              <span className="h-1 w-1 rounded-full bg-clay" />
              Validé en milieu clinique
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
