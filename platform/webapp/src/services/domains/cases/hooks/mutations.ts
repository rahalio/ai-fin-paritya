/**
 * Cases Mutation Hooks
 *
 * React Query hooks for mutating cases data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { casesService } from "../cases.service";
// TODO: Import types
// import type { ... } from "../cases.api-types";

/**
 * Hook to create case
 *
 * Automatically invalidates cases queries on success.
 */
export function useCreateCase() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return casesService.createCase(data);
    },
    {
      invalidateQueries: [["cases", "Case"]],
    }
  );
}

/**
 * Hook to update case
 *
 * Automatically invalidates cases queries on success.
 */
export function useUpdateCase() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return casesService.updateCase(data);
    },
    {
      invalidateQueries: [["cases", "Case"]],
    }
  );
}
