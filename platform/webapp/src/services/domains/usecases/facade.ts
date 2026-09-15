/**
 * Usecases Domain Facade
 *
 * High-level API for usecases domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { usecasesService } from "./usecases.service";
// TODO: Import types
// import type { ... } from "./usecases.api-types";

/**
 * Usecases Facade
 *
 * High-level API for usecases operations.
 * Components should use this facade instead of services directly.
 */
export const usecasesFacade = {
  /**
   * List use cases for the current tenant
   */
  async getUseCase(...args: Parameters<typeof usecasesService.getUseCase>): Promise<any> {
    return usecasesService.getUseCase(...args);
  }

  /**
   * Register a use case
   */
  async createUseCase(...args: Parameters<typeof usecasesService.createUseCase>): Promise<any> {
    return usecasesService.createUseCase(...args);
  }

  /**
   * Get a use case
   */
  async getUseCase(...args: Parameters<typeof usecasesService.getUseCase>): Promise<any> {
    return usecasesService.getUseCase(...args);
  }

  /**
   * Update use-case metadata
   */
  async updateUseCase(...args: Parameters<typeof usecasesService.updateUseCase>): Promise<any> {
    return usecasesService.updateUseCase(...args);
  }
};
