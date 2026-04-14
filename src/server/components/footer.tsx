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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="inline-block text-accent"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="m21.948 11.684l-2-6A.997.997 0 0 0 19 5h-3v2h2.279l1.334 4H15c-1.103 0-2 .897-2 2h-2c0-1.103-.897-2-2-2H4.387l1.334-4H8V5H5a.998.998 0 0 0-.948.684l-2 6l.012.004A.928.928 0 0 0 2 12v4c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-1h2v1c0 1.654 1.346 3 3 3h3c1.654 0 3-1.346 3-3v-4a.964.964 0 0 0-.063-.313l.011-.003zM9 16c0 .551-.448 1-1 1H5c-.552 0-1-.449-1-1v-3h5v3zm11 0c0 .551-.448 1-1 1h-3c-.552 0-1-.449-1-1v-3h5v3z"
            />
          </svg>
          <span className="ml-1.5">Alex Price</span>
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
