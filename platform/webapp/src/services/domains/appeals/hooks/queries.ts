/**
 * Appeals Query Hooks
 *
 * React Query hooks for fetching appeals data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { appealsService } from "../appeals.service";

/**
 * Hook to list appeal paths
 *
 * Query key: ["appeals", "Appeal", ]
 */
export function useAppeal(params?: Record<string, any>) {
  return useTenantQuery(
    ["appeals", "Appeal", ],
    async (orgId: string, signal?: AbortSignal) => {
      return appealsService.getAppeal(params, signal);
    }
  );
}

/**
 * Hook to get appeal path
 *
 * Query key: ["appeals", "Appeal", appealPathId]
 */
export function useAppeal(appealPathId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["appeals", "Appeal", appealPathId],
    async (orgId: string, signal?: AbortSignal) => {
      return appealsService.getAppeal(appealPathId, params, signal);
    },
    {
      enabled: !!appealPathId
    }
  );
}
