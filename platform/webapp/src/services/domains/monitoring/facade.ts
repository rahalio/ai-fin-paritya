/**
 * Monitoring Domain Facade
 *
 * High-level API for monitoring domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { monitoringService } from "./monitoring.service";
// TODO: Import types
// import type { ... } from "./monitoring.api-types";

/**
 * Monitoring Facade
 *
 * High-level API for monitoring operations.
 * Components should use this facade instead of services directly.
 */
export const monitoringFacade = {
  /**
   * List monitoring metrics
   */
  async getMetric(...args: Parameters<typeof monitoringService.getMetric>): Promise<any> {
    return monitoringService.getMetric(...args);
  }

  /**
   * Submit a monitoring metric (machine / API key)
   */
  async createMetric(...args: Parameters<typeof monitoringService.createMetric>): Promise<any> {
    return monitoringService.createMetric(...args);
  }

  /**
   * List fairness breaches
   */
  async getBreach(...args: Parameters<typeof monitoringService.getBreach>): Promise<any> {
    return monitoringService.getBreach(...args);
  }

  /**
   * Create fairness breach
   */
  async createBreach(...args: Parameters<typeof monitoringService.createBreach>): Promise<any> {
    return monitoringService.createBreach(...args);
  }
};
