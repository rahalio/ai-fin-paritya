import { getApiKey } from './tenant-state';

const API_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) ||
  'http://127.0.0.1:4010';

function normalizePath(path: string): string {
  // Codegen emits /orgs/{orgId}/v1/... — Paritya API is /v1/...
  return path.replace(/^\/orgs\/[^/]+\/?/, '/').replace(/\/{2,}/g, '/');
}

async function request<T>(method: string, path: string, init?: RequestInit): Promise<{ data: T }> {
  const url = `${API_BASE}${normalizePath(path)}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-API-Key': getApiKey(),
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (init?.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  if (method !== 'GET' && method !== 'HEAD' && !headers['Idempotency-Key']) {
    headers['Idempotency-Key'] = `web_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
  const res = await fetch(url, { ...init, method, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }
  if (res.status === 204) return { data: undefined as T };
  const json = await res.json();
  return json?.data !== undefined ? json : { data: json };
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>('GET', path, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>('POST', path, { ...init, body: body !== undefined ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>('PATCH', path, { ...init, body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>('PUT', path, { ...init, body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string, init?: RequestInit) => request<T>('DELETE', path, init),
};
