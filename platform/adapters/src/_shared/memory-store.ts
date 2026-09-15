/**
 * Process-wide in-memory entity store for Paritya product domains (local sandbox).
 */

export const memoryTables = new Map<string, Map<string, Record<string, unknown>>>();

export function memoryTable(name: string): Map<string, Record<string, unknown>> {
  let t = memoryTables.get(name);
  if (!t) {
    t = new Map();
    memoryTables.set(name, t);
  }
  return t;
}

export function memoryNow(): string {
  return new Date().toISOString();
}

export function memoryMeta(correlationId?: string) {
  return {
    requestId: crypto.randomUUID?.() ?? `req_${Date.now()}`,
    generatedAt: memoryNow(),
    correlationId,
  };
}
