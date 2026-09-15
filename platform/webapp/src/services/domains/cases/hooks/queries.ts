/**
 * Cases Query Hooks
 *
 * React Query hooks for fetching cases data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { casesService } from "../cases.service";

/**
 * Hook to list cases
 *
 * Query key: ["cases", "Case", ]
 */
export function useCase(params?: Record<string, any>) {
  return useTenantQuery(
    ["cases", "Case", ],
    async (orgId: string, signal?: AbortSignal) => {
      return casesService.getCase(params, signal);
    }
  );
}

/**
 * Hook to get case
 *
 * Query key: ["cases", "Case", caseId]
 */
export function useCase(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["cases", "Case", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return casesService.getCase(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
