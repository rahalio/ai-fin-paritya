/**
 * Monitoring Domain Contracts
 *
 * Re-exports Zod schemas from @paritya/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @paritya/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @paritya/core/monitoring for the source schemas
 */

import { monitoringSchemas as coreMonitoringSchemas } from "@paritya/core/monitoring";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreMonitoringSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const monitoringSchemas = coreMonitoringSchemas;
