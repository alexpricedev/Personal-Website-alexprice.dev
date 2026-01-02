const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  {
    href: "mailto:fractional@alexprice.dev",
    label: "fractional@alexprice.dev",
  },
];

export const Footer = () => (
  <footer className="footer flex-col bg-base-200 text-base-content p-8 items-center">
    <nav className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          {link.label}
        </a>
      ))}
    </nav>
    <p className="text-base-content/40 text-sm text-center">
      Based in Sheffield, UK – working with founders globally
    </p>
  </footer>
);
