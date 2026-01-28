/* eslint-disable react-hooks/set-state-in-effect */
import { Combatant } from '../domain/Combatant';
import { useState, useEffect } from 'react';

export default function useCombatants() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  useEffect(() => {
    const localCombatants: Combatant[] = JSON.parse(
      localStorage.getItem('combatants') || '[]'
    );
    setCombatants(
      localCombatants.map(
        (c: Combatant) => new Combatant(c.id, c.name, c.level, c.ego)
      )
    );
  }, [refreshFlag]);

  const handleDelete = (id: string) => {
    const next = combatants.filter(c => c.id !== id);
    setCombatants(next);
    localStorage.setItem('combatants', JSON.stringify(next));
  };

  return { combatants, setCombatants, handleDelete, setRefreshFlag };
}
