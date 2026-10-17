import { Layout } from "@server/components/layouts";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@server/constants/contact";
import type React from "react";

const TICKER_WORDS = [
  "Strategy",
  "Roadmapping",
  "Product discovery",
  "Prioritisation",
  "Metrics",
  "Feedback loops",
  "Founder advisory",
  "Product audits",
  "Information architecture",
  "PMF signals",
  "Team alignment",
  "Decision communication",
];

const SITUATIONS: { headline: React.ReactNode; answer: string }[] = [
  {
    headline: (
      <>
        You&apos;ve raised. Now capital has to become{" "}
        <MarkerUnderline variant="a">progress</MarkerUnderline>.
      </>
    ),
    answer:
      "I turn a loose vision into a coherent, shippable, navigable roadmap.",
  },
  {
    headline: (
      <>
        V1 is <MarkerUnderline variant="b">out</MarkerUnderline>. Traction is
        muddy.
      </>
    ),
    answer:
      "I find out whether it's a product, positioning or operating problem — and what to do next.",
  },
  {
    headline: (
      <>
        The <MarkerUnderline variant="c">next</MarkerUnderline> raise is coming.
      </>
    ),
    answer:
      "I sharpen your PMF signals, product logic and operational credibility.",
  },
  {
    headline: (
      <>
        Operational debt is{" "}
        <MarkerUnderline variant="d">piling up</MarkerUnderline>.
      </>
    ),
    answer:
      "I install structure — priorities, specs, metrics, feedback loops — without slowing the team down.",
  },
];

const STATS = [
  { figure: "3→50", caption: "Team scaled as COO, then CEO, at Clearview" },
  {
    figure: "3→9+",
    caption: "Confidence in product goals at Ecologi — from below 3/10 to 9+",
  },
  {
    figure: "20+",
    caption:
      "Years running high-stakes operations, from film sets to product teams",
  },
];

const ROLES: {
  years: string;
  role: string;
  org: string;
  href: string;
  external: boolean;
  place: string;
  summary: string;
}[] = [
  {
    years: "2025 — now",
    role: "CEO / CPO",
    org: "∞CHPTRS",
    href: "https://chptrs.tech/",
    external: true,
    place: "Sheffield",
    summary:
      "Co-founded a fractional product & engineering partnership. AI-native, multi-agent delivery at the pace of a much larger team — with full IP handover and zero lock-in.",
  },
  {
    years: "2023 — 25",
    role: "Head of Product",
    org: "Just",
    href: "https://justabout.com/",
    external: true,
    place: "Brighton",
    summary:
      "Product vision and roadmap across user, client and business needs. Brought in data-informed decisions through dashboards — clarity and rhythm without losing speed.",
  },
  {
    years: "2022 — 23",
    role: "Product Lead",
    org: "Ecologi",
    href: "https://ecologi.com/",
    external: true,
    place: "Bristol",
    summary:
      "Introduced product principles and built the first central product metrics dashboard. Moved confidence in product goals from below 3/10 to 9+.",
  },
  {
    years: "2018 — 23",
    role: "COO → CEO",
    org: "Clearview",
    href: "https://clearview.team/",
    external: true,
    place: "San Francisco / Remote",
    summary:
      "Grew the team from 3 to around 50. Owned operations, investment logic and financial performance; advised early-stage clients on product, UX and data.",
  },
  {
    years: "2003 — 20",
    role: "Producer / Logistician",
    org: "Film & commercial",
    href: "/motion-picture-producing-credits",
    external: false,
    place: "UK & international",
    summary:
      "Budgets, schedules, payroll and logistics for high-stakes, high-investment projects for the biggest names in media, including Channel 4, NBC Universal, Disney and Sky. Known miracle-worker.",
  },
];

const EXPERTISE = [
  {
    title: "Product direction",
    items: [
      "Product strategy",
      "Roadmapping",
      "Prioritisation",
      "Product discovery",
      "PMF signal development",
    ],
  },
  {
    title: "Operating system",
    items: [
      "Product specs",
      "Feedback loops",
      "Metrics & dashboards",
      "Cross-functional rituals",
      "Team alignment",
    ],
  },
  {
    title: "Founder support",
    items: [
      "Founder advisory",
      "Early-stage decision support",
      "Org clarity",
      "Product audits",
      "Pre-raise product maturity",
    ],
  },
  {
    title: "Narrative & signal",
    items: [
      "Messaging clarity",
      "Information architecture",
      "Copy strategy",
      "User research synthesis",
      "Decision communication",
    ],
  },
];

const MARKER_PATHS = {
  a: "M2 7 C 18 4, 38 9.5, 58 6 S 88 3.5, 98 7.5",
  b: "M4 8 Q 45 2.5, 96 5.5 Q 80 7, 70 10",
  c: "M2 5 C 28 9.5, 62 2.5, 98 6.5",
  d: "M2 5 C 24 2.5, 52 7.5, 98 4 M10 11 C 38 8.5, 66 12.5, 92 9.5",
  bold: "M2 7 C 30 5.5, 62 3.5, 98 1.5 M8 14 C 36 12, 64 10.5, 92 9",
} as const;

