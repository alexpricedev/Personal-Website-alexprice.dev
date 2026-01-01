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
  <div className="navbar bg-base-100 px-4 lg:px-8 max-w-7xl mx-auto">
    <div className="navbar-start">
      <a href="/" className="btn btn-ghost text-xl font-bold">
        Alex Price
      </a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 gap-2">
        {navLinks.map(({ href, label, name }) => (
          <li key={name}>
            <a
              href={href}
              className={page === name ? "active" : ""}
              aria-current={page === name ? "page" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="navbar-end">
      <a href={ctaLink.href} className="btn btn-primary">
        {ctaLink.label}
      </a>
    </div>
  </div>
);
