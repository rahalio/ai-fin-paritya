/**
 * Usecases Query Hooks
 *
 * React Query hooks for fetching usecases data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { usecasesService } from "../usecases.service";

/**
 * Hook to list use cases for the current tenant
 *
 * Query key: ["usecases", "UseCase", ]
 */
export function useUseCase(params?: Record<string, any>) {
  return useTenantQuery(
    ["usecases", "UseCase", ],
    async (orgId: string, signal?: AbortSignal) => {
      return usecasesService.getUseCase(params, signal);
    }
  );
}

/**
 * Hook to get a use case
 *
 * Query key: ["usecases", "UseCase", useCaseId]
 */
export function useUseCase(useCaseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["usecases", "UseCase", useCaseId],
    async (orgId: string, signal?: AbortSignal) => {
      return usecasesService.getUseCase(useCaseId, params, signal);
    },
    {
      enabled: !!useCaseId
    }
  );
}
