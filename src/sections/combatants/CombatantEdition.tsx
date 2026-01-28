import { useEffect, type JSX } from 'react';
import { Combatant } from '../../domain/Combatant';
import CombatantSelector from '../shared/CombatantSelector';
import useCombatant from '../../hooks/useCombatant';

type CombatantsPanelProps = {
  editedCombatant?: Combatant;
  onDone: () => void;
};

export default function CombatantsEdition({
  editedCombatant,
  onDone,
}: CombatantsPanelProps): JSX.Element {
  const { combatant, setCombatant, setLevel, level, setEgo, ego } =
    useCombatant();

  function saveCombatant(c: Combatant): void {
    const Combatants = JSON.parse(localStorage.getItem('combatants') || '[]');
    if (
      editedCombatant &&
      Combatants.find((c: Combatant) => c.id === editedCombatant.id)
    ) {
      const index = Combatants.findIndex(
        (c: Combatant) => c.id === editedCombatant.id
      );
      Combatants[index].level = level;
      Combatants[index].ego = ego;
    } else {
      Combatants.push({ ...c, level, ego });
    }
    localStorage.setItem('combatants', JSON.stringify(Combatants));
    onDone();
  }
  useEffect(() => {
    if (editedCombatant) {
      setCombatant(editedCombatant);
      setLevel(editedCombatant.level);
      setEgo(editedCombatant.ego);
    }
  }, []);

  return (
    <>
      <div className="my-8 container">
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
          onChange={e => setLevel(parseInt(e.target.value))}
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
          onChange={e => setEgo(parseInt(e.target.value))}
        />
      </div>
      <button
        className={`m-1 w-20 h-10 ${!combatant ? 'btn-disabled' : 'btn-primary'}`}
        onClick={() => {
          if (combatant) saveCombatant(combatant);
        }}
      >
        Save
      </button>
      <button onClick={() => onDone()} className="m-1 w-20 h-10 btn-primary">
        Cancel
      </button>
    </>
  );
}
