/**
 * ExtendRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: gates
 */

import type { ExtendRepository } from "@paritya/services/gates";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class ExtendRepositoryDdb implements ExtendRepository {
  constructor(private readonly dynamoClient: any) {}

  async extendSandboxPermit(input: Parameters<ExtendRepository['extendSandboxPermit']>[0]): Promise<Awaited<ReturnType<ExtendRepository['extendSandboxPermit']>>> {
    const table = memoryTable("gates:extend-repository.ddb");
    const raw = input as any;
    const id = String(raw.id ?? raw.useCaseId ?? raw.dossierId ?? raw.caseId ?? raw.appealPathId ?? raw.sandboxPermitId ?? "");
    const existing = table.get(id) ?? {};
    const entity = {
      ...existing,
      ...raw,
      id: id || existing.id,
      updatedAt: memoryNow(),
      status: "extendSandboxPermit".toLowerCase().includes("revoke") ? "revoked" : (raw.status ?? existing.status),
    };
    table.set(String(entity.id), entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
}
