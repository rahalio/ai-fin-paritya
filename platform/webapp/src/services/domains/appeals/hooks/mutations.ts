/**
 * Appeals Mutation Hooks
 *
 * React Query hooks for mutating appeals data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { appealsService } from "../appeals.service";
// TODO: Import types
// import type { ... } from "../appeals.api-types";

/**
 * Hook to create appeal path
 *
 * Automatically invalidates appeals queries on success.
 */
export function useCreateAppeal() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return appealsService.createAppeal(data);
    },
    {
      invalidateQueries: [["appeals", "Appeal"]],
    }
  );
}

/**
 * Hook to update appeal path
 *
 * Automatically invalidates appeals queries on success.
 */
export function useUpdateAppeal() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return appealsService.updateAppeal(data);
    },
    {
      invalidateQueries: [["appeals", "Appeal"]],
    }
  );
}
