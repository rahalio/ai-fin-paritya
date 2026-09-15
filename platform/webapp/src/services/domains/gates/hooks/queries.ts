/**
 * Gates Query Hooks
 *
 * React Query hooks for fetching gates data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { gatesService } from "../gates.service";

/**
 * Hook to list gate decisions
 *
 * Query key: ["gates", "Gate", useCaseId]
 */
export function useGate(useCaseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["gates", "Gate", useCaseId],
    async (orgId: string, signal?: AbortSignal) => {
      return gatesService.getGate(useCaseId, params, signal);
    },
    {
      enabled: !!useCaseId
    }
  );
}

/**
 * Hook to list sandbox permits
 *
 * Query key: ["gates", "Sandbox", ]
 */
export function useSandbox(params?: Record<string, any>) {
  return useTenantQuery(
    ["gates", "Sandbox", ],
    async (orgId: string, signal?: AbortSignal) => {
      return gatesService.getSandbox(params, signal);
    }
  );
}

/**
 * Hook to get sandbox permit
 *
 * Query key: ["gates", "Sandbox", sandboxPermitId]
 */
export function useSandbox(sandboxPermitId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["gates", "Sandbox", sandboxPermitId],
    async (orgId: string, signal?: AbortSignal) => {
      return gatesService.getSandbox(sandboxPermitId, params, signal);
    },
    {
      enabled: !!sandboxPermitId
    }
  );
}
