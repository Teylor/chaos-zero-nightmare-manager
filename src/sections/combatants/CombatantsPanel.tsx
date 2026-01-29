import { memo, type JSX } from 'react';
import type { Combatant } from '../../domain/Combatant';

type CombatantsPanelProps = {
  combatants: Combatant[];
  handleDelete: (id: string) => void;
  setEditedCombatant?: (editedCombatant: string) => void;
};

function CombatantsPanel({
  combatants,
  handleDelete,
  setEditedCombatant,
}: CombatantsPanelProps): JSX.Element {
  return (
    <div
      test-id="combatants-panel"
      className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 mx-1 justify-items-center"
    >
      {combatants.map((combatant: Combatant) => (
        <div
          key={combatant.id}
          className="relative w-75 h-50 p4
                  border border-zinc-300 rounded-md flex flex-col 
                  bg-linear-[-33deg,#FD5613_66%,#9D9D9D] 
                  transition-transform duration-300 ease-out 
                  hover:transform-[perspective(500px)_rotateX(-5deg)_rotateY(5deg)]
                  hover:z-5 hover:bg-linear-[-33deg,#FD5613_66%,white]"
        >
          <button
            aria-label={`Delete ${combatant.name}`}
            onClick={() => handleDelete(combatant.id)}
            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            X
          </button>

          <button
            onClick={() => setEditedCombatant?.(combatant.id)}
            className="w-full h-full flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#FD5613]"
            aria-label={`Edit ${combatant.name}`}
          >
            <h2 className="mb-2 font-bold">{combatant.name}</h2>
            <img
              src={combatant.img}
              alt={combatant.name}
              width={100}
              height={100}
              loading="lazy"
            />
            <p className="font-semibold">Level: {combatant.level}</p>
            <p className="font-semibold">Ego: {combatant.ego}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

// Memoize with custom comparison for combatants array
export default memo(CombatantsPanel, (prevProps, nextProps) => {
  // Deep comparison for combatants array
  if (prevProps.combatants.length !== nextProps.combatants.length) {
    return false;
  }

  // Check if any combatant changed
  for (let i = 0; i < prevProps.combatants.length; i++) {
    const prev = prevProps.combatants[i];
    const next = nextProps.combatants[i];
    if (
      prev.id !== next.id ||
      prev.level !== next.level ||
      prev.ego !== next.ego ||
      prev.name !== next.name
    ) {
      return false;
    }
  }

  return (
    prevProps.handleDelete === nextProps.handleDelete &&
    prevProps.setEditedCombatant === nextProps.setEditedCombatant
  );
});
