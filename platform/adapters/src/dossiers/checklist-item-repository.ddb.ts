/**
 * ChecklistItemRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: dossiers
 */

import type { ChecklistItemRepository } from "@paritya/services/dossiers";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class ChecklistItemRepositoryDdb implements ChecklistItemRepository {
  constructor(private readonly dynamoClient: any) {}

  async upsertChecklistItem(input: Parameters<ChecklistItemRepository['upsertChecklistItem']>[0]): Promise<Awaited<ReturnType<ChecklistItemRepository['upsertChecklistItem']>>> {
    const table = memoryTable("dossiers:checklist-item-repository.ddb");
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
}
