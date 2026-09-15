export function PageHeader({
  title,
  subtitle,
  stamp,
}: {
  title: string;
  subtitle: string;
  stamp?: 'indigo' | 'saffron' | 'monitor';
}) {
  const stampClass =
    stamp === 'saffron'
      ? 'border-saffron text-saffron'
      : stamp === 'monitor'
        ? 'border-monitor text-monitor'
        : 'border-indigoStamp text-indigoStamp';
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-clay-900">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-clay-800/75">{subtitle}</p>
      </div>
      <div
        className={`hidden sm:flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed text-[10px] font-semibold uppercase tracking-widest animate-stamp ${stampClass}`}
      >
        Gate
      </div>
    </div>
  );
}
