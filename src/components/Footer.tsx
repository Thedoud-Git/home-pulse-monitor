import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream rounded-t-[4rem] mt-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 font-heading font-extrabold text-2xl"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-clay text-cream">
                <Activity size={16} strokeWidth={2.6} />
              </span>
              HomePulse
            </a>
            <p className="mt-6 font-drama italic text-2xl md:text-3xl text-cream/85 leading-snug max-w-md">
              Le diagnostic, là où la vie a lieu.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="font-data text-[11px] uppercase tracking-[0.22em] text-cream/75">
                System Operational
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-5">
              · Découvrir
            </p>
            <ul className="space-y-3 text-cream/75">
              <li>
                <a href="#features" className="link-hover hover:text-cream">
                  Le dispositif
                </a>
              </li>
              <li>
                <a href="#protocol" className="link-hover hover:text-cream">
                  Le protocole
                </a>
              </li>
              <li>
                <a href="#philosophy" className="link-hover hover:text-cream">
                  Notre manifeste
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-5">
              · Soutenir
            </p>
            <ul className="space-y-3 text-cream/75">
              <li>
                <a href="#pricing" className="link-hover hover:text-cream">
                  Investir
                </a>
              </li>
              <li>
                <a href="#proof" className="link-hover hover:text-cream">
                  Nos chiffres
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@homepulse.health"
                  className="link-hover hover:text-cream"
                >
                  Nous écrire
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-5">
              · Légal
            </p>
            <ul className="space-y-3 text-cream/75">
              <li>
                <a href="#" className="link-hover hover:text-cream">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="link-hover hover:text-cream">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="link-hover hover:text-cream">
                  RGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 font-data text-[11px] uppercase tracking-[0.22em] text-cream/45">
          <span>© 2026 HomePulse · Medtech française</span>
          <span>Conçu avec les soignants — pas malgré eux</span>
        </div>
      </div>
    </footer>
  );
}
