const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: "mailto:jobs@alexprice.dev", label: "jobs@alexprice.dev" },
];

export const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-links">
        {socialLinks.map((link, index) => (
          <span key={link.label}>
            <a href={link.href}>{link.label}</a>
            {index < socialLinks.length - 1 && (
              <span className="footer-separator"> · </span>
            )}
          </span>
        ))}
      </div>
    </div>
  </footer>
);