function MarkerUnderline({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: keyof typeof MARKER_PATHS;
}) {
  return (
    <span className={`marked marked--${variant}`}>
      {children}
      <svg
        className="ink-line"
        aria-hidden="true"
        viewBox={variant === "bold" ? "0 0 100 16" : "0 0 100 14"}
        preserveAspectRatio="none"
      >
        <path d={MARKER_PATHS[variant]} vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

function RedCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="circled">
      {children}
      <svg
        className="ink-circle"
        aria-hidden="true"
        viewBox="0 0 120 50"
        preserveAspectRatio="none"
      >
        <path
          d="M14 27 C 12 11, 44 4, 70 5 C 98 6, 115 15, 113 27 C 111 40, 84 47, 58 46 C 30 45, 7 38, 9 24 C 11 14, 30 8, 48 7"
          pathLength={1}
        />
      </svg>
    </span>
  );
}

function PaperGrain({ id }: { id: string }) {
  return (
    <svg className="sticky-note__grain" aria-hidden="true">
      <filter id={`mottle-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.014"
          numOctaves={2}
          seed={id.length * 7}
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.3 0 0 0 -0.1"
        />
      </filter>
      <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.24 0 0 0 -0.07"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#mottle-${id})`} />
      <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
    </svg>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span className="section-label__num">{number}</span> / {children}
    </p>
  );
}

