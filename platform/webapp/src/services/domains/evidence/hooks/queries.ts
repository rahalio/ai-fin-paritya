/**
 * Evidence Query Hooks
 *
 * React Query hooks for fetching evidence data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { evidenceService } from "../evidence.service";

/**
 * Hook to list evidence packs
 *
 * Query key: ["evidence", "EvidencePack", ]
 */
export function useEvidencePack(params?: Record<string, any>) {
  return useTenantQuery(
    ["evidence", "EvidencePack", ],
    async (orgId: string, signal?: AbortSignal) => {
      return evidenceService.getEvidencePack(params, signal);
    }
  );
}

/**
 * Hook to get evidence pack
 *
 * Query key: ["evidence", "EvidencePack", evidencePackId]
 */
export function useEvidencePack(evidencePackId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["evidence", "EvidencePack", evidencePackId],
    async (orgId: string, signal?: AbortSignal) => {
      return evidenceService.getEvidencePack(evidencePackId, params, signal);
    },
    {
      enabled: !!evidencePackId
    }
  );
}
