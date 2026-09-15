import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const submitMonitoringMetric_Body = z
  .object({
    useCaseId: z.string(),
    name: z.string(),
    value: z.number(),
    threshold: z.number().optional(),
    segment: z.string().optional(),
    scheduleCron: z.string().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const createFairnessBreach_Body = z
  .object({
    useCaseId: z.string(),
    metricId: z.string(),
    summary: z.string().optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const MonitoringMetricId = z.string();
const MonitoringMetric = z
  .object({
    id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    name: z.string(),
    value: z.number(),
    threshold: z.number().optional(),
    thresholdBreached: z.boolean(),
    segment: z.string().optional(),
    scheduleCron: z.string().optional(),
    observedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const MonitoringMetricListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          name: z.string(),
          value: z.number(),
          threshold: z.number().optional(),
          thresholdBreached: z.boolean(),
          segment: z.string().optional(),
          scheduleCron: z.string().optional(),
          observedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const MonitoringMetricListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              name: z.string(),
              value: z.number(),
              threshold: z.number().optional(),
              thresholdBreached: z.boolean(),
              segment: z.string().optional(),
              scheduleCron: z.string().optional(),
              observedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const MonitoringMetricCreateRequest = z
  .object({
    useCaseId: z.string(),
    name: z.string(),
    value: z.number(),
    threshold: z.number().optional(),
    segment: z.string().optional(),
    scheduleCron: z.string().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const MonitoringMetricResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        name: z.string(),
        value: z.number(),
        threshold: z.number().optional(),
        thresholdBreached: z.boolean(),
        segment: z.string().optional(),
        scheduleCron: z.string().optional(),
        observedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const FairnessBreachStatus = z.enum(['open', 'acknowledged', 'resolved']);
const FairnessBreachId = z.string();
const FairnessBreach = z
  .object({
    id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['open', 'acknowledged', 'resolved']),
    summary: z.string().optional(),
    caseId: z.string().optional(),
    detectedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const FairnessBreachListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['open', 'acknowledged', 'resolved']),
          summary: z.string().optional(),
          caseId: z.string().optional(),
          detectedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const FairnessBreachListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['open', 'acknowledged', 'resolved']),
              summary: z.string().optional(),
              caseId: z.string().optional(),
              detectedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const FairnessBreachCreateRequest = z
  .object({
    useCaseId: z.string(),
    metricId: z.string(),
    summary: z.string().optional(),
  })
  .passthrough();
const FairnessBreachResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['open', 'acknowledged', 'resolved']),
        summary: z.string().optional(),
        caseId: z.string().optional(),
        detectedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  submitMonitoringMetric_Body,
  createFairnessBreach_Body,
  Problem,
  MonitoringMetricId,
  MonitoringMetric,
  MonitoringMetricListData,
  ResponseMeta,
  MonitoringMetricListResponse,
  MonitoringMetricCreateRequest,
  MonitoringMetricResponse,
  FairnessBreachStatus,
  FairnessBreachId,
  FairnessBreach,
  FairnessBreachListData,
  FairnessBreachListResponse,
  FairnessBreachCreateRequest,
  FairnessBreachResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/monitoring/breaches',
    alias: 'listFairnessBreaches',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'useCaseId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'acknowledged', 'resolved']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['open', 'acknowledged', 'resolved']),
                  summary: z.string().optional(),
                  caseId: z.string().optional(),
                  detectedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/monitoring/breaches',
    alias: 'createFairnessBreach',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createFairnessBreach_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^fb_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            metricId: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['open', 'acknowledged', 'resolved']),
            summary: z.string().optional(),
            caseId: z.string().optional(),
            detectedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/monitoring/metrics',
    alias: 'listMonitoringMetrics',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'useCaseId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'thresholdBreached',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  name: z.string(),
                  value: z.number(),
                  threshold: z.number().optional(),
                  thresholdBreached: z.boolean(),
                  segment: z.string().optional(),
                  scheduleCron: z.string().optional(),
                  observedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/monitoring/metrics',
    alias: 'submitMonitoringMetric',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitMonitoringMetric_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mm_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            name: z.string(),
            value: z.number(),
            threshold: z.number().optional(),
            thresholdBreached: z.boolean(),
            segment: z.string().optional(),
            scheduleCron: z.string().optional(),
            observedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
