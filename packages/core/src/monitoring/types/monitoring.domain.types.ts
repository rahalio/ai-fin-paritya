/**
 * Monitoring Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/monitoring.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FairnessBreach = components["schemas"]["FairnessBreach"];
export type FairnessBreachId = components["schemas"]["FairnessBreachId"];
export type FairnessBreachListData = components["schemas"]["FairnessBreachListData"];
export type FairnessBreachStatus = components["schemas"]["FairnessBreachStatus"];
export type MonitoringMetric = components["schemas"]["MonitoringMetric"];
export type MonitoringMetricId = components["schemas"]["MonitoringMetricId"];
export type MonitoringMetricListData = components["schemas"]["MonitoringMetricListData"];
export type FairnessBreachCreateRequest = components["schemas"]["FairnessBreachCreateRequest"];
export type MonitoringMetricCreateRequest = components["schemas"]["MonitoringMetricCreateRequest"];
export type Metric = operations["listMonitoringMetrics"]["responses"]["200"]["content"]["application/json"]["data"];
export type Breach = operations["listFairnessBreaches"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitMonitoringMetricRequestInput = NonNullable<operations["submitMonitoringMetric"]["requestBody"]>["content"]["application/json"];
export type CreateFairnessBreachRequestInput = NonNullable<operations["createFairnessBreach"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMonitoringMetricsParams = NonNullable<operations["listMonitoringMetrics"]["parameters"]["query"]>;
export type ListFairnessBreachesParams = NonNullable<operations["listFairnessBreaches"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMonitoringMetricsResponse = operations["listMonitoringMetrics"]["responses"]["200"]["content"]["application/json"];
export type SubmitMonitoringMetricResponse = operations["submitMonitoringMetric"]["responses"]["201"]["content"]["application/json"];
export type ListFairnessBreachesResponse = operations["listFairnessBreaches"]["responses"]["200"]["content"]["application/json"];
export type CreateFairnessBreachResponse = operations["createFairnessBreach"]["responses"]["201"]["content"]["application/json"];


