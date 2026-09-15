/**
 * Gates Mutation Hooks
 *
 * React Query hooks for mutating gates data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { gatesService } from "../gates.service";
// TODO: Import types
// import type { ... } from "../gates.api-types";

/**
 * Hook to stamp an immutable gate decision
 *
 * Automatically invalidates gates queries on success.
 */
export function useCreateGate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gatesService.createGate(data);
    },
    {
      invalidateQueries: [["gates", "Gate"]],
    }
  );
}

/**
 * Hook to extend sandbox permit
 *
 * Automatically invalidates gates queries on success.
 */
export function useGetExtend() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gatesService.getExtend(data);
    },
    {
      invalidateQueries: [["gates", "Extend"]],
    }
  );
}

/**
 * Hook to revoke sandbox permit
 *
 * Automatically invalidates gates queries on success.
 */
export function useGetRevoke() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gatesService.getRevoke(data);
    },
    {
      invalidateQueries: [["gates", "Revoke"]],
    }
  );
}
