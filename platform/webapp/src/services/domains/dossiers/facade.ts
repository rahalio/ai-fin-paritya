/**
 * Dossiers Domain Facade
 *
 * High-level API for dossiers domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { dossiersService } from "./dossiers.service";
// TODO: Import types
// import type { ... } from "./dossiers.api-types";

/**
 * Dossiers Facade
 *
 * High-level API for dossiers operations.
 * Components should use this facade instead of services directly.
 */
export const dossiersFacade = {
  /**
   * List dossiers
   */
  async getDossier(...args: Parameters<typeof dossiersService.getDossier>): Promise<any> {
    return dossiersService.getDossier(...args);
  }

  /**
   * Create dossier
   */
  async createDossier(...args: Parameters<typeof dossiersService.createDossier>): Promise<any> {
    return dossiersService.createDossier(...args);
  }

  /**
   * Get dossier
   */
  async getDossier(...args: Parameters<typeof dossiersService.getDossier>): Promise<any> {
    return dossiersService.getDossier(...args);
  }

  /**
   * Submit dossier for gate review
   */
  async createDossier(...args: Parameters<typeof dossiersService.createDossier>): Promise<any> {
    return dossiersService.createDossier(...args);
  }

  /**
   * Upsert checklist item
   */
  async getChecklistItem(...args: Parameters<typeof dossiersService.getChecklistItem>): Promise<any> {
    return dossiersService.getChecklistItem(...args);
  }

  /**
   * Create language test
   */
  async createLanguageTest(...args: Parameters<typeof dossiersService.createLanguageTest>): Promise<any> {
    return dossiersService.createLanguageTest(...args);
  }
};
