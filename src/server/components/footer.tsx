import { CONTACT_EMAIL, LINKEDIN_URL } from "@server/config";

const socialLinks = [
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-6">
        <a
          href="/"
          className="font-display text-[15px] tracking-[-0.02em] text-text-muted hover:text-text-primary transition-colors duration-200"
        >
          backseat<span className="text-accent">cto</span>
        </a>
        <nav className="flex flex-wrap gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="text-text-muted hover:text-accent text-sm font-ui transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/about"
            className="text-text-muted hover:text-accent text-sm font-ui transition-colors duration-200"
          >
            About
          </a>
        </nav>
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
          Sheffield, UK
        </p>
      </div>
    </div>
  </footer>
);
