import { useRef } from 'react';
import { gsap, useIsoLayoutEffect } from '@/lib/gsap';
import {
  CirclesVisual,
  ScannerVisual,
  EkgVisual,
} from '@/components/ProtocolVisuals';

export default function Protocol() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          filter: 'blur(20px)',
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top+=80',
            end: '+=80%',
            scrub: 0.8,
            pin: true,
            pinSpacing: false,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      n: '01',
      title: "L'écoute, en premier.",
      desc:
        "Une consultation à distance ou à domicile cadre l'analyse à réaliser. Le soignant choisit, le patient confirme.",
      visual: <CirclesVisual />,
    },
    {
      n: '02',
      title: 'Le geste, en confiance.',
      desc:
        "Quelques microlitres suffisent. La cartouche scanne, l'appareil analyse — tranquillement, à votre rythme.",
      visual: <ScannerVisual />,
    },
    {
      n: '03',
      title: 'Le résultat, partagé.',
      desc:
        'Médecin traitant, spécialiste, aidant : chacun reçoit ce dont il a besoin. Le soin continue, sans rupture.',
      visual: <EkgVisual />,
    },
  ];

  return (
    <section id="protocol" ref={sectionRef} className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-10">
        <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-4">
          · 03 / Le protocole
        </p>
        <h2 className="font-heading font-extrabold text-moss leading-[1.05] tracking-[-0.02em] text-4xl md:text-5xl lg:text-6xl max-w-3xl">
          Un parcours pensé pour{' '}
          <span className="font-drama italic font-light text-clay">
            la vraie vie
          </span>
          .
        </h2>
      </div>

      <div className="relative">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="protocol-card sticky top-0 min-h-screen w-full flex items-center"
            style={{ zIndex: i + 1 }}
          >
            <div className="mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-20 py-20 md:py-24">
              <div
                className="card-surface bg-moss text-cream border-moss/20 grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-14 lg:p-16 min-h-[70vh]"
                style={{ borderRadius: '2.5rem' }}
              >
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <p className="font-data text-[12px] uppercase tracking-[0.22em] text-clay">
                      Étape {s.n}
                    </p>
                    <h3 className="mt-5 font-heading font-extrabold text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
                      {s.title}
                    </h3>
                    <p className="mt-7 text-cream/75 text-lg md:text-xl leading-relaxed max-w-xl">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-12 flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.22em] text-cream/50">
                    <span className="h-px w-10 bg-cream/30" />
                    Protocole HomePulse
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  {s.visual}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
