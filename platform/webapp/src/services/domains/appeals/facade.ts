/**
 * Appeals Domain Facade
 *
 * High-level API for appeals domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { appealsService } from "./appeals.service";
// TODO: Import types
// import type { ... } from "./appeals.api-types";

/**
 * Appeals Facade
 *
 * High-level API for appeals operations.
 * Components should use this facade instead of services directly.
 */
export const appealsFacade = {
  /**
   * List appeal paths
   */
  async getAppeal(...args: Parameters<typeof appealsService.getAppeal>): Promise<any> {
    return appealsService.getAppeal(...args);
  }

  /**
   * Create appeal path
   */
  async createAppeal(...args: Parameters<typeof appealsService.createAppeal>): Promise<any> {
    return appealsService.createAppeal(...args);
  }

  /**
   * Get appeal path
   */
  async getAppeal(...args: Parameters<typeof appealsService.getAppeal>): Promise<any> {
    return appealsService.getAppeal(...args);
  }

  /**
   * Update appeal path
   */
  async updateAppeal(...args: Parameters<typeof appealsService.updateAppeal>): Promise<any> {
    return appealsService.updateAppeal(...args);
  }
};
