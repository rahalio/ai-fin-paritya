/**
 * Gates Domain Contracts
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
 * @see @paritya/core/gates for the source schemas
 */

import { gatesSchemas as coreGatesSchemas } from "@paritya/core/gates";
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
} = coreGatesSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const gatesSchemas = coreGatesSchemas;
