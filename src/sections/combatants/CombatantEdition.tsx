import { useEffect, useState, useCallback, memo, type JSX } from 'react';
import { Combatant } from '../../domain/Combatant';
import CombatantSelector from '../shared/CombatantSelector';
import useCombatant from '../../hooks/useCombatant';
import { CombatantsStorage } from '../../services/localStorage.service';

type CombatantEditionProps = {
  editedCombatant?: Combatant;
  onDone: () => void;
};

function CombatantEdition({
  editedCombatant,
  onDone,
}: CombatantEditionProps): JSX.Element {
  const { combatant, setCombatant, setLevel, level, setEgo, ego } =
    useCombatant();
  const [error, setError] = useState<string | null>(null);

  const saveCombatant = useCallback(
    (c: Combatant): void => {
      if (editedCombatant) {
        // UPDATE: Use immutable update helper
        const result = CombatantsStorage.update(
          editedCombatant.id,
          () => new Combatant(editedCombatant.id, c.name, level, ego)
        );

        if (!result.success) {
          setError(result.error?.message || 'Failed to update combatant');
          return;
        }
      } else {
        // ADD: Use add helper
        const newCombatant = new Combatant(c.id, c.name, level, ego);
        const result = CombatantsStorage.add(newCombatant);

        if (!result.success) {
          setError(result.error?.message || 'Failed to add combatant');
          return;
        }
      }

      setError(null);
      onDone();
    },
    [editedCombatant, level, ego, onDone]
  );

  useEffect(() => {
    if (editedCombatant) {
      setCombatant(editedCombatant);
      setLevel(editedCombatant.level);
      setEgo(editedCombatant.ego);
    }
  }, [editedCombatant, setCombatant, setLevel, setEgo]);

  return (
    <>
      <div className="my-8 container">
        {error && (
          <div className="mx-3 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <CombatantSelector
          disable={editedCombatant !== undefined}
          selected={editedCombatant ?? combatant}
          onSelect={c => setCombatant?.(c)}
        />
        <h1
          className="m-3 text-lg text-[#FD5613] font-bold"
          style={{ WebkitTextStroke: '0.5px black' }}
        >
          Level
        </h1>
        <input
          type="number"
          min={1}
          max={60}
          value={level}
          className="mx-3 w-20 p-3 input-primary"
          onChange={e => setLevel(parseInt(e.target.value, 10))}
          aria-label="Combatant level"
        />
        <h1
          className="m-3 text-lg text-[#FD5613] font-bold"
          style={{ WebkitTextStroke: '0.5px black' }}
        >
          Ego
        </h1>
        <input
          type="number"
          min={0}
          max={6}
          value={ego}
          className="mx-3 w-20 p-3 input-primary"
          onChange={e => setEgo(parseInt(e.target.value, 10))}
          aria-label="Combatant ego"
        />
      </div>

      <button
        className={`m-1 w-20 h-10 ${!combatant ? 'btn-disabled' : 'btn-primary'}`}
        onClick={() => {
          if (combatant) saveCombatant(combatant);
        }}
        disabled={!combatant}
        aria-label="Save combatant"
      >
        Save
      </button>
      <button
        onClick={() => onDone()}
        className="m-1 w-20 h-10 btn-primary"
        aria-label="Cancel edit"
      >
        Cancel
      </button>
    </>
  );
}

export default memo(CombatantEdition);