function ContactIcons() {
  return (
    <div className="icon-row">
      <a className="icon-btn" href={CONTACT_MAILTO}>
        <span className="visually-hidden">Email</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="icon-btn__svg">
          <rect
            x="3"
            y="5.5"
            width="18"
            height="13"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3.8 7 L12 13 L20.2 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <a
        className="icon-btn"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener"
      >
        <span className="visually-hidden">LinkedIn</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="icon-btn__svg">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="3"
            fill="currentColor"
          />
          <circle cx="7.4" cy="7.4" r="1.6" className="icon-btn__knock" />
          <rect
            x="5.9"
            y="9.8"
            width="3"
            height="8.4"
            className="icon-btn__knock"
          />
          <path
            d="M10.9 9.8 H13.7 V11.1 C14.2 10.3 15.2 9.6 16.6 9.6 C18.8 9.6 19.6 11 19.6 13.4 V18.2 H16.7 V13.9 C16.7 12.8 16.4 12 15.4 12 C14.3 12 13.8 12.8 13.8 13.9 V18.2 H10.9 Z"
            className="icon-btn__knock"
          />
        </svg>
      </a>
      <a
        className="icon-btn"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener"
      >
        <span className="visually-hidden">Instagram</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="icon-btn__svg">
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}

export const Home = () => (
  <Layout title="Annette Lyn O'Neil" name="home">
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero__inner">
        <div
          className="hero__photo"
          role="img"
          aria-label="Annette Lyn O'Neil in Times Square at night"
        />
        <p className="hero__roles">
          <span>Product leader</span>
          <span className="accent">×</span>
          <span>Early-stage operational design</span>
          <span className="accent">×</span>
          <span>Force multiplier</span>
        </p>
        <h1 className="hero__name">
          <span className="hero__name-line">
            <span className="script-initial">A</span>nnette{" "}
            <span className="script-initial">L</span>yn
          </span>
          <span className="hero__name-line">
            <span className="script-initial">O</span>&apos;Neil
          </span>
        </h1>
        <div className="hero__intro">
          <p className="hero__lede">
            For founders who&apos;ve already sold the vision — and now need the
            product to catch up.
          </p>
          <p className="hero__body">
            I turn <b>fresh funding</b> into <b>validated product</b>, pairing
            product rigour and narrative skill with a muscular bias to action:{" "}
            <em>especially</em> useful when the stakes and the ambiguity are
            both high.
          </p>
          <div className="button-row">
            <a className="btn btn--primary" href="#contact">
              Start a conversation
            </a>
            <a className="btn btn--ghost" href="#track-record">
              Track record ↓
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="band" id="about" aria-labelledby="about-title">
      <div className="band__inner">
        <div className="section-head">
          <SectionLabel number="01">How I think</SectionLabel>
          <h2 className="section-title" id="about-title">
            After the raise, the work changes.
          </h2>
        </div>
        <div className="sticky-notes">
          <div className="sticky-note sticky-note--yellow">
            <div className="sticky-note__shadow" aria-hidden="true" />
            <div className="sticky-note__paper">
              <PaperGrain id="yellow" />
              <div className="sticky-note__body">
                <p className="sticky-note__text">
                  The product strat needs <RedCircle>structure.</RedCircle>
                </p>
              </div>
            </div>
          </div>
          <div className="sticky-note sticky-note--pink">
            <div className="sticky-note__shadow" aria-hidden="true" />
            <div className="sticky-note__paper">
              <PaperGrain id="pink" />
              <div className="sticky-note__body">
                <p className="sticky-note__text">
                  Decisions need <RedCircle>testable</RedCircle> criteria.
                </p>
              </div>
            </div>
          </div>
          <div className="sticky-note sticky-note--blue">
            <div className="sticky-note__shadow" aria-hidden="true" />
            <div className="sticky-note__paper">
              <PaperGrain id="blue" />
              <img
                className="sticky-note__doodle"
                src="/grumpy-face.png"
                alt=""
                aria-hidden="true"
              />
              <div className="sticky-note__body">
                <p className="sticky-note__text">
                  we&apos;ve got to separate the signal from all this{" "}
                  <s>noise.</s>
                </p>
              </div>
            </div>
            <div className="sticky-note__curl" aria-hidden="true" />
          </div>
        </div>
        <p className="band__statement">
          You&apos;ve proven that your venture has legs. Now let&apos;s get it
          leaping forward. I can help you convert that momentum into something
          not only sellable
          <span className="accent">, but testable and investable.</span>
        </p>
      </div>
    </section>

    <section
      className="band"
      id="who-i-work-with"
      aria-labelledby="who-i-work-with-title"
    >
      <div className="band__inner">
        <div className="section-head">
          <SectionLabel number="02">Who I work with</SectionLabel>
          <div className="fit-head">
            <h2 className="section-title" id="who-i-work-with-title">
              If you&apos;re looking for a{" "}
              <s className="pink-strike">decorative</s> advisor,
            </h2>
            <p className="fit-head__aside write-on">
              you&apos;re not looking for me.
            </p>
            <p className="fit-head__lead">
              I work with founders and early-stage teams who have real ambition
              and real constraints. Usually, one of these.
            </p>
          </div>
        </div>
        <ul className="situations">
          {SITUATIONS.map(({ headline, answer }) => (
            <li className="situation" key={answer}>
              <p className="situation__headline">{headline}</p>
              <p className="situation__answer">
                <span aria-hidden="true">→</span> {answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section
      className="band band--cream"
      id="track-record"
      aria-labelledby="track-record-title"
    >
      <div className="band__inner">
        <div className="section-head">
          <SectionLabel number="03">Track record</SectionLabel>
          <h2 className="section-title" id="track-record-title">
            Story first. Then systems.
          </h2>
        </div>
        <div className="stats">
          {STATS.map(({ figure, caption }) => (
            <div className="stat-card" key={figure}>
              <span className="stat-card__figure">{figure}</span>
              <span className="stat-card__caption">{caption}</span>
            </div>
          ))}
        </div>
        <ol className="roles">
          {ROLES.map((r) => (
            <li className="role" key={r.role}>
              <span className="role__years">{r.years}</span>
              <p className="role__title">{r.role}</p>
              <p className="role__org">
                <a
                  className="role__link"
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {r.org} {r.external ? "↗" : "→"}
                </a>
                <br />
                {r.place}
              </p>
              <p className="role__summary">{r.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="story" aria-labelledby="story-title">
      <div className="story__inner">
        <div className="story__copy">
          <h2 className="story__title" id="story-title">
            My work thrives when the feet{" "}
            <span className="accent">leave the edge.</span>
          </h2>
          <p className="story__body">
            I&apos;ve led film productions, held COO and CEO roles and built
            product functions inside early-stage companies, sure. I&apos;ve also
            spent years as a sponsored BASE jumper, skydiver and paragliding
            pilot. There&apos;s a beautiful throughline here:
          </p>
          <p className="story__kicker">
            Making complex, intense, uncertain environments, under enormous
            pressure, <span className="accent">more intuitive</span>,{" "}
            <span className="accent">more aligned</span> and{" "}
            <span className="accent">
              more likely to result in a valuable outcome.
            </span>
          </p>
        </div>
      </div>
    </section>

    <section className="band" id="expertise" aria-labelledby="expertise-title">
      <div className="band__inner">
        <div className="section-head">
          <SectionLabel number="04">Expertise</SectionLabel>
          <h2 className="section-title" id="expertise-title">
            Your <MarkerUnderline variant="bold">10X</MarkerUnderline> teammate.
          </h2>
        </div>
        <div className="expertise-grid">
          {EXPERTISE.map(({ title, items }) => (
            <div className="expertise" key={title}>
              <h3 className="expertise__title">{title}</h3>
              <ul className="expertise__list">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: the list is repeated on purpose for a seamless loop
          <span className="ticker__item" key={`${word}-${i}`}>
            <span>{word}</span>
            <span>×</span>
          </span>
        ))}
      </div>
    </div>

    <section className="band" id="contact" aria-labelledby="contact-title">
      <div className="band__inner contact">
        <SectionLabel number="05">Contact</SectionLabel>
        <h2 className="contact__title" id="contact-title">
          Let&apos;s talk
        </h2>
        <ContactIcons />
        <p className="contact__email">{CONTACT_EMAIL}</p>
      </div>
    </section>
  </Layout>
);
