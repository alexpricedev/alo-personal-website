import { Layout } from "@server/components/layouts";
import { CONTACT_MAILTO } from "@server/constants/contact";

export const Home = () => (
  <Layout title="Annette Lyn O'Neil" name="home">
    <div className="home-stack">
      <section
        className="stack-slab stack-slab--hero"
        id="hero"
        aria-label="Introduction"
      >
        <div className="hero-layers" aria-hidden="true" />
        <div className="stack-slab__inner hero-inner">
          <div className="hero-top">
            <p className="hero-role">
              <span className="hero-role__text">
                Product Leader × Early-Stage Operational Design × Force
                Multiplier
              </span>
            </p>
          </div>

          <div className="hero-stage">
            <div className="hero-name-group">
              <div className="hero-name-split-left" aria-hidden="true">
                <span className="hero-name-line">
                  <span className="hero-name-accent">A</span>
                  <span className="hero-name-rest">NNETTE</span>
                </span>
                <span className="hero-name-line">
                  <span className="hero-name-accent">L</span>
                  <span className="hero-name-rest">YN</span>
                </span>
              </div>
              <div className="hero-name-split-right" aria-hidden="true">
                <span className="hero-name-line">
                  <span className="hero-name-accent">O</span>
                  <span className="hero-name-rest">&apos;NEIL</span>
                </span>
              </div>
            </div>
            <h1 className="visually-hidden">Annette Lyn O&apos;Neil</h1>
          </div>

          <div className="hero-ledger">
            <p className="hero-kicker">
              For founders who&apos;ve already sold the vision and now need the
              product to catch up.
            </p>
            <div className="hero-sub-wrap">
              <p className="hero-sub">
                You raised the money. Now the real work starts. I work with
                repeat founders to{" "}
                <strong>turn fresh funding into validated product</strong> by
                bringing an unusually effective blend of{" "}
                <strong>product rigor</strong>, <strong>narrative skill</strong>{" "}
                and <strong>muscular bias-to-action</strong>—especially in
                moments where <strong>stakes</strong> and{" "}
                <strong>ambiguity</strong> are both high.
              </p>
            </div>
            <div className="hero-actions">
              <a className="hero-cta" href={CONTACT_MAILTO}>
                Work with me
              </a>
            </div>
          </div>

          <p className="hero-scroll-hint">
            <span className="hero-scroll-hint__line" aria-hidden="true" />
            <span className="hero-scroll-hint__label">Scroll</span>
          </p>
        </div>
      </section>

      <section className="stack-slab stack-slab--about" id="about">
        <div className="stack-slab__inner stack-slab__inner--wide">
          <h2 className="slab-title slab-span-full">How I think</h2>
          <div className="slab-two-col">
            <div className="slab-col">
              <p className="pov-lead">
                Founders are often strongest at selling the future before
                they&apos;ve built the machine that can reach it. That&apos;s
                normal. But after the raise, the work changes. Product needs
                structure. Decisions need criteria. Signals need to be separated
                from noise. I come in at that hinge point: helping teams turn
                momentum into something <strong>real</strong>,{" "}
                <strong>testable</strong>, and <strong>investable</strong>.
              </p>
              <blockquote className="pull-quote">
                If you&apos;re looking for a decorative advisor, you&apos;re{" "}
                <em>not</em> looking for me.
              </blockquote>
            </div>
            <div className="slab-col">
              <h3 className="slab-subtitle slab-subtitle--flush">
                Story × Systems
              </h3>
              <p className="text-secondary">
                I learned story first. Then systems. Now I build products with
                both. Before product, I ran complex productions with large
                budgets, hard deadlines, and no tolerance for confusion. Later,
                I scaled teams, led companies, and built product functions
                inside early-stage businesses. Today, that cross-training is the
                point.
              </p>
              <p className="text-secondary story-narrative">
                My career has never followed a single-lane track. I&apos;ve led
                film productions, scaled an organization from 3 to around 50
                people, held COO and CEO roles, and taken products from early
                concept toward real market maturity. I&apos;ve also developed an
                intimate relationship with risk—as a sponsored athlete across
                BASE jumping, skydiving and paragliding. Across all of it, the
                throughline has stayed the same: making complex phenomena{" "}
                <strong>more intuitive</strong>,{" "}
                <strong>more coordinated</strong>, and{" "}
                <strong>more likely to succeed</strong> under pressure.
              </p>
              <p className="pull-quote-inline">
                My work thrives when the feet leave the aircraft door: where{" "}
                <strong>vision</strong> meets <strong>operating reality</strong>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="stack-slab stack-slab--who-i-work-with"
        id="who-i-work-with"
        aria-label="Who I work with"
      >
        <div className="stack-slab__inner stack-slab__inner--wide who-i-work-with-inner">
          <h2 className="slab-title slab-span-full">Who I work with</h2>
          <p className="who-intro text-secondary">
            I work with founders and early-stage teams who have real ambition
            and real constraints.
          </p>
          <ul className="who-circles">
            <li className="who-circle who-circle--pink who-circle--pos-1">
              <p>
                You&apos;ve raised and need to turn capital into disciplined
                product progress
              </p>
            </li>
            <li className="who-circle who-circle--blue who-circle--pos-2">
              <p>
                You&apos;ve shipped a V1 but traction is muddy and the next move
                is unclear
              </p>
            </li>
            <li className="who-circle who-circle--sky who-circle--pos-3">
              <p>
                You&apos;re approaching the next raise and need better PMF
                signals, product logic, and operational credibility
              </p>
            </li>
            <li className="who-circle who-circle--yellow who-circle--pos-4">
              <p>
                You&apos;re carrying too much operational debt and need someone
                to impose structure without slowing the team down
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="stack-slab stack-slab--track" id="track-record">
        <div className="stack-slab__inner stack-slab__inner--wide">
          <h2 className="slab-title slab-span-full">Track record</h2>
          <div className="proof-grid">
            <article className="proof-block">
              <header>
                <h3 className="proof-role">Head of Product</h3>
                <p className="proof-meta">Just · 2023–2025</p>
              </header>
              <p className="text-secondary">
                Took an integration-heavy SaaS product from Alpha toward Beta
                while building stronger product vision, roadmap discipline,
                cross-functional collaboration, and user-centered feedback
                systems.
              </p>
              <ul className="proof-outcomes">
                <li>
                  Defined and refined product vision and roadmap across user,
                  client, and business needs
                </li>
                <li>
                  Introduced data-informed decision-making through dashboards
                  and visualisation
                </li>
                <li>
                  Led collaborative specification, prototyping, and
                  cross-functional product development
                </li>
              </ul>
              <p className="proof-proves">
                <strong>What this proves:</strong> I can build product clarity
                and operating rhythm in an early-stage environment without
                losing speed.
              </p>
            </article>

            <article className="proof-block">
              <header>
                <h3 className="proof-role">
                  Product Manager, Integrations / Product Audit Lead
                </h3>
                <p className="proof-meta">Ecologi · 2022–2023</p>
              </header>
              <p className="text-secondary">
                Entered through a SaaS product audit and helped install stronger
                product thinking, metrics, and organizational clarity.
              </p>
              <ul className="proof-outcomes">
                <li>
                  Introduced product principles and supported their
                  operationalisation
                </li>
                <li>
                  Built the organisation&apos;s first central product metrics
                  dashboard
                </li>
                <li>
                  Helped move internal confidence in product goals and success
                  criteria from below 3/10 to 9+/10
                </li>
              </ul>
              <p className="proof-proves">
                <strong>What this proves:</strong> I can diagnose ambiguity,
                create alignment, and materially raise confidence in the product
                function.
              </p>
            </article>

            <article className="proof-block">
              <header>
                <h3 className="proof-role">COO to CEO</h3>
                <p className="proof-meta">Clearview · 2018–2023</p>
              </header>
              <p className="text-secondary">
                Helped lead and scale the organisation through operational,
                strategic, and leadership complexity.
              </p>
              <ul className="proof-outcomes">
                <li>Grew headcount from 3 to approximately 50</li>
                <li>
                  Oversaw operations, investment logic, financial performance,
                  and organisational growth
                </li>
                <li>
                  Consulted on product best practices, leadership, UX, data, and
                  content structure for early-stage clients
                </li>
              </ul>
              <p className="proof-proves">
                <strong>What this proves:</strong> I understand leadership and
                growth considerably beyond the product silo.
              </p>
            </article>

            <article className="proof-block">
              <header>
                <h3 className="proof-role">Producer / Logistician</h3>
                <p className="proof-meta">
                  Film &amp; Commercial Production · 2003–2020
                </p>
              </header>
              <p className="text-secondary">
                Led productions with budgets up to £6m across demanding,
                multi-stakeholder environments.
              </p>
              <ul className="proof-outcomes">
                <li>
                  Managed budget, schedule, payroll, logistics, and
                  cross-functional coordination under pressure
                </li>
                <li>
                  Built bespoke bids for projects involving gravity sports
                  content
                </li>
                <li>
                  Developed calm, precise execution habits in high-stakes
                  settings
                </li>
              </ul>
              <p className="proof-proves">
                <strong>What this proves:</strong> My product leadership is
                built on an unusually thoroughgoing operational backbone.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="stack-slab stack-slab--expertise" id="expertise">
        <div className="stack-slab__inner stack-slab__inner--wide">
          <h2 className="slab-title slab-span-full">What I do</h2>
          <div className="slab-two-col slab-two-col--expertise">
            <div className="slab-col">
              <p className="expertise-lead text-secondary">
                I help developing teams become more than the sum of their
                operational parts.
              </p>
              <ul className="expertise-actions bullet-list">
                <li>
                  turn a loose vision into a coherent, shippable, navigable
                  roadmap
                </li>
                <li>
                  install product science and operating discipline across
                  prioritisation, specs, metrics, and feedback loops
                </li>
                <li>
                  identify where traction problems are product problems,
                  positioning problems, or operating problems
                </li>
                <li>
                  build the internal clarity investors, teams, and founders need
                  to keep moving
                </li>
                <li>create stronger decision-making under uncertainty</li>
              </ul>
              <blockquote className="pull-quote pull-quote--tight">
                I don&apos;t just add hands. I add leverage.
              </blockquote>
            </div>
            <div className="slab-col">
              <h3 className="slab-subtitle slab-subtitle--flush">Expertise</h3>
              <div className="expertise-grid">
                <div className="expertise-cluster">
                  <h4>Product direction</h4>
                  <ul>
                    <li>Product strategy</li>
                    <li>Roadmapping</li>
                    <li>Prioritisation</li>
                    <li>Product discovery</li>
                    <li>PMF signal development</li>
                  </ul>
                </div>
                <div className="expertise-cluster">
                  <h4>Operating system</h4>
                  <ul>
                    <li>Product specs</li>
                    <li>Feedback loops</li>
                    <li>Metrics and dashboards</li>
                    <li>Cross-functional rituals</li>
                    <li>Team alignment</li>
                  </ul>
                </div>
                <div className="expertise-cluster">
                  <h4>Founder support</h4>
                  <ul>
                    <li>Founder advisory</li>
                    <li>Early-stage decision support</li>
                    <li>Org clarity</li>
                    <li>Product audits</li>
                    <li>Pre-raise product maturity</li>
                  </ul>
                </div>
                <div className="expertise-cluster">
                  <h4>Narrative and signal</h4>
                  <ul>
                    <li>Messaging clarity</li>
                    <li>Information architecture</li>
                    <li>Copy strategy</li>
                    <li>User research synthesis</li>
                    <li>Decision communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="stack-slab stack-slab--testimonials"
        id="testimonials"
        aria-label="Testimonials"
      >
        <div className="stack-slab__inner stack-slab__inner--wide">
          <div className="slab-two-col slab-two-col--testimonials">
            <div className="slab-col">
              <h2 className="slab-title">Testimonials</h2>
              <p className="text-secondary testimonial-placeholder">
                Placeholder — selected quotes and headshots coming soon.
              </p>
            </div>
            <div className="slab-col">
              <div className="testimonial-grid" aria-hidden="true">
                <div className="testimonial-slot" />
                <div className="testimonial-slot" />
                <div className="testimonial-slot" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stack-slab stack-slab--contact" id="contact">
        <div className="stack-slab__inner stack-slab__inner--wide contact-inner">
          <div className="contact-panel">
            <h2 className="slab-title slab-title--contact">Let&apos;s talk</h2>
            <p className="contact-lead text-secondary">
              If you&apos;re building in the messy, risk-rich middle between
              vision and product maturity, let&apos;s talk.
            </p>
            <ul className="contact-icons" aria-label="Contact links">
              <li>
                <a className="contact-icon-link" href={CONTACT_MAILTO}>
                  <span className="visually-hidden">Email</span>
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="contact-icon-link"
                  href="https://www.linkedin.com/in/annettelynoneil"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="visually-hidden">LinkedIn</span>
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="contact-icon-link"
                  href="https://www.instagram.com/nettenette"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="visually-hidden">Instagram</span>
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.67-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
