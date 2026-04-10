const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/how-it-works", label: "How it works", name: "how-it-works" },
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
        backseat<span className="text-accent">cto</span>
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
