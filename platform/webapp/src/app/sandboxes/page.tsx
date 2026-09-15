'use client';

import { useQuery } from '@tanstack/react-query';
import { listSandboxes } from '@/lib/api';

export default function SandboxesPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ['sandboxes'], queryFn: listSandboxes });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-saffron">Sandbox permit board</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Time-boxed permits with exit criteria. Expired sandboxes cannot silently remain in production.
      </p>
      {isLoading && <p className="mt-6 text-sm">Loading…</p>}
      <ul className="mt-8 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {(data as any[]).map((s) => (
          <li key={s.id} className="py-4">
            <div className="font-medium">{s.id}</div>
            <div className="text-sm text-clay-800/70">
              {s.status} · expires {s.expiresAt}
              {s.exitCriteria?.length ? ` · exit: ${s.exitCriteria.join('; ')}` : ''}
            </div>
          </li>
        ))}
        {!isLoading && (data as any[]).length === 0 && (
          <li className="py-8 text-sm text-clay-800/70">No active sandbox permits.</li>
        )}
      </ul>
    </div>
  );
}
