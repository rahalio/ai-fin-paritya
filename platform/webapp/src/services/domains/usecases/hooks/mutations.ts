/**
 * Usecases Mutation Hooks
 *
 * React Query hooks for mutating usecases data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { usecasesService } from "../usecases.service";
// TODO: Import types
// import type { ... } from "../usecases.api-types";

/**
 * Hook to register a use case
 *
 * Automatically invalidates usecases queries on success.
 */
export function useCreateUseCase() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return usecasesService.createUseCase(data);
    },
    {
      invalidateQueries: [["usecases", "UseCase"]],
    }
  );
}

/**
 * Hook to update use-case metadata
 *
 * Automatically invalidates usecases queries on success.
 */
export function useUpdateUseCase() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return usecasesService.updateUseCase(data);
    },
    {
      invalidateQueries: [["usecases", "UseCase"]],
    }
  );
}
