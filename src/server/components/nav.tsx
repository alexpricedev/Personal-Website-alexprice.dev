const navLinks = [
  { href: "/assessment", label: "Free Assessment", name: "assessment" },
  { href: "/writing", label: "Writing", name: "writing" },
  { href: "/about", label: "About", name: "about" },
];

export const Nav = ({ page }: { page: string }) => (
  <nav className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border">
    <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 lg:px-10 h-16">
      {/* Brand */}
      <a
        href="/"
        className="font-display text-[18px] tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200 py-2 px-1 font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="inline-block text-accent"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="m21.948 11.684l-2-6A.997.997 0 0 0 19 5h-3v2h2.279l1.334 4H15c-1.103 0-2 .897-2 2h-2c0-1.103-.897-2-2-2H4.387l1.334-4H8V5H5a.998.998 0 0 0-.948.684l-2 6l.012.004A.928.928 0 0 0 2 12v4c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-1h2v1c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-4a.964.964 0 0 0-.063-.313l.011-.003zM9 16c0 .551-.448 1-1 1H5c-.552 0-1-.449-1-1v-3h5v3zm11 0c0 .551-.448 1-1 1h-3c-.552 0-1-.449-1-1v-3h5v3z"
          />
        </svg>
        <span className="ml-2">Alex Price</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-ui font-medium py-3 transition-colors duration-200 ${
              page === name
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
            aria-current={page === name ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right side: CTA + mobile burger */}
      <div className="flex items-center gap-4">
        <a
          href="/vibe-code-audit"
          className="hidden min-[375px]:inline-flex items-center bg-accent text-white font-ui font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
        >
          Get your code audited
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary bg-surface-1/60 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
          data-menu-toggle
        >
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
        </button>
      </div>
    </div>

    {/* Mobile menu (hidden by default, toggled via JS) */}
    <div
      className="hidden md:hidden border-t border-border bg-surface-1 relative z-50"
      data-mobile-menu
    >
      <div className="px-6 py-4 flex flex-col gap-3">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-ui font-medium py-2 transition-colors duration-200 ${
              page === name
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
            aria-current={page === name ? "page" : undefined}
          >
            {label}
          </a>
        ))}
        <a
          href="/vibe-code-audit"
          className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-sm px-5 py-2.5 rounded-full mt-2"
        >
          Get your code audited
        </a>
      </div>
    </div>
  </nav>
);
