const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: "mailto:jobs@alexprice.dev", label: "jobs@alexprice.dev" },
];

export const Footer = () => (
  <footer className="footer footer-center bg-base-200 text-base-content p-8">
    <nav className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((link) => (
        <a key={link.label} href={link.href} className="link link-hover">
          {link.label}
        </a>
      ))}
    </nav>
  </footer>
);
