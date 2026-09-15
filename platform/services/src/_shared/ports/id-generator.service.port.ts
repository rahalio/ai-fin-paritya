/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@paritya/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  ucsId(): string;
  dosId(): string;
  gatId(): string;
  aplId(): string;
  monId(): string;
  casId(): string;
  plbId(): string;
  evdId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
