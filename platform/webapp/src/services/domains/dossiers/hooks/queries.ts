/**
 * Dossiers Query Hooks
 *
 * React Query hooks for fetching dossiers data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { dossiersService } from "../dossiers.service";

/**
 * Hook to list dossiers
 *
 * Query key: ["dossiers", "Dossier", ]
 */
export function useDossier(params?: Record<string, any>) {
  return useTenantQuery(
    ["dossiers", "Dossier", ],
    async (orgId: string, signal?: AbortSignal) => {
      return dossiersService.getDossier(params, signal);
    }
  );
}

/**
 * Hook to get dossier
 *
 * Query key: ["dossiers", "Dossier", dossierId]
 */
export function useDossier(dossierId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["dossiers", "Dossier", dossierId],
    async (orgId: string, signal?: AbortSignal) => {
      return dossiersService.getDossier(dossierId, params, signal);
    },
    {
      enabled: !!dossierId
    }
  );
}
