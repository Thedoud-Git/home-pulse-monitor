import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Activity, Calendar, Heart, Microscope } from 'lucide-react';
import { gsap, useIsoLayoutEffect } from '@/lib/gsap';

type Sample = { key: string; title: string; detail: string; icon: ReactNode };

// ── C.1 Diagnostic Shuffler ────────────────────────────────────────
function DiagnosticShuffler() {
  const [stack, setStack] = useState<Sample[]>([
    {
      key: 'glycemie',
      title: 'Glycémie capillaire',
      detail: 'Suivi diabète · 4 µL · 12 sec',
      icon: <Heart size={16} />,
    },
    {
      key: 'inr',
      title: 'INR · Coagulation',
      detail: 'Anticoagulants · capillaire · 1 min',
      icon: <Activity size={16} />,
    },
    {
      key: 'crp',
      title: 'CRP · Inflammation',
      detail: 'Détection précoce · 8 min',
      icon: <Microscope size={16} />,
    },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setStack((s) => {
        const next = [...s];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <article className="card-surface p-7 md:p-9 flex flex-col gap-6 min-h-[420px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-data text-[10.5px] uppercase tracking-[0.22em] text-clay">
            Diagnostic Shuffler
          </p>
          <h3 className="font-heading font-bold text-moss text-xl md:text-2xl mt-2 leading-tight">
            L'analyse choisit le patient,{' '}
            <span className="text-moss/55">pas l'inverse.</span>
          </h3>
        </div>
        <span className="font-data text-[10px] text-moss/40">/ 01</span>
      </div>

      <div className="relative flex-1 min-h-[210px]">
        {stack.map((item, i) => (
          <div
            key={item.key}
            className="absolute inset-x-0 top-0 rounded-2xl border border-moss/10 bg-white/60 backdrop-blur-sm p-5 transition-all duration-700"
            style={{
              transform: `translateY(${i * 14}px) scale(${1 - i * 0.04})`,
              opacity: 1 - i * 0.22,
              zIndex: 10 - i,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-clay/10 text-clay">
                {item.icon}
              </span>
              <span className="font-data text-[10.5px] uppercase tracking-[0.18em] text-moss/55">
                Cartouche · 0{i + 1}
              </span>
            </div>
            <p className="font-heading font-bold text-moss text-lg leading-tight mt-2">
              {item.title}
            </p>
            <p className="font-data text-[12px] text-moss/55 mt-1.5">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="text-moss/65 text-sm leading-relaxed mt-auto">
        Une cartouche unique par analyse, échangeable en quelques secondes.
        Conçue avec les soignants pour leur faire gagner du temps.
      </p>
    </article>
  );
}

// ── C.2 Telemetry Typewriter ───────────────────────────────────────
function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const messages = [
    '> patient · M. Robert, 78 ans · domicile',
    '> prélèvement capillaire · 4 µL',
    '> analyse en cours · CRP · INR',
    '> résultats transmis au médecin traitant',
    '> aidante notifiée · plan de soin mis à jour',
  ];
  const cursor = useRef({ msgIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const c = cursor.current;
      const msg = messages[c.msgIdx];
      if (!c.deleting) {
        c.charIdx++;
        setText(msg.slice(0, c.charIdx));
        if (c.charIdx >= msg.length) {
          c.deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
      } else {
        c.charIdx--;
        setText(msg.slice(0, c.charIdx));
        if (c.charIdx <= 0) {
          c.deleting = false;
          c.msgIdx = (c.msgIdx + 1) % messages.length;
        }
      }
      timer = setTimeout(tick, c.deleting ? 22 : 42);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="card-surface p-7 md:p-9 flex flex-col gap-6 min-h-[420px] bg-charcoal text-cream border-charcoal/0">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-data text-[10.5px] uppercase tracking-[0.22em] text-clay">
            Telemetry Feed
          </p>
          <h3 className="font-heading font-bold text-cream text-xl md:text-2xl mt-2 leading-tight">
            Chaque résultat,{' '}
            <span className="text-cream/55">au bon moment, au bon soignant.</span>
          </h3>
        </div>
        <span className="font-data text-[10px] text-cream/40">/ 02</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="live-dot" />
        <span className="font-data text-[10.5px] uppercase tracking-[0.22em] text-cream/75">
          Live Feed · Sécurisé
        </span>
      </div>

      <div className="flex-1 rounded-2xl bg-black/40 border border-cream/10 p-5 font-data text-[13px] leading-relaxed text-cream/85 min-h-[170px]">
        <span className="text-clay/80">homepulse@cabinet:~$</span>{' '}
        <span>{text}</span>
        <span className="tw-cursor" />
      </div>

      <p className="text-cream/65 text-sm leading-relaxed mt-auto">
        Vos analyses transitent en temps réel vers les bons interlocuteurs.
        Aucun fax, aucune attente, aucune donnée perdue.
      </p>
    </article>
  );
}

// ── C.3 Cursor Protocol Scheduler ──────────────────────────────────
function CursorScheduler() {
  const cursorRef = useRef<SVGSVGElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'selected' | 'saved'>('idle');

  useIsoLayoutEffect(() => {
    if (!cursorRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const c = cursorRef.current!;
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut' },
      });
      const save = sectionRef.current!.querySelector(
        '[data-save]',
      ) as HTMLElement | null;

      tl.set(c, { x: 24, y: 18, opacity: 0, scale: 1 })
        .to(c, { opacity: 1, duration: 0.4 })
        .to(c, { x: 110, y: 78, duration: 1.1 })
        .call(() => setActiveDay(2))
        .to(c, { scale: 0.85, duration: 0.18 })
        .to(c, { scale: 1, duration: 0.22 })
        .call(() => setPhase('selected'))
        .to(c, { duration: 0.4 })
        .call(() => {
          if (!save || !sectionRef.current) return;
          const r = save.getBoundingClientRect();
          const root = sectionRef.current.getBoundingClientRect();
          gsap.to(c, {
            x: r.left - root.left + 18,
            y: r.top - root.top + 12,
            duration: 1.0,
            ease: 'power2.inOut',
          });
        })
        .to(c, { duration: 1.0 })
        .to(c, { scale: 0.85, duration: 0.18 })
        .to(c, { scale: 1, duration: 0.22 })
        .call(() => setPhase('saved'))
        .to(c, { opacity: 0, duration: 0.6, delay: 0.3 })
        .call(() => {
          setActiveDay(null);
          setPhase('idle');
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <article
      ref={sectionRef}
      className="card-surface p-7 md:p-9 flex flex-col gap-6 min-h-[420px] relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-data text-[10.5px] uppercase tracking-[0.22em] text-clay">
            Cursor Protocol
          </p>
          <h3 className="font-heading font-bold text-moss text-xl md:text-2xl mt-2 leading-tight">
            Planifiez le soin,{' '}
            <span className="text-moss/55">avec quelques gestes.</span>
          </h3>
        </div>
        <span className="font-data text-[10px] text-moss/40">/ 03</span>
      </div>

      <div className="relative rounded-2xl bg-cream border border-moss/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-data text-[10.5px] uppercase tracking-[0.22em] text-moss/55">
            Semaine 14 · Avril
          </span>
          <Calendar size={14} className="text-moss/40" />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <button
              key={i}
              data-day={i}
              type="button"
              className={`relative h-12 rounded-xl border text-sm font-data transition-all duration-300 ${
                activeDay === i
                  ? 'bg-clay text-cream border-clay scale-105'
                  : 'bg-white/60 border-moss/10 text-moss/70 hover:border-moss/25'
              }`}
            >
              {d}
              {activeDay === i && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-clay border-2 border-cream" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <span
            data-save
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-data uppercase tracking-[0.18em] border transition-all duration-300 ${
              phase === 'saved'
                ? 'bg-moss text-cream border-moss'
                : 'bg-white/60 border-moss/15 text-moss/65'
            }`}
          >
            {phase === 'saved' ? '✓ Programmé' : 'Confirmer'}
          </span>
        </div>

        <svg
          ref={cursorRef}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          className="absolute pointer-events-none drop-shadow-[0_4px_12px_rgba(46,64,54,0.35)]"
          style={{ left: 0, top: 0 }}
        >
          <path
            d="M3 2 L3 18 L8 13 L11 19 L14 18 L11 12 L18 12 Z"
            fill="#1A1A1A"
            stroke="#F2F0E9"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-moss/65 text-sm leading-relaxed mt-auto">
        Une interface si simple qu'un aidant la maîtrise dès la première
        utilisation. Le soin reste l'évidence, jamais l'effort.
      </p>
    </article>
  );
}

// ── C. Features wrapper ────────────────────────────────────────────
export default function Features() {
  return (
    <section id="features" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <header className="max-w-3xl mb-16 md:mb-20">
          <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-4">
            · 01 / Le geste clinique, miniaturisé
          </p>
          <h2 className="font-heading font-extrabold text-moss leading-[1.05] tracking-[-0.02em] text-4xl md:text-5xl lg:text-6xl">
            Trois instruments pour un même{' '}
            <span className="font-drama italic font-light text-clay">
              soin attentionné
            </span>
            .
          </h2>
          <p className="mt-6 text-moss/70 text-lg max-w-2xl">
            HomePulse n'est pas un appareil de plus. C'est un protocole de
            confiance, conçu avec celles et ceux qui soignent au quotidien.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <DiagnosticShuffler />
          <TelemetryTypewriter />
          <CursorScheduler />
        </div>
      </div>
    </section>
  );
}
