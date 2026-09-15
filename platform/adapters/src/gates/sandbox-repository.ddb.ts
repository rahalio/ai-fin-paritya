/**
 * SandboxRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: gates
 */

import type { SandboxRepository } from "@paritya/services/gates";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class SandboxRepositoryDdb implements SandboxRepository {
  constructor(private readonly dynamoClient: any) {}

  async listSandboxPermits(input: Parameters<SandboxRepository['listSandboxPermits']>[0]): Promise<Awaited<ReturnType<SandboxRepository['listSandboxPermits']>>> {
    const table = memoryTable("gates:sandbox-repository.ddb");
    const items = Array.from(table.values());
    const filtered = items.filter((row) => {
      if (!input || typeof input !== "object") return true;
      for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
        if (v === undefined || v === null || k === "cursor" || k === "limit" || k === "correlationId" || k === "orgId") continue;
        if (row[k] !== undefined && row[k] !== v) return false;
      }
      return true;
    });
    return { data: { items: filtered as any }, meta: memoryMeta((input as any)?.correlationId) } as any;
  }
  async getSandboxPermit(input: Parameters<SandboxRepository['getSandboxPermit']>[0]): Promise<Awaited<ReturnType<SandboxRepository['getSandboxPermit']>>> {
    const table = memoryTable("gates:sandbox-repository.ddb");
    const raw = input as any;
    const id = String(raw.id ?? raw.useCaseId ?? raw.dossierId ?? raw.caseId ?? raw.appealPathId ?? raw.playbookId ?? raw.evidencePackId ?? raw.sandboxPermitId ?? "");
    const entity = table.get(id);
    if (!entity) {
      const err: any = new Error("Not found");
      err.statusCode = 404;
      throw err;
    }
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
}
