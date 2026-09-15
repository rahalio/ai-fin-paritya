'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGateDecision, listGateDecisions, listUseCases } from '@/lib/api';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OUTCOMES = ['approve', 'conditional', 'reject', 'sandbox', 'revoke'] as const;

export default function GatesPage() {
  const qc = useQueryClient();
  const usecases = useQuery({ queryKey: ['usecases'], queryFn: listUseCases });
  const [useCaseId, setUseCaseId] = useState('');
  const [outcome, setOutcome] = useState<(typeof OUTCOMES)[number]>('conditional');
  const [rationale, setRationale] = useState('');
  const [stamped, setStamped] = useState<string | null>(null);

  useEffect(() => {
    const first = (usecases.data as any[])?.[0]?.id;
    if (first && !useCaseId) setUseCaseId(first);
  }, [usecases.data, useCaseId]);

  const gates = useQuery({
    queryKey: ['gates', useCaseId],
    queryFn: () => listGateDecisions(useCaseId),
    enabled: Boolean(useCaseId),
  });

  const stamp = useMutation({
    mutationFn: () =>
      createGateDecision(useCaseId, {
        outcome,
        rationale,
        expiresAt:
          outcome === 'sandbox'
            ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString()
            : undefined,
        exitCriteria: outcome === 'sandbox' ? ['Pass language access tests', 'Fairness monitor on time'] : undefined,
        conditions: outcome === 'conditional' ? ['Weekly fairness metrics required'] : undefined,
      }),
    onSuccess: (data: any) => {
      setStamped(data?.outcome ?? outcome);
      qc.invalidateQueries({ queryKey: ['gates', useCaseId] });
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-indigoStamp">Gate desk</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Immutable approve / conditional / reject / sandbox / revoke stamps by named authority.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <select
          className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={useCaseId}
          onChange={(e) => setUseCaseId(e.target.value)}
        >
          {((usecases.data as any[]) || []).map((uc) => (
            <option key={uc.id} value={uc.id}>
              {uc.title}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value as any)}
        >
          {OUTCOMES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <input
          className="min-w-[240px] flex-1 rounded-md border border-clay-200 bg-white/80 px-3 py-2"
          placeholder="Rationale"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
        />
        <button
          className="rounded-md bg-indigoStamp px-4 py-2 text-white"
          onClick={() => stamp.mutate()}
          disabled={!useCaseId}
        >
          Stamp decision
        </button>
      </div>

      {stamped && (
        <motion.div
          key={stamped}
          initial={{ scale: 1.2, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          className="mt-6 inline-block rounded-md border-2 border-indigoStamp px-4 py-2 font-display text-lg uppercase tracking-widest text-indigoStamp"
        >
          {stamped} — stamped
        </motion.div>
      )}

      <ul className="mt-10 divide-y divide-clay-200/80 border-t border-clay-200/80">
        {((gates.data as any[]) || []).map((g) => (
          <li key={g.id} className="py-4">
            <div className="font-medium capitalize text-indigoStamp">{g.outcome}</div>
            <div className="text-sm text-clay-800/70">
              by {g.decidedBy} · {g.decidedAt} · immutable={String(g.immutable)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
