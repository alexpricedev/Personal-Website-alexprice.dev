import { CONTACT_EMAIL, LINKEDIN_URL } from "@server/config";

const socialLinks = [
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-6">
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
            className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200 py-2"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/about"
          className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200 py-2"
        >
          About
        </a>
      </nav>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
        Sheffield, UK
      </p>
    </div>
  </footer>
);
