let orgId = 'tnt_demo';
let apiKey = 'paritya_demo_local_dev_key';

export function getEffectiveOrgId(): string {
  return orgId;
}

export function setEffectiveOrgId(id: string) {
  orgId = id;
}

export function getApiKey(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('paritya.apiKey') || apiKey;
  }
  return apiKey;
}

export function setApiKey(key: string) {
  apiKey = key;
  if (typeof window !== 'undefined') {
    localStorage.setItem('paritya.apiKey', key);
  }
}
