/**
 * Monitoring Query Hooks
 *
 * React Query hooks for fetching monitoring data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { monitoringService } from "../monitoring.service";

/**
 * Hook to list monitoring metrics
 *
 * Query key: ["monitoring", "Metric", ]
 */
export function useMetric(params?: Record<string, any>) {
  return useTenantQuery(
    ["monitoring", "Metric", ],
    async (orgId: string, signal?: AbortSignal) => {
      return monitoringService.getMetric(params, signal);
    }
  );
}

/**
 * Hook to list fairness breaches
 *
 * Query key: ["monitoring", "Breach", ]
 */
export function useBreach(params?: Record<string, any>) {
  return useTenantQuery(
    ["monitoring", "Breach", ],
    async (orgId: string, signal?: AbortSignal) => {
      return monitoringService.getBreach(params, signal);
    }
  );
}
