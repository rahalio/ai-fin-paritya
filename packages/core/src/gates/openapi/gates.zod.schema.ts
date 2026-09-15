import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createGateDecision_Body = z
  .object({
    outcome: z.enum(['approve', 'conditional', 'reject', 'sandbox', 'revoke']),
    conditions: z.array(z.string()).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    rationale: z.string().optional(),
    exitCriteria: z.array(z.string()).optional(),
  })
  .passthrough();
const extendSandboxPermit_Body = z
  .object({
    expiresAt: z.string().datetime({ offset: true }),
    reason: z.string().optional(),
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
const GateDecisionId = z.string();
const GateOutcome = z.enum([
  'approve',
  'conditional',
  'reject',
  'sandbox',
  'revoke',
]);
const GateDecision = z
  .object({
    id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    outcome: z.enum(['approve', 'conditional', 'reject', 'sandbox', 'revoke']),
    conditions: z.array(z.string()).optional(),
    decidedBy: z.string(),
    decidedAt: z.string().datetime({ offset: true }),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    immutable: z.boolean(),
    rationale: z.string().optional(),
  })
  .passthrough();
const GateDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          outcome: z.enum([
            'approve',
            'conditional',
            'reject',
            'sandbox',
            'revoke',
          ]),
          conditions: z.array(z.string()).optional(),
          decidedBy: z.string(),
          decidedAt: z.string().datetime({ offset: true }),
          expiresAt: z.string().datetime({ offset: true }).optional(),
          immutable: z.boolean(),
          rationale: z.string().optional(),
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
const GateDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              outcome: z.enum([
                'approve',
                'conditional',
                'reject',
                'sandbox',
                'revoke',
              ]),
              conditions: z.array(z.string()).optional(),
              decidedBy: z.string(),
              decidedAt: z.string().datetime({ offset: true }),
              expiresAt: z.string().datetime({ offset: true }).optional(),
              immutable: z.boolean(),
              rationale: z.string().optional(),
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
const GateDecisionCreateRequest = z
  .object({
    outcome: z.enum(['approve', 'conditional', 'reject', 'sandbox', 'revoke']),
    conditions: z.array(z.string()).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    rationale: z.string().optional(),
    exitCriteria: z.array(z.string()).optional(),
  })
  .passthrough();
const GateDecisionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        outcome: z.enum([
          'approve',
          'conditional',
          'reject',
          'sandbox',
          'revoke',
        ]),
        conditions: z.array(z.string()).optional(),
        decidedBy: z.string(),
        decidedAt: z.string().datetime({ offset: true }),
        expiresAt: z.string().datetime({ offset: true }).optional(),
        immutable: z.boolean(),
        rationale: z.string().optional(),
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
const SandboxPermitStatus = z.enum([
  'active',
  'expired',
  'revoked',
  'graduated',
]);
const SandboxPermitId = z.string();
const SandboxPermit = z
  .object({
    id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['active', 'expired', 'revoked', 'graduated']),
    expiresAt: z.string().datetime({ offset: true }),
    exitCriteria: z.array(z.string()),
    extendedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const SandboxPermitListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['active', 'expired', 'revoked', 'graduated']),
          expiresAt: z.string().datetime({ offset: true }),
          exitCriteria: z.array(z.string()),
          extendedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const SandboxPermitListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['active', 'expired', 'revoked', 'graduated']),
              expiresAt: z.string().datetime({ offset: true }),
              exitCriteria: z.array(z.string()),
              extendedAt: z.string().datetime({ offset: true }).optional(),
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
const SandboxPermitResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['active', 'expired', 'revoked', 'graduated']),
        expiresAt: z.string().datetime({ offset: true }),
        exitCriteria: z.array(z.string()),
        extendedAt: z.string().datetime({ offset: true }).optional(),
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
const SandboxExtendRequest = z
  .object({
    expiresAt: z.string().datetime({ offset: true }),
    reason: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createGateDecision_Body,
  extendSandboxPermit_Body,
  Problem,
  GateDecisionId,
  GateOutcome,
  GateDecision,
  GateDecisionListData,
  ResponseMeta,
  GateDecisionListResponse,
  GateDecisionCreateRequest,
  GateDecisionResponse,
  SandboxPermitStatus,
  SandboxPermitId,
  SandboxPermit,
  SandboxPermitListData,
  SandboxPermitListResponse,
  SandboxPermitResponse,
  SandboxExtendRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/sandboxes',
    alias: 'listSandboxPermits',
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
        schema: z
          .enum(['active', 'expired', 'revoked', 'graduated'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  gateDecisionId: z
                    .string()
                    .regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['active', 'expired', 'revoked', 'graduated']),
                  expiresAt: z.string().datetime({ offset: true }),
                  exitCriteria: z.array(z.string()),
                  extendedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/sandboxes/:sandboxPermitId',
    alias: 'getSandboxPermit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'sandboxPermitId',
        type: 'Path',
        schema: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['active', 'expired', 'revoked', 'graduated']),
            expiresAt: z.string().datetime({ offset: true }),
            exitCriteria: z.array(z.string()),
            extendedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/sandboxes/:sandboxPermitId/extend',
    alias: 'extendSandboxPermit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: extendSandboxPermit_Body,
      },
      {
        name: 'sandboxPermitId',
        type: 'Path',
        schema: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['active', 'expired', 'revoked', 'graduated']),
            expiresAt: z.string().datetime({ offset: true }),
            exitCriteria: z.array(z.string()),
            extendedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/sandboxes/:sandboxPermitId/revoke',
    alias: 'revokeSandboxPermit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'sandboxPermitId',
        type: 'Path',
        schema: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^sp_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            gateDecisionId: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['active', 'expired', 'revoked', 'graduated']),
            expiresAt: z.string().datetime({ offset: true }),
            exitCriteria: z.array(z.string()),
            extendedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/use-cases/:useCaseId/gates',
    alias: 'listGateDecisions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string(),
      },
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  outcome: z.enum([
                    'approve',
                    'conditional',
                    'reject',
                    'sandbox',
                    'revoke',
                  ]),
                  conditions: z.array(z.string()).optional(),
                  decidedBy: z.string(),
                  decidedAt: z.string().datetime({ offset: true }),
                  expiresAt: z.string().datetime({ offset: true }).optional(),
                  immutable: z.boolean(),
                  rationale: z.string().optional(),
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
    path: '/v1/use-cases/:useCaseId/gates',
    alias: 'createGateDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createGateDecision_Body,
      },
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string(),
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
            id: z.string().regex(/^gd_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            outcome: z.enum([
              'approve',
              'conditional',
              'reject',
              'sandbox',
              'revoke',
            ]),
            conditions: z.array(z.string()).optional(),
            decidedBy: z.string(),
            decidedAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            immutable: z.boolean(),
            rationale: z.string().optional(),
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
        status: 403,
        description: `Authenticated but not permitted`,
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
