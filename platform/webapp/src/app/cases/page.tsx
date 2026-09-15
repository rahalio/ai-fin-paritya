'use client';

import { useQuery } from '@tanstack/react-query';
import { listCases } from '@/lib/api';

export default function CasesPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ['cases'], queryFn: listCases });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Breach / investigation cases</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Remediation workspace for fairness breaches, appeals, and sandbox expiry — with escalate-to-revoke.
      </p>
      {isLoading && <p className="mt-6 text-sm">Loading…</p>}
      <ul className="mt-8 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {(data as any[]).map((c) => (
          <li key={c.id} className="py-4">
            <div className="font-medium">{c.title || c.type}</div>
            <div className="text-sm text-clay-800/70">
              {c.status} · {c.type}
              {c.escalateRevoke ? ' · escalate revoke' : ''}
            </div>
          </li>
        ))}
        {!isLoading && (data as any[]).length === 0 && (
          <li className="py-8 text-sm text-clay-800/70">No open cases.</li>
        )}
      </ul>
    </div>
  );
}
