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
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="nav-menu"
    >
      <span className="nav-toggle__box" aria-hidden="true">
        <span className="nav-toggle__bar" />
        <span className="nav-toggle__bar" />
        <span className="nav-toggle__bar" />
      </span>
    </button>
    <div className="nav-menu" id="nav-menu">
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
