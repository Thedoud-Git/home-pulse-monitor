import { useRef } from 'react';
import { gsap, useIsoLayoutEffect } from '@/lib/gsap';

export default function SocialProof() {
  const ref = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.metric-num',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const metrics = [
    { num: '4 µL', label: 'de prélèvement\nsuffisent' },
    { num: '< 12s', label: 'pour un résultat\nde glycémie' },
    { num: '100%', label: 'des données\nchiffrées de bout\nen bout' },
    { num: '01', label: 'infirmière\nfondatrice' },
  ];

  return (
    <section ref={ref} id="proof" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-4">
          · 04 / Mesurable, par construction
        </p>
        <h2 className="font-heading font-extrabold text-moss leading-[1.05] tracking-[-0.02em] text-4xl md:text-5xl lg:text-6xl max-w-3xl">
          Des chiffres au service de{' '}
          <span className="font-drama italic font-light text-clay">l'humain</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-moss/65 text-lg">
          Nous construisons HomePulse main dans la main avec les soignants et
          les patients. Voici quelques repères qui guident notre R&D.
        </p>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-moss/10 rounded-3xl overflow-hidden border border-moss/10">
          {metrics.map((m) => (
            <div
              key={m.num}
              className="bg-cream p-8 md:p-10 flex flex-col justify-between min-h-[210px]"
            >
              <p className="metric-num font-drama italic font-light text-moss text-5xl md:text-6xl leading-none opacity-0">
                {m.num}
              </p>
              <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay whitespace-pre-line mt-6">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-moss/55 font-data text-[11px] uppercase tracking-[0.22em]">
          <span>· Conformité RGPD</span>
          <span>· Marquage CE en préparation</span>
          <span>· Accompagné par la French Care</span>
          <span>· Lauréat i-Lab (en cours)</span>
        </div>
      </div>
    </section>
  );
}
