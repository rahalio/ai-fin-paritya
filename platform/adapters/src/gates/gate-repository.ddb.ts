/**
 * GateRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: gates
 */

import type { GateRepository } from "@paritya/services/gates";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class GateRepositoryDdb implements GateRepository {
  constructor(private readonly dynamoClient: any) {}

  async listGateDecisions(input: Parameters<GateRepository['listGateDecisions']>[0]): Promise<Awaited<ReturnType<GateRepository['listGateDecisions']>>> {
    const table = memoryTable("gates:gate-repository.ddb");
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
  async createGateDecision(input: Parameters<GateRepository['createGateDecision']>[0]): Promise<Awaited<ReturnType<GateRepository['createGateDecision']>>> {
    const table = memoryTable("gates:gate-repository.ddb");
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
      status: raw.status ?? (("createGateDecision".includes("submit") || "createGateDecision".includes("Submit")) ? "submitted" : raw.status ?? "draft"),
      immutable: raw.immutable ?? ("createGateDecision".toLowerCase().includes("gate") ? true : raw.immutable),
      includesRawPii: raw.includesRawPii ?? false,
      anonymised: raw.anonymised ?? true,
      completenessPct: raw.completenessPct ?? 0,
      thresholdBreached: raw.thresholdBreached ?? (typeof raw.threshold === "number" && typeof raw.value === "number" ? raw.value > raw.threshold : false),
      observedAt: raw.observedAt ?? now,
      decidedAt: raw.decidedAt ?? ("createGateDecision".toLowerCase().includes("gate") ? now : raw.decidedAt),
      decidedBy: raw.decidedBy ?? ("createGateDecision".toLowerCase().includes("gate") ? "supervisor" : raw.decidedBy),
      providerId: raw.providerId ?? raw.orgId ?? "tnt_demo",
      passed: raw.passed,
      scaleClaimUnlocked: raw.passed === true,
    };
    table.set(String(id), entity);
    // secondary indexes for nested creates
    if (raw.useCaseId) table.set(`byUseCase:${raw.useCaseId}:${id}`, entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
}
