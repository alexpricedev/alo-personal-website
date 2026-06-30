const sectionLinks = [
  { href: "/#about", label: "About me" },
  { href: "/#who-i-work-with", label: "Who I work with" },
  { href: "/#track-record", label: "Track record" },
  { href: "/#expertise", label: "Expertises" },
] as const;

export const Nav = () => (
  <nav data-component="nav" aria-label="Main navigation">
    <button
      type="button"
      className="nav-toggle"
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label="Menu"
    >
      <span className="nav-toggle__bar" aria-hidden="true" />
      <span className="nav-toggle__bar" aria-hidden="true" />
      <span className="nav-toggle__bar" aria-hidden="true" />
    </button>
    <div id="nav-menu" className="nav-menu">
      <ul>
        {sectionLinks.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <a className="nav-contact" href="/#contact">
        Contact
      </a>
    </div>
  </nav>
);
