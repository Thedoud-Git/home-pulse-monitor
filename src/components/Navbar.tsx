import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Morphs the pill when the hero leaves the viewport.
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // FIX #3 — animated mobile menu reveal.
  useEffect(() => {
    if (!menuRef.current || !open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.mobile-link',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.1,
        },
      );
    });
    return () => ctx.revert();
  }, [open]);

  const navLinks = [
    { label: 'Notre approche', href: '#philosophy' },
    { label: 'Protocole', href: '#protocol' },
    { label: 'Investir', href: '#pricing' },
  ];

  return (
    <>
      <header className="fixed left-1/2 top-4 md:top-6 z-40 -translate-x-1/2 transition-all duration-500 ease-smooth w-[min(96%,1100px)]">
        <nav
          className={`flex items-center justify-between rounded-full border px-4 md:px-6 py-2.5 md:py-3 transition-all duration-500 ease-smooth ${
            scrolled
              ? 'bg-cream/70 backdrop-blur-xl border-moss/15 text-moss shadow-[0_8px_32px_-12px_rgba(46,64,54,0.18)]'
              : 'bg-white/5 backdrop-blur-md border-white/15 text-cream'
          }`}
        >
          <a
            href="#hero"
            className="flex items-center gap-2 link-hover font-heading font-extrabold tracking-tight"
          >
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                scrolled ? 'bg-clay text-cream' : 'bg-cream text-charcoal'
              }`}
            >
              <Activity size={14} strokeWidth={2.6} />
            </span>
            <span className="text-base md:text-lg">HomePulse</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-[13.5px] font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-hover opacity-90 hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#pricing"
            className="hidden md:inline-flex btn btn-primary !py-2 !px-4 !text-[13px]"
          >
            Investir
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>

          {/* FIX #3 — Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              scrolled ? 'bg-moss/10 text-moss' : 'bg-white/10 text-cream'
            }`}
          >
            <span
              className="transition-transform duration-300 ease-smooth"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </span>
          </button>
        </nav>
      </header>

      {open && (
        <div
          ref={menuRef}
          className="md:hidden fixed inset-0 z-30 bg-charcoal text-cream flex flex-col justify-center items-center gap-8 px-8"
        >
          <ul className="flex flex-col items-center gap-7 text-2xl font-heading font-bold">
            {navLinks.map((l) => (
              <li key={l.href} className="mobile-link">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="link-hover"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mobile-link btn btn-primary w-full max-w-xs"
          >
            Investir dans HomePulse
            <ArrowRight size={16} />
          </a>
          <p className="mobile-link font-data text-[11px] uppercase tracking-[0.2em] text-cream/40 mt-4">
            HomePulse — Le diagnostic vient à vous
          </p>
        </div>
      )}
    </>
  );
}
