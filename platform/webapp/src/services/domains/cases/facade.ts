/**
 * Cases Domain Facade
 *
 * High-level API for cases domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { casesService } from "./cases.service";
// TODO: Import types
// import type { ... } from "./cases.api-types";

/**
 * Cases Facade
 *
 * High-level API for cases operations.
 * Components should use this facade instead of services directly.
 */
export const casesFacade = {
  /**
   * List cases
   */
  async getCase(...args: Parameters<typeof casesService.getCase>): Promise<any> {
    return casesService.getCase(...args);
  }

  /**
   * Create case
   */
  async createCase(...args: Parameters<typeof casesService.createCase>): Promise<any> {
    return casesService.createCase(...args);
  }

  /**
   * Get case
   */
  async getCase(...args: Parameters<typeof casesService.getCase>): Promise<any> {
    return casesService.getCase(...args);
  }

  /**
   * Update case
   */
  async updateCase(...args: Parameters<typeof casesService.updateCase>): Promise<any> {
    return casesService.updateCase(...args);
  }
};
