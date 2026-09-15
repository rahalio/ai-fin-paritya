'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const NAV = [
  { href: '/registry', label: 'Use-case registry' },
  { href: '/dossiers', label: 'Readiness dossiers' },
  { href: '/gates', label: 'Gate desk' },
  { href: '/sandboxes', label: 'Sandbox permits' },
  { href: '/appeals', label: 'Appeals' },
  { href: '/monitors', label: 'Fairness monitors' },
  { href: '/cases', label: 'Breach cases' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/evidence', label: 'Evidence packs' },
  { href: '/civil-society', label: 'Public summaries' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/login';

  if (hideNav) return <>{children}</>;

  return (
    <div className="min-h-screen">
      <header className="border-b border-clay-200/80 bg-clay-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/registry" className="group flex items-center gap-3">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigoStamp text-sm font-semibold tracking-wide text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.25)]"
            >
              P
            </motion.span>
            <div>
              <div className="font-display text-xl font-semibold text-indigoStamp">Paritya</div>
              <div className="text-xs text-clay-800/70">Customs gate for inclusive-finance AI</div>
            </div>
          </Link>
          <Link href="/login" className="text-sm text-clay-800/80 underline-offset-4 hover:underline">
            Session
          </Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition',
                  active
                    ? 'bg-indigoStamp text-white'
                    : 'text-clay-800/80 hover:bg-clay-100'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
