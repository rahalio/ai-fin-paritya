/**
 * Appeals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/appeals.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AppealPath = components["schemas"]["AppealPath"];
export type AppealPathId = components["schemas"]["AppealPathId"];
export type AppealPathListData = components["schemas"]["AppealPathListData"];
export type AppealPathStatus = components["schemas"]["AppealPathStatus"];
export type AppealPathCreateRequest = components["schemas"]["AppealPathCreateRequest"];
export type AppealPathUpdateRequest = components["schemas"]["AppealPathUpdateRequest"];
export type Appeal = operations["listAppealPaths"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAppealPathRequestInput = NonNullable<operations["createAppealPath"]["requestBody"]>["content"]["application/json"];
export type UpdateAppealPathRequestInput = NonNullable<operations["updateAppealPath"]["requestBody"]>["content"]["application/json"];
export type UpdateAppealPathRequest = UpdateAppealPathRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAppealPathsParams = NonNullable<operations["listAppealPaths"]["parameters"]["query"]>;
export type GetAppealPathParams = operations["getAppealPath"]["parameters"]["path"];
export type UpdateAppealPathParams = operations["updateAppealPath"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAppealPathsResponse = operations["listAppealPaths"]["responses"]["200"]["content"]["application/json"];
export type CreateAppealPathResponse = operations["createAppealPath"]["responses"]["201"]["content"]["application/json"];
export type GetAppealPathResponse = operations["getAppealPath"]["responses"]["200"]["content"]["application/json"];
export type UpdateAppealPathResponse = operations["updateAppealPath"]["responses"]["200"]["content"]["application/json"];


