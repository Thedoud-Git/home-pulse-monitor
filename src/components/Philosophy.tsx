import { useRef } from 'react';
import { gsap, useIsoLayoutEffect } from '@/lib/gsap';
import { splitWords } from '@/lib/splitWords';

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordsLine1 = useRef<HTMLParagraphElement | null>(null);
  const wordsLine2 = useRef<HTMLHeadingElement | null>(null);
  const wordsLine3 = useRef<HTMLParagraphElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      [wordsLine1, wordsLine2, wordsLine3].forEach((ref) => {
        if (!ref.current) return;
        const targets = splitWords(ref.current);
        gsap.fromTo(
          targets,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 78%',
              end: 'top 35%',
              scrub: 0.9,
            },
          },
        );
      });

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative bg-charcoal text-cream py-32 md:py-44 overflow-hidden"
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 -z-0 opacity-[0.08]"
        aria-hidden
      >
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-[120%] w-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-12 md:mb-16">
          · Notre manifeste
        </p>

        <p
          ref={wordsLine1}
          className="font-heading text-cream/55 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          La plupart des medtechs se concentrent sur les hôpitaux, les flux,
          les volumes.
        </p>

        <h2
          ref={wordsLine2}
          className="mt-8 md:mt-12 font-drama italic font-light text-cream text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.96] tracking-[-0.02em] max-w-5xl"
        >
          Nous nous concentrons sur la personne, là où elle vit, comme elle vit.
        </h2>

        <p
          ref={wordsLine3}
          className="mt-10 md:mt-14 font-heading text-cream/75 text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          Fondée par une infirmière, HomePulse fait du diagnostic un acte
          intime, partagé entre le patient, ses proches et les soignants. La
          technologie devient discrète. Le soin redevient humain.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl">
          {[
            {
              k: 'Conçu en milieu réel',
              v: 'Avec les infirmiers libéraux, pas contre eux.',
            },
            {
              k: "Centré sur l'usage",
              v: "Un appareil qu'un proche aidant maîtrise.",
            },
            {
              k: 'Ouvert aux soignants',
              v: 'Un outil clinique, pas une boîte noire.',
            },
          ].map((it) => (
            <div key={it.k}>
              <p className="font-data text-[10.5px] uppercase tracking-[0.22em] text-clay">
                {it.k}
              </p>
              <p className="mt-2 text-cream/80 text-base leading-relaxed">
                {it.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
