/**
 * LanguageTestRepositoryDdb — in-memory sandbox implementation (handwritten over codegen stub).
 * Domain: dossiers
 */

import type { LanguageTestRepository } from "@paritya/services/dossiers";
import { memoryTable, memoryNow, memoryMeta } from "../_shared/memory-store.js";

export class LanguageTestRepositoryDdb implements LanguageTestRepository {
  constructor(private readonly dynamoClient: any) {}

  async createLanguageTest(input: Parameters<LanguageTestRepository['createLanguageTest']>[0]): Promise<Awaited<ReturnType<LanguageTestRepository['createLanguageTest']>>> {
    const table = memoryTable("dossiers:language-test-repository.ddb");
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
      status: raw.status ?? (("createLanguageTest".includes("submit") || "createLanguageTest".includes("Submit")) ? "submitted" : raw.status ?? "draft"),
      immutable: raw.immutable ?? ("createLanguageTest".toLowerCase().includes("gate") ? true : raw.immutable),
      includesRawPii: raw.includesRawPii ?? false,
      anonymised: raw.anonymised ?? true,
      completenessPct: raw.completenessPct ?? 0,
      thresholdBreached: raw.thresholdBreached ?? (typeof raw.threshold === "number" && typeof raw.value === "number" ? raw.value > raw.threshold : false),
      observedAt: raw.observedAt ?? now,
      decidedAt: raw.decidedAt ?? ("createLanguageTest".toLowerCase().includes("gate") ? now : raw.decidedAt),
      decidedBy: raw.decidedBy ?? ("createLanguageTest".toLowerCase().includes("gate") ? "supervisor" : raw.decidedBy),
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
