/**
 * localStorage Service
 * Centralized storage operations with comprehensive error handling
 */

export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

export class LocalStorageService {
  private static handleError(error: unknown, operation: string): Error {
    console.error(`LocalStorage ${operation} failed:`, error);
    if (error instanceof Error) return error;
    return new Error(`Unknown error during ${operation}`);
  }

  static getItem<T>(key: string, defaultValue: T): StorageResult<T> {
    try {
      const item = localStorage.getItem(key);
      if (!item) return { success: true, data: defaultValue };

      const parsed = JSON.parse(item);
      return { success: true, data: parsed as T };
    } catch (error) {
      return {
        success: false,
        data: defaultValue,
        error: this.handleError(error, 'read'),
      };
    }
  }

  static setItem<T>(key: string, value: T): StorageResult<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return { success: true };
    } catch (error) {
      // Handle QuotaExceededError specifically
      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        return {
          success: false,
          error: new Error('Storage quota exceeded. Please delete some data.'),
        };
      }
      return {
        success: false,
        error: this.handleError(error, 'write'),
      };
    }
  }

  static removeItem(key: string): StorageResult<void> {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error, 'delete'),
      };
    }
  }
}

// Domain-specific helpers for Combatants
import type { Combatant } from '../domain/Combatant';

export const CombatantsStorage = {
  STORAGE_KEY: 'combatants' as const,

  getAll(): StorageResult<Combatant[]> {
    return LocalStorageService.getItem(this.STORAGE_KEY, []);
  },

  save(combatants: Combatant[]): StorageResult<void> {
    return LocalStorageService.setItem(this.STORAGE_KEY, combatants);
  },

  add(combatant: Combatant): StorageResult<void> {
    const result = this.getAll();
    if (!result.success) return result;

    const updated = [...result.data!, combatant];
    return this.save(updated);
  },

  update(
    id: string,
    updater: (c: Combatant) => Combatant
  ): StorageResult<void> {
    const result = this.getAll();
    if (!result.success) return result;

    const updated = result.data!.map(c => (c.id === id ? updater(c) : c));
    return this.save(updated);
  },

  delete(id: string): StorageResult<void> {
    const result = this.getAll();
    if (!result.success) return result;

    const updated = result.data!.filter(c => c.id !== id);
    return this.save(updated);
  },
};
