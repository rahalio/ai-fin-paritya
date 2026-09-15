/**
 * Monitoring Mutation Hooks
 *
 * React Query hooks for mutating monitoring data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { monitoringService } from "../monitoring.service";
// TODO: Import types
// import type { ... } from "../monitoring.api-types";

/**
 * Hook to submit a monitoring metric (machine / api key)
 *
 * Automatically invalidates monitoring queries on success.
 */
export function useCreateMetric() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return monitoringService.createMetric(data);
    },
    {
      invalidateQueries: [["monitoring", "Metric"]],
    }
  );
}

/**
 * Hook to create fairness breach
 *
 * Automatically invalidates monitoring queries on success.
 */
export function useCreateBreach() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return monitoringService.createBreach(data);
    },
    {
      invalidateQueries: [["monitoring", "Breach"]],
    }
  );
}
