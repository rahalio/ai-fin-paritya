/**
 * Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type GateDecision = components["schemas"]["GateDecision"];
export type GateDecisionId = components["schemas"]["GateDecisionId"];
export type GateDecisionListData = components["schemas"]["GateDecisionListData"];
export type GateOutcome = components["schemas"]["GateOutcome"];
export type SandboxPermit = components["schemas"]["SandboxPermit"];
export type SandboxPermitId = components["schemas"]["SandboxPermitId"];
export type SandboxPermitListData = components["schemas"]["SandboxPermitListData"];
export type SandboxPermitStatus = components["schemas"]["SandboxPermitStatus"];
export type GateDecisionCreateRequest = components["schemas"]["GateDecisionCreateRequest"];
export type SandboxExtendRequest = components["schemas"]["SandboxExtendRequest"];
export type Gate = operations["listGateDecisions"]["responses"]["200"]["content"]["application/json"]["data"];
export type Sandbox = operations["listSandboxPermits"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateGateDecisionRequestInput = NonNullable<operations["createGateDecision"]["requestBody"]>["content"]["application/json"];
export type ExtendSandboxPermitRequestInput = NonNullable<operations["extendSandboxPermit"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGateDecisionsParams = NonNullable<operations["listGateDecisions"]["parameters"]["query"]>;
export type CreateGateDecisionParams = operations["createGateDecision"]["parameters"]["path"];
export type ListSandboxPermitsParams = NonNullable<operations["listSandboxPermits"]["parameters"]["query"]>;
export type GetSandboxPermitParams = operations["getSandboxPermit"]["parameters"]["path"];
export type ExtendSandboxPermitParams = operations["extendSandboxPermit"]["parameters"]["path"];
export type RevokeSandboxPermitParams = operations["revokeSandboxPermit"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListGateDecisionsResponse = operations["listGateDecisions"]["responses"]["200"]["content"]["application/json"];
export type CreateGateDecisionResponse = operations["createGateDecision"]["responses"]["201"]["content"]["application/json"];
export type ListSandboxPermitsResponse = operations["listSandboxPermits"]["responses"]["200"]["content"]["application/json"];
export type GetSandboxPermitResponse = operations["getSandboxPermit"]["responses"]["200"]["content"]["application/json"];
export type ExtendSandboxPermitResponse = operations["extendSandboxPermit"]["responses"]["200"]["content"]["application/json"];
export type RevokeSandboxPermitResponse = operations["revokeSandboxPermit"]["responses"]["200"]["content"]["application/json"];


