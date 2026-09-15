'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createUseCase, listUseCases } from '@/lib/api';
import { useState } from 'react';

const CATEGORIES = ['credit', 'advice', 'fraud', 'collections', 'other'] as const;

export default function RegistryPage() {
  const qc = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('credit');

  const create = useMutation({
    mutationFn: () => createUseCase({ title, category, coverageGaps: ['thin_file'] }),
    onSuccess: () => {
      setTitle('');
      qc.invalidateQueries({ queryKey: ['usecases'] });
    },
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-semibold text-indigoStamp">Use-case registry</h1>
        <p className="mt-2 max-w-2xl text-clay-800/80">
          Every in-scope AI use case must be registered before production traffic. Coverage gaps read as
          missing stamps on a passport.
        </p>
      </motion.div>

      <form
        className="mt-8 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) create.mutate();
        }}
      >
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide">Title</label>
          <input
            className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thin-file credit score"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide">Category</label>
          <select
            className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-md bg-indigoStamp px-4 py-2 text-white">
          Register use case
        </button>
      </form>

      {isLoading && <p className="mt-6 text-sm">Loading registry…</p>}
      {error && <p className="mt-6 text-sm text-red-700">{(error as Error).message}</p>}

      <ul className="mt-8 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {(data as any[]).map((uc) => (
          <li key={uc.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <div className="font-medium">{uc.title}</div>
              <div className="text-sm text-clay-800/70">
                {uc.category} · {uc.status}
                {uc.coverageGaps?.length ? ` · gaps: ${uc.coverageGaps.join(', ')}` : ''}
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <Link className="text-indigoStamp underline-offset-2 hover:underline" href="/dossiers">
                Open dossier
              </Link>
              <Link className="text-indigoStamp underline-offset-2 hover:underline" href="/gates">
                Gate desk
              </Link>
            </div>
          </li>
        ))}
        {!isLoading && (data as any[]).length === 0 && (
          <li className="py-8 text-sm text-clay-800/70">
            Empty registry — start from a playbook-guided first filing.
          </li>
        )}
      </ul>
    </div>
  );
}
