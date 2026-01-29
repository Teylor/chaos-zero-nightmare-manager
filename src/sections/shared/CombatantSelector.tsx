import type { JSX } from 'react';
import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { Combatant } from '../../domain/Combatant';
import { COMBATANTS } from '../../lib/Combatants';
import { slugify } from '../../utils/utils';

type Props = {
  disable?: boolean;
  selected?: Combatant | null;
  onSelect?: (c: Combatant) => void;
};

function CombatantSelector({
  disable,
  selected,
  onSelect,
}: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [combatants, setCombatants] = useState<typeof COMBATANTS>(COMBATANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Memoize sorted combatants to avoid re-sorting on every render
  const sortedCombatants = useMemo(
    () => [...COMBATANTS].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  useEffect(() => {
    const normalize = (s: string) =>
      s
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

    const query = searchTerm
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCombatants(sortedCombatants);
      return;
    }

    const terms = query.split(/\s+/).filter(Boolean);

    setCombatants(
      sortedCombatants.filter(p => {
        const target = normalize(p.name);
        return terms.every(t => target.includes(t));
      })
    );
  }, [searchTerm, sortedCombatants]);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.addEventListener('mousedown', handleOutsideClick);
      const onKey = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', onKey);
      };
    }
  }, [isOpen, handleOutsideClick]);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighlightedIndex(-1);
      itemRefs.current = [];
    }
  }, [isOpen]);

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (combatants.length > 0) {
        setHighlightedIndex(0);
        setTimeout(() => itemRefs.current[0]?.focus(), 0);
      }
    }
  }

  function handleItemKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % combatants.length;
      setHighlightedIndex(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + combatants.length) % combatants.length;
      setHighlightedIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      itemRefs.current[index]?.click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="relative mx-10" ref={containerRef}>
      <button
        disabled={disable}
        onClick={() => setIsOpen(!isOpen)}
        className="w-60 h-20 px-3 py-2 border 
                border-zinc-600 rounded-md font-bold text-xl text-black 
                text-left flex items-center justify-between focus:outline-none 
                focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400"
        style={{ backgroundColor: '#9d9d9d' }}
        aria-label="Select Combatant"
      >
        <span className="flex items-center gap-2">
          {selected && (
            <img
              src={`/combatants/${selected.name.toLocaleLowerCase()}.png`}
              alt={selected.name}
              width={64}
              height={64}
            />
          )}
          {selected?.name || 'Select Combatant'}
        </span>
        <span>▼</span>
      </button>
      {isOpen && (
        <div
          className="absolute border border-zinc-600 rounded-md z-10 w-60 h-auto max-h-60 overflow-y-auto"
          style={{ backgroundColor: '#9d9d9d' }}
        >
          <input
            ref={inputRef}
            value={searchTerm}
            type="text"
            onKeyDown={handleInputKeyDown}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full p-3 text-lg
                    border-b border-zinc-600 text-black 
                    placeholder-black focus:outline-none"
            style={{ backgroundColor: '#9d9d9d' }}
          />
          {combatants.map((c, index) => (
            <button
              ref={el => {
                itemRefs.current[index] = el;
              }}
              key={c.id}
              onMouseEnter={() => setHighlightedIndex(index)}
              onKeyDown={e => handleItemKeyDown(e, index)}
              onClick={() => {
                if (onSelect) {
                  onSelect(
                    new Combatant(`${c.name}-${Date.now()}`, c.name, 0, 0)
                  );
                }
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-lg font-bold w-full
                                flex items-center gap-2 text-black border-b 
                                border-zinc-600 last:border-b-0 
                                ${highlightedIndex === index ? 'brightness-105' : ''}`}
              style={{ backgroundColor: '#9d9d9d' }}
            >
              <img
                src={`/combatants/${slugify(c.name)}.png`}
                alt={c.name}
                width={64}
                height={64}
              />
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(CombatantSelector);
