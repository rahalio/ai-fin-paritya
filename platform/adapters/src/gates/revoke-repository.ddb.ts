/**
 * RevokeRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: gates
 */

import type { RevokeRepository } from "@paritya/services/gates";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class RevokeRepositoryDdb implements RevokeRepository {
  constructor(private readonly dynamoClient: any) {}

  async revokeSandboxPermit(input: Parameters<RevokeRepository['revokeSandboxPermit']>[0]): Promise<Awaited<ReturnType<RevokeRepository['revokeSandboxPermit']>>> {
    const table = memoryTable("gates:revoke-repository.ddb");
    const raw = input as any;
    const id = String(raw.id ?? raw.useCaseId ?? raw.dossierId ?? raw.caseId ?? raw.appealPathId ?? raw.sandboxPermitId ?? "");
    const existing = table.get(id) ?? {};
    const entity = {
      ...existing,
      ...raw,
      id: id || existing.id,
      updatedAt: memoryNow(),
      status: "revokeSandboxPermit".toLowerCase().includes("revoke") ? "revoked" : (raw.status ?? existing.status),
    };
    table.set(String(entity.id), entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
}
