/**
 * Playbooks Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/playbooks.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Playbook = components["schemas"]["Playbook"];
export type PlaybookId = components["schemas"]["PlaybookId"];
export type PlaybookListData = components["schemas"]["PlaybookListData"];
export type PlaybookUseCaseType = components["schemas"]["PlaybookUseCaseType"];
export type PlaybookCreateRequest = components["schemas"]["PlaybookCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePlaybookRequestInput = NonNullable<operations["createPlaybook"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPlaybooksParams = NonNullable<operations["listPlaybooks"]["parameters"]["query"]>;
export type GetPlaybookParams = operations["getPlaybook"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPlaybooksResponse = operations["listPlaybooks"]["responses"]["200"]["content"]["application/json"];
export type CreatePlaybookResponse = operations["createPlaybook"]["responses"]["201"]["content"]["application/json"];
export type GetPlaybookResponse = operations["getPlaybook"]["responses"]["200"]["content"]["application/json"];


