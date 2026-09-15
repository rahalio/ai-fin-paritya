/**
 * Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/cases.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Case = components["schemas"]["Case"];
export type CaseId = components["schemas"]["CaseId"];
export type CaseListData = components["schemas"]["CaseListData"];
export type CaseStatus = components["schemas"]["CaseStatus"];
export type CaseType = components["schemas"]["CaseType"];
export type CaseCreateRequest = components["schemas"]["CaseCreateRequest"];
export type CaseUpdateRequest = components["schemas"]["CaseUpdateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCaseRequestInput = NonNullable<operations["createCase"]["requestBody"]>["content"]["application/json"];
export type UpdateCaseRequestInput = NonNullable<operations["updateCase"]["requestBody"]>["content"]["application/json"];
export type UpdateCaseRequest = UpdateCaseRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCasesParams = NonNullable<operations["listCases"]["parameters"]["query"]>;
export type GetCaseParams = operations["getCase"]["parameters"]["path"];
export type UpdateCaseParams = operations["updateCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCasesResponse = operations["listCases"]["responses"]["200"]["content"]["application/json"];
export type CreateCaseResponse = operations["createCase"]["responses"]["201"]["content"]["application/json"];
export type GetCaseResponse = operations["getCase"]["responses"]["200"]["content"]["application/json"];
export type UpdateCaseResponse = operations["updateCase"]["responses"]["200"]["content"]["application/json"];


