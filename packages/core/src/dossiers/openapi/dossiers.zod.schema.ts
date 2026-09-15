import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDossier_Body = z
  .object({
    useCaseId: z.string(),
    coverageGaps: z
      .array(
        z.enum([
          'gender',
          'language',
          'geography',
          'informal_sector',
          'thin_file',
          'other',
        ])
      )
      .optional(),
    dataProvenance: z.string().optional(),
    thinFileNotes: z.string().optional(),
    crossBorderMismatch: z.boolean().optional(),
    labourDisplacementNotes: z.string().optional(),
    appealPathId: z.string().optional(),
  })
  .passthrough();
const upsertChecklistItem_Body = z
  .object({
    code: z.string(),
    label: z.string(),
    status: z.enum(['pending', 'complete', 'not_applicable']),
    justification: z.string().optional(),
    evidenceNote: z.string().optional(),
  })
  .passthrough();
const createLanguageTest_Body = z
  .object({
    language: z.string(),
    channel: z.string(),
    literacyConstraints: z.string().optional(),
    passed: z.boolean(),
  })
  .passthrough();
const DossierStatus = z.enum(['incomplete', 'submitted', 'accepted']);
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
const DossierId = z.string();
const CoverageGap = z.enum([
  'gender',
  'language',
  'geography',
  'informal_sector',
  'thin_file',
  'other',
]);
const ChecklistItemId = z.string();
const ChecklistItemStatus = z.enum(['pending', 'complete', 'not_applicable']);
const ChecklistItem = z
  .object({
    id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
    code: z.string(),
    label: z.string(),
    status: z.enum(['pending', 'complete', 'not_applicable']),
    justification: z.string().optional(),
    evidenceNote: z.string().optional(),
  })
  .passthrough();
const LanguageTestId = z.string();
const LanguageLiteracyTest = z
  .object({
    id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
    language: z.string(),
    channel: z.string(),
    literacyConstraints: z.string().optional(),
    passed: z.boolean(),
    testedAt: z.string().datetime({ offset: true }),
    scaleClaimUnlocked: z.boolean().optional(),
  })
  .passthrough();
