import { useState } from 'react';
import { useTitle } from '../hooks/useTitle';
import { IoMdAdd } from 'react-icons/io';
import useCombatants from '../hooks/useCombatants';
import useCombatant from '../hooks/useCombatant';
import CombatantsPanel from '../sections/combatants/CombatantsPanel';
import CombatantsEdition from '../sections/combatants/CombatantEdition';

export default function Combatants() {
  useTitle({ title: 'Combatants' });
  const { combatants, handleDelete, setRefreshFlag } = useCombatants();
  const [isNew, setIsNew] = useState<boolean>(false);
  const { combatant, setCombatant } = useCombatant();

  return (
    <>
      <section className="my-8 container">
        <button
          hidden={isNew || combatant !== undefined}
          className="m-1 btn-primary"
          onClick={() => setIsNew(true)}
        >
          <IoMdAdd className="mr-2" />
          Add Combatant
        </button>
        {isNew || combatant !== undefined ? (
          <CombatantsEdition
            editedCombatant={combatant}
            onDone={() => {
              setIsNew(false);
              setCombatant(undefined);
              setRefreshFlag(prev => !prev);
            }}
          />
        ) : (
          <CombatantsPanel
            combatants={combatants}
            handleDelete={handleDelete}
            setEditedCombatant={(id: string) => {
              const c = combatants.find(x => x.id === id);
              if (c) {
                setCombatant(c);
                setIsNew(false);
              }
            }}
          />
        )}
      </section>
    </>
  );
}
