import { ArrowRight } from 'lucide-react';

type Tier = {
  name: string;
  tagline: string;
  lead: string;
  perks: string[];
  featured: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Friends & Family',
    tagline: "Soutenez l'idée",
    lead: 'Vous croyez au projet et voulez accompagner ses premiers pas.',
    perks: [
      "Accès au journal d'avancement",
      'Visite de notre laboratoire',
      'Mention dans les remerciements officiels',
    ],
    featured: false,
  },
  {
    name: 'Investisseur Pilote',
    tagline: 'Déployez avec nous',
    lead:
      'Vous co-construisez la première vague de mise en marché auprès des soignants.',
    perks: [
      'Reporting trimestriel détaillé',
      'Sessions stratégiques avec la fondatrice',
      'Pré-accès aux résultats cliniques',
      'Représentation au conseil consultatif',
    ],
    featured: true,
  },
  {
    name: 'Partenaire Stratégique',
    tagline: 'Engagez-vous',
    lead:
      'Vous accompagnez HomePulse sur le long terme, en gouvernance et en réseau.',
    perks: [
      'Tout du tier précédent',
      "Siège au comité d'orientation",
      'Co-construction de la roadmap clinique',
      'Mise en relation institutionnelle',
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <p className="font-data text-[11px] uppercase tracking-[0.22em] text-clay mb-4">
            · 05 / Trois manières de soutenir
          </p>
          <h2 className="font-heading font-extrabold text-moss leading-[1.05] tracking-[-0.02em] text-4xl md:text-5xl lg:text-6xl">
            Investissez dans une medtech{' '}
            <span className="font-drama italic font-light text-clay">
              au service du soin
            </span>
            .
          </h2>
          <p className="mt-6 text-moss/70 text-lg leading-relaxed">
            Nous ne vendons pas un produit final, nous construisons une
            infrastructure de confiance. Choisissez la profondeur d'engagement
            qui vous ressemble — chaque conversation commence par une écoute.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`relative flex flex-col p-8 md:p-10 transition-all duration-500 ease-smooth ${
                t.featured
                  ? 'bg-moss text-cream rounded-[2.5rem] lg:scale-[1.04] ring-1 ring-clay/40 shadow-[0_40px_80px_-30px_rgba(46,64,54,0.45)]'
                  : 'bg-white/60 text-moss border border-moss/10 rounded-[2rem]'
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clay text-cream font-data text-[10px] uppercase tracking-[0.22em] px-3 py-1 rounded-full">
                  · Recommandé
                </span>
              )}
              <p className="font-data text-[10.5px] uppercase tracking-[0.22em] text-clay">
                {t.tagline}
              </p>
              <h3 className="mt-3 font-heading font-extrabold text-3xl md:text-4xl leading-tight tracking-[-0.01em]">
                {t.name}
              </h3>
              <p
                className={`mt-4 text-base leading-relaxed ${
                  t.featured ? 'text-cream/75' : 'text-moss/65'
                }`}
              >
                {t.lead}
              </p>

              <ul className="mt-7 space-y-3 flex-1">
                {t.perks.map((p) => (
                  <li
                    key={p}
                    className={`flex items-start gap-3 text-[15px] ${
                      t.featured ? 'text-cream/85' : 'text-moss/80'
                    }`}
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-clay" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:invest@homepulse.health?subject=HomePulse%20%E2%80%94%20Conversion%20clients%20et%20investisseurs"
                className={`mt-9 ${t.featured ? 'btn btn-primary' : 'btn btn-dark'}`}
              >
                Convertir des clients et des investisseurs
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-moss/55 font-data text-[11px] uppercase tracking-[0.22em]">
          · Sans engagement de souscription · Premier échange humain & confidentiel ·
        </p>
      </div>
    </section>
  );
}
