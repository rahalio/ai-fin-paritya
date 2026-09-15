import { apiClient } from '@/services/shared/infrastructure';

export async function listUseCases() {
  const res = await apiClient.get<{ items: any[] }>('/v1/use-cases');
  return (res.data as any)?.items ?? (res as any).items ?? [];
}

export async function createUseCase(body: {
  category: string;
  title: string;
  description?: string;
  coverageGaps?: string[];
}) {
  const res = await apiClient.post('/v1/use-cases', body);
  return (res as any).data ?? res;
}

export async function listDossiers() {
  const res = await apiClient.get<{ items: any[] }>('/v1/dossiers');
  return (res.data as any)?.items ?? [];
}

export async function createDossier(body: { useCaseId: string; dataProvenance?: string }) {
  const res = await apiClient.post('/v1/dossiers', body);
  return (res as any).data ?? res;
}

export async function submitDossier(dossierId: string) {
  const res = await apiClient.post(`/v1/dossiers/${dossierId}`, {});
  return (res as any).data ?? res;
}

export async function listGateDecisions(useCaseId: string) {
  const res = await apiClient.get<{ items: any[] }>(`/v1/use-cases/${useCaseId}/gates`);
  return (res.data as any)?.items ?? [];
}

export async function createGateDecision(
  useCaseId: string,
  body: { outcome: string; conditions?: string[]; expiresAt?: string; rationale?: string; exitCriteria?: string[] }
) {
  const res = await apiClient.post(`/v1/use-cases/${useCaseId}/gates`, body);
  return (res as any).data ?? res;
}

export async function listSandboxes() {
  const res = await apiClient.get<{ items: any[] }>('/v1/sandboxes');
  return (res.data as any)?.items ?? [];
}

export async function listAppeals() {
  const res = await apiClient.get<{ items: any[] }>('/v1/appeals');
  return (res.data as any)?.items ?? [];
}

export async function createAppeal(body: {
  useCaseId: string;
  modelVersion: string;
  slaHours: number;
  explanationTemplate?: string;
}) {
  const res = await apiClient.post('/v1/appeals', body);
  return (res as any).data ?? res;
}

export async function listMetrics() {
  const res = await apiClient.get<{ items: any[] }>('/v1/monitoring/metrics');
  return (res.data as any)?.items ?? [];
}

export async function listBreaches() {
  const res = await apiClient.get<{ items: any[] }>('/v1/monitoring/breaches');
  return (res.data as any)?.items ?? [];
}

export async function listCases() {
  const res = await apiClient.get<{ items: any[] }>('/v1/cases');
  return (res.data as any)?.items ?? [];
}

export async function listPlaybooks() {
  const res = await apiClient.get<{ items: any[] }>('/v1/playbooks');
  return (res.data as any)?.items ?? [];
}

export async function listEvidencePacks() {
  const res = await apiClient.get<{ items: any[] }>('/v1/evidence-packs');
  return (res.data as any)?.items ?? [];
}

export async function createEvidencePack(body: { useCaseId: string; includesRawPii?: boolean }) {
  const res = await apiClient.post('/v1/evidence-packs', body);
  return (res as any).data ?? res;
}
