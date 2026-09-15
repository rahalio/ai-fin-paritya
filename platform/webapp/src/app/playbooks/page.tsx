'use client';

import { useQuery } from '@tanstack/react-query';
import { listPlaybooks } from '@/lib/api';

export default function PlaybooksPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ['playbooks'], queryFn: listPlaybooks });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">South-South playbook library</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Anonymised readiness patterns by use-case type — share learning without firm secrets.
      </p>
      {isLoading && <p className="mt-6 text-sm">Loading…</p>}
      <ul className="mt-8 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {(data as any[]).map((p) => (
          <li key={p.id} className="py-4">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-clay-800/70">
              {p.useCaseType} · {p.summary || 'Template'}
            </div>
          </li>
        ))}
        {!isLoading && (data as any[]).length === 0 && (
          <li className="py-8 text-sm text-clay-800/70">No playbooks published yet.</li>
        )}
      </ul>
    </div>
  );
}
