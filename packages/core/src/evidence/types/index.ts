/**
 * Evidence Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/evidence.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvidencePack = components["schemas"]["EvidencePack"];
export type EvidencePackId = components["schemas"]["EvidencePackId"];
export type EvidencePackListData = components["schemas"]["EvidencePackListData"];
export type EvidencePackStatus = components["schemas"]["EvidencePackStatus"];
export type EvidencePackCreateRequest = components["schemas"]["EvidencePackCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateEvidencePackRequestInput = NonNullable<operations["createEvidencePack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEvidencePacksParams = NonNullable<operations["listEvidencePacks"]["parameters"]["query"]>;
export type GetEvidencePackParams = operations["getEvidencePack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEvidencePacksResponse = operations["listEvidencePacks"]["responses"]["200"]["content"]["application/json"];
export type CreateEvidencePackResponse = operations["createEvidencePack"]["responses"]["201"]["content"]["application/json"];
export type GetEvidencePackResponse = operations["getEvidencePack"]["responses"]["200"]["content"]["application/json"];


