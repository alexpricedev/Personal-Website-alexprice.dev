const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/work-with-me", label: "Work with me", name: "work-with-me" },
];

const ctaLink = {
  href: "https://calendly.com/alexprice",
  label: "Book a call",
};

export const Nav = ({ page }: { page: string }) => (
  <nav aria-label="Main navigation">
    <a href="/" className="nav-wordmark">
      Alex Price
    </a>
    <div className="nav-links">
      <ul>
        {navLinks.map(({ href, label, name }) => (
          <li key={name}>
            <a
              href={href}
              className={page === name ? "active" : undefined}
              aria-current={page === name ? "page" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href={ctaLink.href} className="btn btn-primary nav-cta">
        {ctaLink.label}
      </a>
    </div>
  </nav>
);
