interface DashboardLoginProps {
  error?: string;
}

export const DashboardLogin = ({ error }: DashboardLoginProps) => (
  <html lang="en" style={{ colorScheme: "dark" }}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow" />
      <title>Dashboard</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/main.css" />
    </head>
    <body className="min-h-screen bg-surface-base text-text-primary font-body antialiased flex items-center justify-center px-6">
      <form
        method="POST"
        action="/dashboard/login"
        className="w-full max-w-[380px] bg-surface-1 border border-border rounded-[12px] p-8"
      >
        <h1 className="font-display text-2xl tracking-[-0.02em] mb-2">
          Dashboard
        </h1>
        <p className="text-sm text-text-muted mb-6">
          Enter password to continue.
        </p>
        <label
          className="block font-ui text-[11px] tracking-[0.08em] uppercase text-text-muted mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          className="w-full bg-surface-2 border border-border rounded-[8px] px-4 py-3 text-[15px] font-body text-text-primary focus:border-accent outline-none transition-colors"
        />
        {error && <p className="mt-3 text-sm text-accent font-ui">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full bg-accent text-white font-ui font-semibold text-sm px-6 py-3 rounded-full hover:bg-accent-dim transition-colors"
        >
          Sign in
        </button>
      </form>
    </body>
  </html>
);
