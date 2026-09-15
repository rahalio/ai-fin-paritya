/**
 * Dossiers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dossiers.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChecklistItem = components["schemas"]["ChecklistItem"];
export type ChecklistItemId = components["schemas"]["ChecklistItemId"];
export type ChecklistItemStatus = components["schemas"]["ChecklistItemStatus"];
export type CoverageGap = components["schemas"]["CoverageGap"];
export type DossierId = components["schemas"]["DossierId"];
export type DossierStatus = components["schemas"]["DossierStatus"];
export type LanguageLiteracyTest = components["schemas"]["LanguageLiteracyTest"];
export type LanguageTestId = components["schemas"]["LanguageTestId"];
export type ReadinessDossier = components["schemas"]["ReadinessDossier"];
export type ReadinessDossierListData = components["schemas"]["ReadinessDossierListData"];
export type ChecklistItemUpsertRequest = components["schemas"]["ChecklistItemUpsertRequest"];
export type LanguageTestCreateRequest = components["schemas"]["LanguageTestCreateRequest"];
export type ReadinessDossierCreateRequest = components["schemas"]["ReadinessDossierCreateRequest"];
export type Dossier = operations["listDossiers"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDossierRequestInput = NonNullable<operations["createDossier"]["requestBody"]>["content"]["application/json"];
export type UpsertChecklistItemRequestInput = NonNullable<operations["upsertChecklistItem"]["requestBody"]>["content"]["application/json"];
export type CreateLanguageTestRequestInput = NonNullable<operations["createLanguageTest"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDossiersParams = NonNullable<operations["listDossiers"]["parameters"]["query"]>;
export type GetDossierParams = operations["getDossier"]["parameters"]["path"];
export type SubmitDossierParams = operations["submitDossier"]["parameters"]["path"];
export type UpsertChecklistItemParams = operations["upsertChecklistItem"]["parameters"]["path"];
export type CreateLanguageTestParams = operations["createLanguageTest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDossiersResponse = operations["listDossiers"]["responses"]["200"]["content"]["application/json"];
export type CreateDossierResponse = operations["createDossier"]["responses"]["201"]["content"]["application/json"];
export type GetDossierResponse = operations["getDossier"]["responses"]["200"]["content"]["application/json"];
export type SubmitDossierResponse = operations["submitDossier"]["responses"]["200"]["content"]["application/json"];
export type UpsertChecklistItemResponse = operations["upsertChecklistItem"]["responses"]["200"]["content"]["application/json"];
export type CreateLanguageTestResponse = operations["createLanguageTest"]["responses"]["201"]["content"]["application/json"];


