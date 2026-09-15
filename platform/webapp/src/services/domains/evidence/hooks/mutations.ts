/**
 * Evidence Mutation Hooks
 *
 * React Query hooks for mutating evidence data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { evidenceService } from "../evidence.service";
// TODO: Import types
// import type { ... } from "../evidence.api-types";

/**
 * Hook to create evidence pack
 *
 * Automatically invalidates evidence queries on success.
 */
export function useCreateEvidencePack() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return evidenceService.createEvidencePack(data);
    },
    {
      invalidateQueries: [["evidence", "EvidencePack"]],
    }
  );
}
