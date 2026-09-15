/**
 * Evidence Domain Facade
 *
 * High-level API for evidence domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { evidenceService } from "./evidence.service";
// TODO: Import types
// import type { ... } from "./evidence.api-types";

/**
 * Evidence Facade
 *
 * High-level API for evidence operations.
 * Components should use this facade instead of services directly.
 */
export const evidenceFacade = {
  /**
   * List evidence packs
   */
  async getEvidencePack(...args: Parameters<typeof evidenceService.getEvidencePack>): Promise<any> {
    return evidenceService.getEvidencePack(...args);
  }

  /**
   * Create evidence pack
   */
  async createEvidencePack(...args: Parameters<typeof evidenceService.createEvidencePack>): Promise<any> {
    return evidenceService.createEvidencePack(...args);
  }

  /**
   * Get evidence pack
   */
  async getEvidencePack(...args: Parameters<typeof evidenceService.getEvidencePack>): Promise<any> {
    return evidenceService.getEvidencePack(...args);
  }
};
