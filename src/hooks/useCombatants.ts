/* eslint-disable react-hooks/set-state-in-effect */
import { Combatant } from '../domain/Combatant';
import { useState, useEffect, useCallback } from 'react';
import { CombatantsStorage } from '../services/localStorage.service';

export default function useCombatants() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result = CombatantsStorage.getAll();

    if (!result.success) {
      setError(result.error?.message || 'Failed to load combatants');
      setCombatants([]);
      return;
    }

    // Reconstruct Combatant class instances
    const instances = result.data!.map(
      (c: Combatant) => new Combatant(c.id, c.name, c.level, c.ego)
    );
    setCombatants(instances);
    setError(null);
  }, [refreshFlag]);

  const handleDelete = useCallback((id: string) => {
    const result = CombatantsStorage.delete(id);

    if (!result.success) {
      setError(result.error?.message || 'Failed to delete combatant');
      return;
    }

    // Optimistic update
    setCombatants(prev => prev.filter(c => c.id !== id));
    setError(null);
  }, []);

  return {
    combatants,
    setCombatants,
    handleDelete,
    setRefreshFlag,
    error,
  };
}
