'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEvidencePack, listEvidencePacks, listUseCases } from '@/lib/api';
import { useState } from 'react';

export default function EvidencePage() {
  const qc = useQueryClient();
  const packs = useQuery({ queryKey: ['evidence'], queryFn: listEvidencePacks });
  const usecases = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const [useCaseId, setUseCaseId] = useState('');

  const create = useMutation({
    mutationFn: () => createEvidencePack({ useCaseId, includesRawPii: false }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['evidence'] }),
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Evidence packs</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Supervisor-ready exports without default raw customer-level datasets.
      </p>

      <form
        className="mt-8 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (useCaseId) create.mutate();
        }}
      >
        <select
          className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={useCaseId}
          onChange={(e) => setUseCaseId(e.target.value)}
        >
          <option value="">Use case…</option>
          {((usecases.data as any[]) || []).map((uc) => (
            <option key={uc.id} value={uc.id}>
              {uc.title}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-md bg-indigoStamp px-4 py-2 text-white">
          Request aggregated pack
        </button>
      </form>

      <ul className="mt-10 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {((packs.data as any[]) || []).map((p) => (
          <li key={p.id} className="py-4">
            <div className="font-medium">{p.id}</div>
            <div className="text-sm text-clay-800/70">
              {p.status} · raw PII={String(p.includesRawPii)} · use case {p.useCaseId}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
