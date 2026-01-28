import type { JSX } from 'react';
import type { Combatant } from '../../domain/Combatant';

type CombatantsPanelProps = {
  combatants: Combatant[];
  handleDelete: (id: string) => void;
  setEditedCombatant?: (editedCombatant: string) => void;
};

export default function CombatantsPanel({
  combatants,
  handleDelete,
  setEditedCombatant,
}: CombatantsPanelProps): JSX.Element {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 mx-1 justify-items-center">
      {combatants.map((combatant: Combatant) => (
        <div
          key={combatant?.id}
          className="relative w-75 h-50 p4
                  border border-zinc-300 rounded-md flex flex-col 
                  bg-linear-[-33deg,#FD5613_66%,#9D9D9D] 
                  transition-transform duration-300 ease-out 
                  hover:transform-[perspective(500px)_rotateX(-5deg)_rotateY(5deg)]
                  hover:z-5 hover:bg-linear-[-33deg,#FD5613_66%,white]"
        >
          <button
            aria-label="Delete combatant"
            onClick={() => handleDelete(combatant.id as unknown as string)}
            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
          >
            X
          </button>

          <button
            onClick={() =>
              setEditedCombatant?.(combatant.id as unknown as string)
            }
            key={combatant?.id}
            className="w-full h-full flex flex-col items-center"
          >
            <h2 className="mb-2 font-bold">{combatant?.name}</h2>
            <img
              src={combatant?.img}
              alt={combatant?.name}
              width={100}
              height={100}
            />
            <p className="font-semibold">Level: {combatant?.level}</p>
            <p className="font-semibold">Ego: {combatant?.ego}</p>
          </button>
        </div>
      ))}
    </div>
  );
}
