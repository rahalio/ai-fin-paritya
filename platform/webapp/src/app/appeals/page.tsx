'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAppeal, listAppeals, listUseCases } from '@/lib/api';
import { useState } from 'react';

export default function AppealsPage() {
  const qc = useQueryClient();
  const appeals = useQuery({ queryKey: ['appeals'], queryFn: listAppeals });
  const usecases = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const [useCaseId, setUseCaseId] = useState('');
  const [modelVersion, setModelVersion] = useState('v1');
  const [slaHours, setSlaHours] = useState(72);

  const create = useMutation({
    mutationFn: () =>
      createAppeal({
        useCaseId,
        modelVersion,
        slaHours,
        explanationTemplate: 'Plain-language reason for adverse automated decision.',
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appeals'] }),
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Appeal & explanation registry</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Human appeal paths with SLA by model version, plus explanation templates for adverse decisions.
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
        <input
          className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={modelVersion}
          onChange={(e) => setModelVersion(e.target.value)}
          placeholder="Model version"
        />
        <input
          type="number"
          className="w-28 rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={slaHours}
          onChange={(e) => setSlaHours(Number(e.target.value))}
        />
        <button type="submit" className="rounded-md bg-indigoStamp px-4 py-2 text-white">
          Register appeal path
        </button>
      </form>

      <ul className="mt-10 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {((appeals.data as any[]) || []).map((a) => (
          <li key={a.id} className="py-4">
            <div className="font-medium">
              {a.modelVersion} · SLA {a.slaHours}h
            </div>
            <div className="text-sm text-clay-800/70">
              {a.status} · use case {a.useCaseId}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
