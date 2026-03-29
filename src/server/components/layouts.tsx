import type React from "react";

import { getAssetUrl } from "../services/assets";
import { Logo } from "./logo";
import { Nav } from "./nav";

const SITE_URL = "https://www.annettelynoneil.com";
const SITE_DESCRIPTION =
  "For founders who've already sold the vision and now need the product to catch up.";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

interface LayoutProps {
  title: string;
  name: string;
  children: React.ReactNode;
}

export function Layout({ title, name, children }: LayoutProps) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Rock+Salt&family=Special+Gothic+Expanded+One&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {GA_MEASUREMENT_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_MEASUREMENT_ID)});`,
              }}
            />
          </>
        ) : null}
        <link rel="stylesheet" href={getAssetUrl("/assets/main.css")} />
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                preact: "https://esm.sh/preact@10.28.4",
                "preact/hooks": "https://esm.sh/preact@10.28.4/hooks",
                "preact/jsx-dev-runtime":
                  "https://esm.sh/preact@10.28.4/jsx-dev-runtime",
                "preact/jsx-runtime":
                  "https://esm.sh/preact@10.28.4/jsx-runtime",
              },
            }),
          }}
        />
      </head>
      <body data-page={name} data-component="layout">
        <header>
          {name !== "home" && (
            <a href="/" className="logo">
              <Logo />
              <span>Annette Lyn O&apos;Neil</span>
            </a>
          )}
          <Nav />
        </header>
        <main>{children}</main>
        <footer id="site-footer">
          <span>
            © {new Date().getFullYear()} - 🧡 SYTECH | Sheffield - Site by{" "}
            <a href="https://chptrs.tech">ထCHPTRS</a>
          </span>
        </footer>
        <script type="module" src={getAssetUrl("/assets/main.js")} />
      </body>
    </html>
  );
}

interface BaseLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function BaseLayout({ title, children }: BaseLayoutProps) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{title}</title>
        <link rel="stylesheet" href={getAssetUrl("/assets/main.css")} />
      </head>
      <body>{children}</body>
    </html>
  );
}
