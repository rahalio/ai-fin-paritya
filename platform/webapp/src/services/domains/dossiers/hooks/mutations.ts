/**
 * Dossiers Mutation Hooks
 *
 * React Query hooks for mutating dossiers data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { dossiersService } from "../dossiers.service";
// TODO: Import types
// import type { ... } from "../dossiers.api-types";

/**
 * Hook to create dossier
 *
 * Automatically invalidates dossiers queries on success.
 */
export function useCreateDossier() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return dossiersService.createDossier(data);
    },
    {
      invalidateQueries: [["dossiers", "Dossier"]],
    }
  );
}

/**
 * Hook to submit dossier for gate review
 *
 * Automatically invalidates dossiers queries on success.
 */
export function useCreateDossier() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return dossiersService.createDossier(data);
    },
    {
      invalidateQueries: [["dossiers", "Dossier"]],
    }
  );
}

/**
 * Hook to upsert checklist item
 *
 * Automatically invalidates dossiers queries on success.
 */
export function useGetChecklistItem() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return dossiersService.getChecklistItem(data);
    },
    {
      invalidateQueries: [["dossiers", "ChecklistItem"]],
    }
  );
}

/**
 * Hook to create language test
 *
 * Automatically invalidates dossiers queries on success.
 */
export function useCreateLanguageTest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return dossiersService.createLanguageTest(data);
    },
    {
      invalidateQueries: [["dossiers", "LanguageTest"]],
    }
  );
}
