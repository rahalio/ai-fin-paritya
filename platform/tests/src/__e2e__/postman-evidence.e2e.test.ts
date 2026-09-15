/**
 * Postman-collection 1:1 Vitest tests for evidence (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  evidencePackId: "",
  limit: "",
  useCaseId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / evidence (1:1 generated)", () => {

  it("listEvidencePacks", async () => {
    const url = sub("{{baseUrl}}/v1/evidence-packs?cursor={{cursor}}&limit={{limit}}&useCaseId={{useCaseId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createEvidencePack", async () => {
    const url = sub("{{baseUrl}}/v1/evidence-packs");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"useCaseId\": \"newman_useCaseId\",\n  \"includesRawPii\": false,\n  \"rawPiiAuditReason\": \"\",\n  \"includeCivilSocietySummary\": true\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['evidencePackId'] = j.data.id;
  });

  it("getEvidencePack", async () => {
    const url = sub("{{baseUrl}}/v1/evidence-packs/{{evidencePackId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
