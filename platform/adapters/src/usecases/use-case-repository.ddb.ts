/**
 * UseCaseRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: usecases
 */

import type { UseCaseRepository } from "@paritya/services/usecases";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class UseCaseRepositoryDdb implements UseCaseRepository {
  constructor(private readonly dynamoClient: any) {}

  async listUseCases(input: Parameters<UseCaseRepository['listUseCases']>[0]): Promise<Awaited<ReturnType<UseCaseRepository['listUseCases']>>> {
    const table = memoryTable("usecases:use-case-repository.ddb");
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
  async createUseCase(input: Parameters<UseCaseRepository['createUseCase']>[0]): Promise<Awaited<ReturnType<UseCaseRepository['createUseCase']>>> {
    const table = memoryTable("usecases:use-case-repository.ddb");
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
      status: raw.status ?? (("createUseCase".includes("submit") || "createUseCase".includes("Submit")) ? "submitted" : raw.status ?? "draft"),
      immutable: raw.immutable ?? ("createUseCase".toLowerCase().includes("gate") ? true : raw.immutable),
      includesRawPii: raw.includesRawPii ?? false,
      anonymised: raw.anonymised ?? true,
      completenessPct: raw.completenessPct ?? 0,
      thresholdBreached: raw.thresholdBreached ?? (typeof raw.threshold === "number" && typeof raw.value === "number" ? raw.value > raw.threshold : false),
      observedAt: raw.observedAt ?? now,
      decidedAt: raw.decidedAt ?? ("createUseCase".toLowerCase().includes("gate") ? now : raw.decidedAt),
      decidedBy: raw.decidedBy ?? ("createUseCase".toLowerCase().includes("gate") ? "supervisor" : raw.decidedBy),
      providerId: raw.providerId ?? raw.orgId ?? "tnt_demo",
      passed: raw.passed,
      scaleClaimUnlocked: raw.passed === true,
    };
    table.set(String(id), entity);
    // secondary indexes for nested creates
    if (raw.useCaseId) table.set(`byUseCase:${raw.useCaseId}:${id}`, entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
  async getUseCase(input: Parameters<UseCaseRepository['getUseCase']>[0]): Promise<Awaited<ReturnType<UseCaseRepository['getUseCase']>>> {
    const table = memoryTable("usecases:use-case-repository.ddb");
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
  async updateUseCase(input: Parameters<UseCaseRepository['updateUseCase']>[0]): Promise<Awaited<ReturnType<UseCaseRepository['updateUseCase']>>> {
    const table = memoryTable("usecases:use-case-repository.ddb");
    const raw = input as any;
    const id = String(raw.id ?? raw.useCaseId ?? raw.dossierId ?? raw.caseId ?? raw.appealPathId ?? raw.sandboxPermitId ?? "");
    const existing = table.get(id) ?? {};
    const entity = {
      ...existing,
      ...raw,
      id: id || existing.id,
      updatedAt: memoryNow(),
      status: "updateUseCase".toLowerCase().includes("revoke") ? "revoked" : (raw.status ?? existing.status),
    };
    table.set(String(entity.id), entity);
    return { data: entity as any, meta: memoryMeta(raw.correlationId) } as any;
  }
}
