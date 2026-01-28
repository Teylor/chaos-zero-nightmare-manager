export enum CombatantType {
  STRIKER = 'striker',
  HUNTER = 'hunter',
  CONTROLLER = 'controller',
  RANGER = 'ranger',
  PSIONIC = 'psionic',
  VANGUARD = 'vanguard',
}

export enum CombatantAttribute {
  PASSION = 'passion',
  VOID = 'void',
  INSTINCT = 'instinct',
  ORDER = 'order',
  JUSTICE = 'justice',
}

export enum CombatantRarity {
  FOUR_STAR = 4,
  FIVE_STAR = 5,
}

export interface ICombatant {
  id: string;
  img: string;
  name: string;
  level: number;
  ego: number;
  potentials?: string; // TODO
  type?: CombatantType;
  attribute?: CombatantAttribute;
  rarity?: CombatantRarity;
}

export class Combatant implements ICombatant {
  readonly id: string;
  readonly img: string;
  readonly alt: string;
  name: string;
  level: number;
  ego: number;
  constructor(id: string, name: string, level: number, ego: number) {
    // TODO on construct get basic stats of each char
    this.id = id;
    this.img = `/combatants/${name.toLowerCase()}.png`;
    this.name = name;
    this.level = level < 1 ? 1 : level > 60 ? 60 : level;
    this.ego = ego < 0 ? 0 : ego > 6 ? 6 : ego;
    this.alt = `${this.name} Lvl: ${this.level} Ego: ${this.ego}`;
  }
}
