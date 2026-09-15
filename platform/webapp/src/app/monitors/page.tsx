'use client';

import { useQuery } from '@tanstack/react-query';
import { listBreaches, listMetrics } from '@/lib/api';

export default function MonitorsPage() {
  const metrics = useQuery({ queryKey: ['metrics'], queryFn: listMetrics });
  const breaches = useQuery({ queryKey: ['breaches'], queryFn: listBreaches });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-monitor">Fairness monitors</h1>
      <p className="mt-2 max-w-2xl text-clay-800/80">
        Scheduled fairness and exclusion metrics. Threshold breaches open investigation cases.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl">Metrics</h2>
        <ul className="mt-3 divide-y divide-clay-200/80 border-t border-clay-200/80">
          {((metrics.data as any[]) || []).map((m) => (
            <li key={m.id} className="py-3 text-sm">
              <span className="font-medium">{m.name}</span> = {m.value}
              {m.thresholdBreached ? (
                <span className="ml-2 text-saffron">breached</span>
              ) : (
                <span className="ml-2 text-monitor">on time</span>
              )}
            </li>
          ))}
          {!metrics.isLoading && ((metrics.data as any[]) || []).length === 0 && (
            <li className="py-6 text-clay-800/70">No metrics submitted yet.</li>
          )}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl">Breaches</h2>
        <ul className="mt-3 divide-y divide-clay-200/80 border-t border-clay-200/80">
          {((breaches.data as any[]) || []).map((b) => (
            <li key={b.id} className="py-3 text-sm">
              {b.status} · metric {b.metricId} · {b.summary || 'Fairness threshold breach'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
