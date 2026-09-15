/**
 * Playbooks Mutation Hooks
 *
 * React Query hooks for mutating playbooks data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { playbooksService } from "../playbooks.service";
// TODO: Import types
// import type { ... } from "../playbooks.api-types";

/**
 * Hook to create playbook
 *
 * Automatically invalidates playbooks queries on success.
 */
export function useCreatePlaybook() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return playbooksService.createPlaybook(data);
    },
    {
      invalidateQueries: [["playbooks", "Playbook"]],
    }
  );
}
