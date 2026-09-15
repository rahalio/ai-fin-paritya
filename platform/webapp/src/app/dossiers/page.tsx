'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDossier, listDossiers, listUseCases, submitDossier } from '@/lib/api';
import { useState } from 'react';

export default function DossiersPage() {
  const qc = useQueryClient();
  const dossiers = useQuery({ queryKey: ['dossiers'], queryFn: listDossiers });
  const usecases = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const [useCaseId, setUseCaseId] = useState('');
  const [provenance, setProvenance] = useState('');

  const create = useMutation({
    mutationFn: () =>
      createDossier({
        useCaseId,
        dataProvenance: provenance || 'Local mobile-money graph + thin-file proxies',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dossiers'] });
      setProvenance('');
    },
  });

  const submit = useMutation({
    mutationFn: (id: string) => submitDossier(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dossiers'] }),
  });

  const cases = (usecases.data as any[]) || [];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Readiness dossiers</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Capture provenance, population coverage gaps, thin-file notes, and language access—not only model
        accuracy.
      </p>

      <form
        className="mt-8 grid max-w-xl gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (useCaseId) create.mutate();
        }}
      >
        <label className="text-xs font-medium uppercase tracking-wide">Use case</label>
        <select
          className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={useCaseId}
          onChange={(e) => setUseCaseId(e.target.value)}
        >
          <option value="">Select…</option>
          {cases.map((uc) => (
            <option key={uc.id} value={uc.id}>
              {uc.title}
            </option>
          ))}
        </select>
        <label className="text-xs font-medium uppercase tracking-wide">Data provenance</label>
        <textarea
          className="min-h-[80px] rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={provenance}
          onChange={(e) => setProvenance(e.target.value)}
        />
        <button type="submit" className="w-fit rounded-md bg-indigoStamp px-4 py-2 text-white">
          Create dossier
        </button>
      </form>

      <ul className="mt-10 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {((dossiers.data as any[]) || []).map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <div className="font-medium">{d.id}</div>
              <div className="text-sm text-clay-800/70">
                use case {d.useCaseId} · {d.status} · completeness {d.completenessPct ?? 0}%
              </div>
            </div>
            {d.status !== 'submitted' && d.status !== 'accepted' && (
              <button
                className="rounded-md border border-indigoStamp px-3 py-1.5 text-sm text-indigoStamp"
                onClick={() => submit.mutate(d.id)}
              >
                Submit for gate
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
