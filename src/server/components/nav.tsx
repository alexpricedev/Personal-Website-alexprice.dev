import { CALENDLY_URL } from "@server/config";

const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/work-with-me", label: "Work with me", name: "work-with-me" },
];

const ctaLink = {
  href: CALENDLY_URL,
  label: "Book a call",
};

const BurgerMenu = ({ page }: { page: string }) => (
  <div className="dropdown dropdown-end">
    <button type="button" tabIndex={0} className="btn btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span className="sr-only">Menu</span>
    </button>
    <ul className="menu dropdown-content bg-base-200 rounded-box mt-2 z-10 w-52 p-2 shadow">
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
);

export const Nav = ({ page }: { page: string }) => (
  <div className="navbar bg-base-100 px-4 lg:px-8 max-w-7xl mx-auto">
    {/* Tiny screens (<375px): Book a call left, burger right */}
    <div className="navbar-start min-[375px]:hidden">
      <a href={ctaLink.href} className="btn btn-primary">
        {ctaLink.label}
      </a>
    </div>
    <div className="navbar-end min-[375px]:hidden">
      <BurgerMenu page={page} />
    </div>

    {/* Tablet (375px to lg): Alex Price left, burger + Book a call right */}
    <div className="navbar-start hidden min-[375px]:flex lg:hidden">
      <a href="/" className="btn btn-ghost text-xl font-bold">
        Alex Price
      </a>
    </div>
    <div className="navbar-end hidden min-[375px]:flex lg:hidden gap-2">
      <BurgerMenu page={page} />
      <a href={ctaLink.href} className="btn btn-primary">
        {ctaLink.label}
      </a>
    </div>

    {/* Desktop (lg+): Full nav */}
    <div className="navbar-start hidden lg:flex">
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
    <div className="navbar-end hidden lg:flex">
      <a href={ctaLink.href} className="btn btn-primary">
        {ctaLink.label}
      </a>
    </div>
  </div>
);
