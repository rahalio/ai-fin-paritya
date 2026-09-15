/**
 * EvidencePackRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: evidence
 */

import type { EvidencePackRepository } from "@paritya/services/evidence";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class EvidencePackRepositoryDdb implements EvidencePackRepository {
  constructor(private readonly dynamoClient: any) {}

  async listEvidencePacks(input: Parameters<EvidencePackRepository['listEvidencePacks']>[0]): Promise<Awaited<ReturnType<EvidencePackRepository['listEvidencePacks']>>> {
    const table = memoryTable("evidence:evidence-pack-repository.ddb");
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
  async createEvidencePack(input: Parameters<EvidencePackRepository['createEvidencePack']>[0]): Promise<Awaited<ReturnType<EvidencePackRepository['createEvidencePack']>>> {
    const table = memoryTable("evidence:evidence-pack-repository.ddb");
    const raw = { ...(input as any) };
    const id =
      raw.id ??
      raw.useCaseId ??
      raw.dossierId ??
      raw.caseId ??
      raw.appealPathId ??
      raw.playbookId ??
      raw.evidencePackId ??
      raw.sandboxPermitId ??
      raw.gateDecisionId ??
      `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now = memoryNow();
    const entity = {
      ...raw,
      id,
      createdAt: raw.createdAt ?? now,
      updatedAt: now,
      status: raw.status ?? (("createEvidencePack".includes("submit") || "createEvidencePack".includes("Submit")) ? "submitted" : raw.status ?? "draft"),
      immutable: raw.immutable ?? ("createEvidencePack".toLowerCase().includes("gate") ? true : raw.immutable),
      includesRawPii: raw.includesRawPii ?? false,
      anonymised: raw.anonymised ?? true,
      completenessPct: raw.completenessPct ?? 0,
      thresholdBreached: raw.thresholdBreached ?? (typeof raw.threshold === "number" && typeof raw.value === "number" ? raw.value > raw.threshold : false),
      observedAt: raw.observedAt ?? now,
      decidedAt: raw.decidedAt ?? ("createEvidencePack".toLowerCase().includes("gate") ? now : raw.decidedAt),
      decidedBy: raw.decidedBy ?? ("createEvidencePack".toLowerCase().includes("gate") ? "supervisor" : raw.decidedBy),
      providerId: raw.providerId ?? raw.orgId ?? "tnt_demo",
      passed: raw.passed,
      scaleClaimUnlocked: raw.passed === true,
    };
    table.set(String(id), entity);
    // secondary indexes for nested creates
    if (raw.useCaseId) table.set(`byUseCase:${raw.useCaseId}:${id}`, entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
  async getEvidencePack(input: Parameters<EvidencePackRepository['getEvidencePack']>[0]): Promise<Awaited<ReturnType<EvidencePackRepository['getEvidencePack']>>> {
    const table = memoryTable("evidence:evidence-pack-repository.ddb");
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
