import { useState, useCallback } from 'react';
import { useTitle } from '../hooks/useTitle';
import { IoMdAdd } from 'react-icons/io';
import useCombatants from '../hooks/useCombatants';
import useCombatant from '../hooks/useCombatant';
import CombatantsPanel from '../sections/combatants/CombatantsPanel';
import CombatantEdition from '../sections/combatants/CombatantEdition';

export default function Combatants() {
  useTitle({ title: 'Combatants' });
  const { combatants, handleDelete, setRefreshFlag, error } = useCombatants();
  const [isNew, setIsNew] = useState<boolean>(false);
  const { combatant, setCombatant } = useCombatant();

  const handleDone = useCallback(() => {
    setIsNew(false);
    setCombatant(undefined);
    setRefreshFlag(prev => !prev);
  }, [setCombatant, setRefreshFlag]);

  const handleEdit = useCallback(
    (id: string) => {
      const c = combatants.find(x => x.id === id);
      if (c) {
        setCombatant(c);
        setIsNew(false);
      }
    },
    [combatants, setCombatant]
  );

  return (
    <>
      <section className="my-8 container">
        {error && (
          <div className="mx-3 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          hidden={isNew || combatant !== undefined}
          className="m-1 btn-primary"
          onClick={() => setIsNew(true)}
          aria-label="Add new combatant"
        >
          <IoMdAdd className="mr-2" aria-hidden="true" />
          Add Combatant
        </button>
        {isNew || combatant !== undefined ? (
          <CombatantEdition editedCombatant={combatant} onDone={handleDone} />
        ) : (
          <CombatantsPanel
            combatants={combatants}
            handleDelete={handleDelete}
            setEditedCombatant={handleEdit}
          />
        )}
      </section>
    </>
  );
}
