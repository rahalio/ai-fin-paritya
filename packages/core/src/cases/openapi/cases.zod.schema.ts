import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCase_Body = z
  .object({
    useCaseId: z.string(),
    type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
    title: z.string().optional(),
    breachId: z.string().optional(),
  })
  .passthrough();
const updateCase_Body = z
  .object({
    status: z.enum(['open', 'investigating', 'closed']),
    remediationNotes: z.string(),
    escalateRevoke: z.boolean(),
    assignedTo: z.string(),
  })
  .partial()
  .passthrough();
const CaseStatus = z.enum(['open', 'investigating', 'closed']);
const CaseType = z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']);
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
const CaseId = z.string();
const Case = z
  .object({
    id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
    status: z.enum(['open', 'investigating', 'closed']),
    title: z.string().optional(),
    remediationNotes: z.string().optional(),
    escalateRevoke: z.boolean().optional(),
    breachId: z.string().optional(),
    assignedTo: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    closedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CaseListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
          status: z.enum(['open', 'investigating', 'closed']),
          title: z.string().optional(),
          remediationNotes: z.string().optional(),
          escalateRevoke: z.boolean().optional(),
          breachId: z.string().optional(),
          assignedTo: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          closedAt: z.string().datetime({ offset: true }).optional(),
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
const CaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
              status: z.enum(['open', 'investigating', 'closed']),
              title: z.string().optional(),
              remediationNotes: z.string().optional(),
              escalateRevoke: z.boolean().optional(),
              breachId: z.string().optional(),
              assignedTo: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              closedAt: z.string().datetime({ offset: true }).optional(),
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
const CaseCreateRequest = z
  .object({
    useCaseId: z.string(),
    type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
    title: z.string().optional(),
    breachId: z.string().optional(),
  })
  .passthrough();
const CaseResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
        status: z.enum(['open', 'investigating', 'closed']),
        title: z.string().optional(),
        remediationNotes: z.string().optional(),
        escalateRevoke: z.boolean().optional(),
        breachId: z.string().optional(),
        assignedTo: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        closedAt: z.string().datetime({ offset: true }).optional(),
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
const CaseUpdateRequest = z
  .object({
    status: z.enum(['open', 'investigating', 'closed']),
    remediationNotes: z.string(),
    escalateRevoke: z.boolean(),
    assignedTo: z.string(),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createCase_Body,
  updateCase_Body,
  CaseStatus,
  CaseType,
  Problem,
  CaseId,
  Case,
  CaseListData,
  ResponseMeta,
  CaseListResponse,
  CaseCreateRequest,
  CaseResponse,
  CaseUpdateRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/cases',
    alias: 'listCases',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'investigating', 'closed']).optional(),
      },
      {
        name: 'type',
        type: 'Query',
        schema: z
          .enum(['fairness_breach', 'appeal', 'sandbox_expiry'])
          .optional(),
      },
      {
        name: 'useCaseId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
                  status: z.enum(['open', 'investigating', 'closed']),
                  title: z.string().optional(),
                  remediationNotes: z.string().optional(),
                  escalateRevoke: z.boolean().optional(),
                  breachId: z.string().optional(),
                  assignedTo: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/cases',
    alias: 'createCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCase_Body,
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
            id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
            status: z.enum(['open', 'investigating', 'closed']),
            title: z.string().optional(),
            remediationNotes: z.string().optional(),
            escalateRevoke: z.boolean().optional(),
            breachId: z.string().optional(),
            assignedTo: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/cases/:caseId',
    alias: 'getCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
            status: z.enum(['open', 'investigating', 'closed']),
            title: z.string().optional(),
            remediationNotes: z.string().optional(),
            escalateRevoke: z.boolean().optional(),
            breachId: z.string().optional(),
            assignedTo: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 404,
        description: `Resource not found`,
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
    method: 'patch',
    path: '/v1/cases/:caseId',
    alias: 'updateCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateCase_Body,
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            type: z.enum(['fairness_breach', 'appeal', 'sandbox_expiry']),
            status: z.enum(['open', 'investigating', 'closed']),
            title: z.string().optional(),
            remediationNotes: z.string().optional(),
            escalateRevoke: z.boolean().optional(),
            breachId: z.string().optional(),
            assignedTo: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 404,
        description: `Resource not found`,
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
