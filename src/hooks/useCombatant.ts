import { useState, useCallback } from 'react';
import type { Combatant } from '../domain/Combatant';

export default function useCombatant() {
  const [combatant, setCombatant] = useState<Combatant | undefined>(undefined);
  const [level, setLevelInternal] = useState<number>(1);
  const [ego, setEgoInternal] = useState<number>(0);

  // Validated setters prevent invalid states and NaN values
  const setLevel = useCallback((value: number) => {
    // Handle NaN from parseInt
    if (isNaN(value)) return;
    const clamped = Math.min(60, Math.max(1, value));
    setLevelInternal(clamped);
  }, []);

  const setEgo = useCallback((value: number) => {
    // Handle NaN from parseInt
    if (isNaN(value)) return;
    const clamped = Math.min(6, Math.max(0, value));
    setEgoInternal(clamped);
  }, []);

  return {
    combatant,
    setCombatant,
    level,
    setLevel,
    ego,
    setEgo,
  };
}
