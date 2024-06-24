import Navbar from 'components/layout/navbar';
import { Providers } from 'components/providers';
import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from 'lib/utils/utils';
import { ReactNode } from 'react';
import './globals.css';

const SITE_NAME = process.env.SITE_NAME || '<Shop>';

const SITE_BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

const TWITTER_CONFIG = {
  creator: process.env.TWITTER_CREATOR
    ? ensureStartsWith(process.env.TWITTER_CREATOR, '@')
    : undefined,
  site: process.env.TWITTER_SITE
    ? ensureStartsWith(process.env.TWITTER_SITE, 'https://')
    : undefined
};

export const metadata = {
  metadataBase: new URL(SITE_BASE_URL!),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(Object.values(TWITTER_CONFIG).every(Boolean) && {
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_CONFIG.creator,
      site: TWITTER_CONFIG.site
    }
  })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
