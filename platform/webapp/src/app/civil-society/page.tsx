'use client';

import { useQuery } from '@tanstack/react-query';
import { listEvidencePacks, listUseCases } from '@/lib/api';

export default function CivilSocietyPage() {
  const usecases = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const packs = useQuery({ queryKey: ['evidence'], queryFn: listEvidencePacks });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Public readiness summaries</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Non-confidential readiness summaries for civil-society and ombuds accountability.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl">Registered use cases</h2>
        <ul className="mt-3 divide-y divide-clay-200/80 border-t border-clay-200/80">
          {((usecases.data as any[]) || []).map((uc) => (
            <li key={uc.id} className="py-3 text-sm">
              <span className="font-medium">{uc.title}</span> — {uc.category} · stage {uc.status}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl">Published summaries</h2>
        <ul className="mt-3 divide-y divide-clay-200/80 border-t border-clay-200/80">
          {((packs.data as any[]) || [])
            .filter((p) => p.civilSocietySummary || !p.includesRawPii)
            .map((p) => (
              <li key={p.id} className="py-3 text-sm">
                {p.civilSocietySummary || `Aggregated readiness pack for ${p.useCaseId}`}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
