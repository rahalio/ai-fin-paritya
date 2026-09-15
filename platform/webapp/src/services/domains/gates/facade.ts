/**
 * Gates Domain Facade
 *
 * High-level API for gates domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { gatesService } from "./gates.service";
// TODO: Import types
// import type { ... } from "./gates.api-types";

/**
 * Gates Facade
 *
 * High-level API for gates operations.
 * Components should use this facade instead of services directly.
 */
export const gatesFacade = {
  /**
   * List gate decisions
   */
  async getGate(...args: Parameters<typeof gatesService.getGate>): Promise<any> {
    return gatesService.getGate(...args);
  }

  /**
   * Stamp an immutable gate decision
   */
  async createGate(...args: Parameters<typeof gatesService.createGate>): Promise<any> {
    return gatesService.createGate(...args);
  }

  /**
   * List sandbox permits
   */
  async getSandbox(...args: Parameters<typeof gatesService.getSandbox>): Promise<any> {
    return gatesService.getSandbox(...args);
  }

  /**
   * Get sandbox permit
   */
  async getSandbox(...args: Parameters<typeof gatesService.getSandbox>): Promise<any> {
    return gatesService.getSandbox(...args);
  }

  /**
   * Extend sandbox permit
   */
  async getExtend(...args: Parameters<typeof gatesService.getExtend>): Promise<any> {
    return gatesService.getExtend(...args);
  }

  /**
   * Revoke sandbox permit
   */
  async getRevoke(...args: Parameters<typeof gatesService.getRevoke>): Promise<any> {
    return gatesService.getRevoke(...args);
  }
};
