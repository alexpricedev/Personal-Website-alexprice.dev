const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: "mailto:fractional@alexprice.dev", label: "Email" },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-6">
      <nav className="flex flex-wrap gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
        Sheffield, UK
      </p>
    </div>
  </footer>
);
