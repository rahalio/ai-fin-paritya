/**
 * Playbooks Query Hooks
 *
 * React Query hooks for fetching playbooks data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { playbooksService } from "../playbooks.service";

/**
 * Hook to list playbooks
 *
 * Query key: ["playbooks", "Playbook", ]
 */
export function usePlaybook(params?: Record<string, any>) {
  return useTenantQuery(
    ["playbooks", "Playbook", ],
    async (orgId: string, signal?: AbortSignal) => {
      return playbooksService.getPlaybook(params, signal);
    }
  );
}

/**
 * Hook to get playbook
 *
 * Query key: ["playbooks", "Playbook", playbookId]
 */
export function usePlaybook(playbookId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["playbooks", "Playbook", playbookId],
    async (orgId: string, signal?: AbortSignal) => {
      return playbooksService.getPlaybook(playbookId, params, signal);
    },
    {
      enabled: !!playbookId
    }
  );
}