const ReadinessDossier = z
  .object({
    id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string(),
    status: z.enum(['incomplete', 'submitted', 'accepted']),
    coverageGaps: z
      .array(
        z.enum([
          'gender',
          'language',
          'geography',
          'informal_sector',
          'thin_file',
          'other',
        ])
      )
      .optional(),
    dataProvenance: z.string().optional(),
    thinFileNotes: z.string().optional(),
    crossBorderMismatch: z.boolean().optional(),
    labourDisplacementNotes: z.string().optional(),
    appealPathId: z.string().optional(),
    completenessPct: z.number().int().gte(0).lte(100),
    checklistItems: z
      .array(
        z
          .object({
            id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            label: z.string(),
            status: z.enum(['pending', 'complete', 'not_applicable']),
            justification: z.string().optional(),
            evidenceNote: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    languageTests: z
      .array(
        z
          .object({
            id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            language: z.string(),
            channel: z.string(),
            literacyConstraints: z.string().optional(),
            passed: z.boolean(),
            testedAt: z.string().datetime({ offset: true }),
            scaleClaimUnlocked: z.boolean().optional(),
          })
          .passthrough()
      )
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ReadinessDossierListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string(),
          status: z.enum(['incomplete', 'submitted', 'accepted']),
          coverageGaps: z
            .array(
              z.enum([
                'gender',
                'language',
                'geography',
                'informal_sector',
                'thin_file',
                'other',
              ])
            )
            .optional(),
          dataProvenance: z.string().optional(),
          thinFileNotes: z.string().optional(),
          crossBorderMismatch: z.boolean().optional(),
          labourDisplacementNotes: z.string().optional(),
          appealPathId: z.string().optional(),
          completenessPct: z.number().int().gte(0).lte(100),
          checklistItems: z
            .array(
              z
                .object({
                  id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                  code: z.string(),
                  label: z.string(),
                  status: z.enum(['pending', 'complete', 'not_applicable']),
                  justification: z.string().optional(),
                  evidenceNote: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          languageTests: z
            .array(
              z
                .object({
                  id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                  language: z.string(),
                  channel: z.string(),
                  literacyConstraints: z.string().optional(),
                  passed: z.boolean(),
                  testedAt: z.string().datetime({ offset: true }),
                  scaleClaimUnlocked: z.boolean().optional(),
                })
                .passthrough()
            )
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
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
const ReadinessDossierListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string(),
              status: z.enum(['incomplete', 'submitted', 'accepted']),
              coverageGaps: z
                .array(
                  z.enum([
                    'gender',
                    'language',
                    'geography',
                    'informal_sector',
                    'thin_file',
                    'other',
                  ])
                )
                .optional(),
              dataProvenance: z.string().optional(),
              thinFileNotes: z.string().optional(),
              crossBorderMismatch: z.boolean().optional(),
              labourDisplacementNotes: z.string().optional(),
              appealPathId: z.string().optional(),
              completenessPct: z.number().int().gte(0).lte(100),
              checklistItems: z
                .array(
                  z
                    .object({
                      id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                      dossierId: z
                        .string()
                        .regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                      code: z.string(),
                      label: z.string(),
                      status: z.enum(['pending', 'complete', 'not_applicable']),
                      justification: z.string().optional(),
                      evidenceNote: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              languageTests: z
                .array(
                  z
                    .object({
                      id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                      dossierId: z
                        .string()
                        .regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                      language: z.string(),
                      channel: z.string(),
                      literacyConstraints: z.string().optional(),
                      passed: z.boolean(),
                      testedAt: z.string().datetime({ offset: true }),
                      scaleClaimUnlocked: z.boolean().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const ReadinessDossierCreateRequest = z
  .object({
    useCaseId: z.string(),
    coverageGaps: z
      .array(
        z.enum([
          'gender',
          'language',
          'geography',
          'informal_sector',
          'thin_file',
          'other',
        ])
      )
      .optional(),
    dataProvenance: z.string().optional(),
    thinFileNotes: z.string().optional(),
    crossBorderMismatch: z.boolean().optional(),
    labourDisplacementNotes: z.string().optional(),
    appealPathId: z.string().optional(),
  })
  .passthrough();
const ReadinessDossierResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string(),
        status: z.enum(['incomplete', 'submitted', 'accepted']),
        coverageGaps: z
          .array(
            z.enum([
              'gender',
              'language',
              'geography',
              'informal_sector',
              'thin_file',
              'other',
            ])
          )
          .optional(),
        dataProvenance: z.string().optional(),
        thinFileNotes: z.string().optional(),
        crossBorderMismatch: z.boolean().optional(),
        labourDisplacementNotes: z.string().optional(),
        appealPathId: z.string().optional(),
        completenessPct: z.number().int().gte(0).lte(100),
        checklistItems: z
          .array(
            z
              .object({
                id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                code: z.string(),
                label: z.string(),
                status: z.enum(['pending', 'complete', 'not_applicable']),
                justification: z.string().optional(),
                evidenceNote: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        languageTests: z
          .array(
            z
              .object({
                id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                language: z.string(),
                channel: z.string(),
                literacyConstraints: z.string().optional(),
                passed: z.boolean(),
                testedAt: z.string().datetime({ offset: true }),
                scaleClaimUnlocked: z.boolean().optional(),
              })
              .passthrough()
          )
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const ChecklistItemUpsertRequest = z
  .object({
    code: z.string(),
    label: z.string(),
    status: z.enum(['pending', 'complete', 'not_applicable']),
    justification: z.string().optional(),
    evidenceNote: z.string().optional(),
  })
  .passthrough();
const ChecklistItemResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
        dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
        code: z.string(),
        label: z.string(),
        status: z.enum(['pending', 'complete', 'not_applicable']),
        justification: z.string().optional(),
        evidenceNote: z.string().optional(),
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
const LanguageTestCreateRequest = z
  .object({
    language: z.string(),
    channel: z.string(),
    literacyConstraints: z.string().optional(),
    passed: z.boolean(),
  })
  .passthrough();
const LanguageLiteracyTestResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
        dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
        language: z.string(),
        channel: z.string(),
        literacyConstraints: z.string().optional(),
        passed: z.boolean(),
        testedAt: z.string().datetime({ offset: true }),
        scaleClaimUnlocked: z.boolean().optional(),
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
  createDossier_Body,
  upsertChecklistItem_Body,
  createLanguageTest_Body,
  DossierStatus,
  Problem,
  DossierId,
  CoverageGap,
  ChecklistItemId,
  ChecklistItemStatus,
  ChecklistItem,
  LanguageTestId,
  LanguageLiteracyTest,
  ReadinessDossier,
  ReadinessDossierListData,
  ResponseMeta,
  ReadinessDossierListResponse,
  ReadinessDossierCreateRequest,
  ReadinessDossierResponse,
  ChecklistItemUpsertRequest,
  ChecklistItemResponse,
  LanguageTestCreateRequest,
  LanguageLiteracyTestResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/dossiers',
    alias: 'listDossiers',
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
        schema: z.enum(['incomplete', 'submitted', 'accepted']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string(),
                  status: z.enum(['incomplete', 'submitted', 'accepted']),
                  coverageGaps: z
                    .array(
                      z.enum([
                        'gender',
                        'language',
                        'geography',
                        'informal_sector',
                        'thin_file',
                        'other',
                      ])
                    )
                    .optional(),
                  dataProvenance: z.string().optional(),
                  thinFileNotes: z.string().optional(),
                  crossBorderMismatch: z.boolean().optional(),
                  labourDisplacementNotes: z.string().optional(),
                  appealPathId: z.string().optional(),
                  completenessPct: z.number().int().gte(0).lte(100),
                  checklistItems: z
                    .array(
                      z
                        .object({
                          id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                          dossierId: z
                            .string()
                            .regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                          code: z.string(),
                          label: z.string(),
                          status: z.enum([
                            'pending',
                            'complete',
                            'not_applicable',
                          ]),
                          justification: z.string().optional(),
                          evidenceNote: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  languageTests: z
                    .array(
                      z
                        .object({
                          id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                          dossierId: z
                            .string()
                            .regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                          language: z.string(),
                          channel: z.string(),
                          literacyConstraints: z.string().optional(),
                          passed: z.boolean(),
                          testedAt: z.string().datetime({ offset: true }),
                          scaleClaimUnlocked: z.boolean().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/dossiers',
    alias: 'createDossier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDossier_Body,
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
            id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            status: z.enum(['incomplete', 'submitted', 'accepted']),
            coverageGaps: z
              .array(
                z.enum([
                  'gender',
                  'language',
                  'geography',
                  'informal_sector',
                  'thin_file',
                  'other',
                ])
              )
              .optional(),
            dataProvenance: z.string().optional(),
            thinFileNotes: z.string().optional(),
            crossBorderMismatch: z.boolean().optional(),
            labourDisplacementNotes: z.string().optional(),
            appealPathId: z.string().optional(),
            completenessPct: z.number().int().gte(0).lte(100),
            checklistItems: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    code: z.string(),
                    label: z.string(),
                    status: z.enum(['pending', 'complete', 'not_applicable']),
                    justification: z.string().optional(),
                    evidenceNote: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            languageTests: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    language: z.string(),
                    channel: z.string(),
                    literacyConstraints: z.string().optional(),
                    passed: z.boolean(),
                    testedAt: z.string().datetime({ offset: true }),
                    scaleClaimUnlocked: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
  {
    method: 'get',
    path: '/v1/dossiers/:dossierId',
    alias: 'getDossier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dossierId',
        type: 'Path',
        schema: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            status: z.enum(['incomplete', 'submitted', 'accepted']),
            coverageGaps: z
              .array(
                z.enum([
                  'gender',
                  'language',
                  'geography',
                  'informal_sector',
                  'thin_file',
                  'other',
                ])
              )
              .optional(),
            dataProvenance: z.string().optional(),
            thinFileNotes: z.string().optional(),
            crossBorderMismatch: z.boolean().optional(),
            labourDisplacementNotes: z.string().optional(),
            appealPathId: z.string().optional(),
            completenessPct: z.number().int().gte(0).lte(100),
            checklistItems: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    code: z.string(),
                    label: z.string(),
                    status: z.enum(['pending', 'complete', 'not_applicable']),
                    justification: z.string().optional(),
                    evidenceNote: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            languageTests: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    language: z.string(),
                    channel: z.string(),
                    literacyConstraints: z.string().optional(),
                    passed: z.boolean(),
                    testedAt: z.string().datetime({ offset: true }),
                    scaleClaimUnlocked: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/dossiers/:dossierId',
    alias: 'submitDossier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dossierId',
        type: 'Path',
        schema: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string(),
            status: z.enum(['incomplete', 'submitted', 'accepted']),
            coverageGaps: z
              .array(
                z.enum([
                  'gender',
                  'language',
                  'geography',
                  'informal_sector',
                  'thin_file',
                  'other',
                ])
              )
              .optional(),
            dataProvenance: z.string().optional(),
            thinFileNotes: z.string().optional(),
            crossBorderMismatch: z.boolean().optional(),
            labourDisplacementNotes: z.string().optional(),
            appealPathId: z.string().optional(),
            completenessPct: z.number().int().gte(0).lte(100),
            checklistItems: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    code: z.string(),
                    label: z.string(),
                    status: z.enum(['pending', 'complete', 'not_applicable']),
                    justification: z.string().optional(),
                    evidenceNote: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            languageTests: z
              .array(
                z
                  .object({
                    id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
                    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                    language: z.string(),
                    channel: z.string(),
                    literacyConstraints: z.string().optional(),
                    passed: z.boolean(),
                    testedAt: z.string().datetime({ offset: true }),
                    scaleClaimUnlocked: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
  {
    method: 'post',
    path: '/v1/dossiers/:dossierId/checklist-items',
    alias: 'upsertChecklistItem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertChecklistItem_Body,
      },
      {
        name: 'dossierId',
        type: 'Path',
        schema: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            code: z.string(),
            label: z.string(),
            status: z.enum(['pending', 'complete', 'not_applicable']),
            justification: z.string().optional(),
            evidenceNote: z.string().optional(),
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
    path: '/v1/dossiers/:dossierId/language-tests',
    alias: 'createLanguageTest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLanguageTest_Body,
      },
      {
        name: 'dossierId',
        type: 'Path',
        schema: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^lt_[0-9A-HJKMNP-TV-Z]{26}$/),
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            language: z.string(),
            channel: z.string(),
            literacyConstraints: z.string().optional(),
            passed: z.boolean(),
            testedAt: z.string().datetime({ offset: true }),
            scaleClaimUnlocked: z.boolean().optional(),
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
