import type { Metadata } from 'next';
import { Literata, IBM_Plex_Sans } from 'next/font/google';
import { AppProviders } from '@/components/providers';
import { AppShell } from '@/components/app-shell';
import './globals.css';

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Paritya',
  description: 'Supervisory readiness and fairness governance for inclusive-finance AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${literata.variable} ${plex.variable}`}>
      <body className="font-sans antialiased">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
