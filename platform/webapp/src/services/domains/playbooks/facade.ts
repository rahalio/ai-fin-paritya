/**
 * Playbooks Domain Facade
 *
 * High-level API for playbooks domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { playbooksService } from "./playbooks.service";
// TODO: Import types
// import type { ... } from "./playbooks.api-types";

/**
 * Playbooks Facade
 *
 * High-level API for playbooks operations.
 * Components should use this facade instead of services directly.
 */
export const playbooksFacade = {
  /**
   * List playbooks
   */
  async getPlaybook(...args: Parameters<typeof playbooksService.getPlaybook>): Promise<any> {
    return playbooksService.getPlaybook(...args);
  }

  /**
   * Create playbook
   */
  async createPlaybook(...args: Parameters<typeof playbooksService.createPlaybook>): Promise<any> {
    return playbooksService.createPlaybook(...args);
  }

  /**
   * Get playbook
   */
  async getPlaybook(...args: Parameters<typeof playbooksService.getPlaybook>): Promise<any> {
    return playbooksService.getPlaybook(...args);
  }
};
