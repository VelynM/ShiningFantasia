function getIndexFromValue(s: string, r: Record<number, string>): number {
    for (const [k, v] of Object.entries(r)) {
        if (v === s) {
            return parseInt(k, 10);
        }
    }

    return -1;
}

function getIndexFromValue2(s: string, r: Record<number, string>): number {
    let v = getIndexFromValue(s, r);

    if (v < 0) {
        v = parseInt(s, 10);
        if (isNaN(v)) {
            return -1;
        }
    }

    return v;
}

const magicTypes = [
    'NONE',
    'WHITE',
    'BLACK',
    'SUMMON',
    'NINJUTSU',
    'SONG',
    'BLUE',
    'GEOMANCY',
    'TRUST',
];

export function getMagicTypeName(magic: number): string {
    return magicTypes[magic];
}

export function getMagicTypeId(s: string): number {
    const id = magicTypes.indexOf(s);
    if (id < 0) {
        console.error(`Invalid magic type ${s}`);
        return 0;
    }
    return id;
}

const elementNames: Record<number, string> = {
    0: 'FIRE',
    1: 'ICE',
    2: 'WIND',
    3: 'EARTH',
    4: 'THUNDER',
    5: 'WATER',
    6: 'LIGHT',
    7: 'DARK',
    15: 'NONE',
};

export function getElementName(ele: number): string {
    const elementName: string | undefined = elementNames[ele];
    if (elementName) {
        return elementName;
    }
    return `${ele}`;
}

export function getElementId(s: string): number {
    const ele = getIndexFromValue(s, elementNames);
    if (ele < 0) {
        console.error(`Invalid element ${s}`);
        return 15;
    }

    return ele;
}

// 7F st
// 1D stpc
// A0 stnpc
// 05 stpt
// 0D stal

// 5C trade
// 20 check/attack

// 01 0200 0000 self
// 02 0100 0000 pet
// 04 0004 0000 party (includes alliance in pvp situations)
// 08 0008 0000 alliance
// 10 0001 0000 pc
// 20 0010 0000 mob
// 40 0002 0000 npc
// 80 0002 1800 npc, excluding fellows

// 0001 pc
// 0002 npc
// 0004 party
// 0008 alliance
// 0010 mob
// 0020 door
// 0040 lift
// 0080 model (furniture, etc.)
// 0100 pet
// 0200 self
// 0400 pvp
// 0800 fellow
// 1000 trust

const targetBits: Record<number, string> = {
    0: 'SELF',
    1: 'PET',
    2: 'PARTY',
    3: 'ALLIANCE',
    4: 'PC',
    5: 'MOB',
    6: 'NPC',
    7: 'NPC_NOTRUST',
};

export function getTargets(bits: number): string[] {
    const flags: string[] = [];

    for (let i = 0; i < 16; i++) {
        if (((1 << i) & bits) !== 0) {
            const targetName = targetBits[i] ?? `${i}`;
            flags.push(targetName);
        }
    }

    return flags;
}

export function getTargetBits(s: string[]): number {
    let bits = 0;

    for (const t of s) {
        const v = getIndexFromValue2(t, targetBits);
        if (v < 0) {
            console.error(`Invalid target ${t}`);
            continue;
        }

        bits |= 1 << v;
    }

    return bits;
}

const skillNames: Record<string, number> = {
    NONE: 0,
    HAND_TO_HAND: 1,
    DAGGER: 2,
    SWORD: 3,
    GREAT_SWORD: 4,
    AXE: 5,
    GREAT_AXE: 6,
    SCYTHE: 7,
    POLEARM: 8,
    KATANA: 9,
    GREAT_KATANA: 10,
    CLUB: 11,
    STAFF: 12,
    AUTOMATON_MELEE: 22,
    AUTOMATON_RANGED: 23,
    AUTOMATON_MAGIC: 24,
    ARCHERY: 25,
    MARKSMANSHIP: 26,
    THROWING: 27,
    GUARD: 28,
    EVASION: 29,
    SHIELD: 30,
    PARRY: 31,
    DIVINE_MAGIC: 32,
    HEALING_MAGIC: 33,
    ENHANCING_MAGIC: 34,
    ENFEEBLING_MAGIC: 35,
    ELEMENTAL_MAGIC: 36,
    DARK_MAGIC: 37,
    SUMMONING_MAGIC: 38,
    NINJUTSU: 39,
    SINGING: 40,
    STRING_INSTRUMENT: 41,
    WIND_INSTRUMENT: 42,
    BLUE_MAGIC: 43,
    GEOMANCY: 44,
    HANDBELL: 45,
    FISHING: 48,
    WOODWORKING: 49,
    SMITHING: 50,
    GOLDSMITHING: 51,
    CLOTHCRAFT: 52,
    LEATHERCRAFT: 53,
    BONECRAFT: 54,
    ALCHEMY: 55,
    COOKING: 56,
    SYNERGY: 57,
    RID: 58,
    DIG: 59,

    // Two items are set to 255
    UNKNOWN_255: 255,
};

export function skillToString(skill: number): string {
    for (const [skillName, id] of Object.entries(skillNames)) {
        if (skill === id) {
            return skillName;
        }
    }

    return `${skill}`;
}

export function stringToSkill(skill: string): number {
    if (skill in skillNames) {
        return skillNames[skill];
    }

    const v = parseInt(skill, 10);
    if (isNaN(v)) {
        console.error(`Unknown skill ${skill}`);
        return 0;
    }

    return v;
}

const jobNames = [
    'NONE',
    'WAR',
    'MNK',
    'WHM',
    'BLM',
    'RDM',
    'THF',
    'PLD',
    'DRK',
    'BST',
    'BRD',
    'RNG',
    'SAM',
    'NIN',
    'DRG',
    'SMN',
    'BLU',
    'COR',
    'PUP',
    'DNC',
    'SCH',
    'GEO',
    'RUN',
    'MON',
];

export function getJobName(job: number): string {
    return jobNames[job];
}

export function getJobId(jobName: string): number {
    const jobId = jobNames.indexOf(jobName);
    if (jobId < 0) {
        console.error(`Invalid job ${jobName}`);
        return -1;
    }

    return jobId;
}

const modifierNames: Record<number, string> = {
    0: 'ACCESSION',
    1: 'MANIFESTATION',
    2: 'ADDENDUM',
    3: 'TABULA_RASA',
    4: 'ELEMENTAL_SEAL',
    5: 'GEOCOLURE',
    6: 'THEURGIC_FOCUS',
    7: 'CONSUME_ALL_MP',
};

export function getModifiers(bits: number): string[] {
    const flags: string[] = [];

    for (let i = 0; i < 8; i++) {
        if (((1 << i) & bits) !== 0) {
            const modifierName = modifierNames[i] ?? `${i}`;
            flags.push(modifierName);
        }
    }

    return flags;
}

export function getModifierBits(s: string[]): number {
    let bits = 0;

    for (const m of s) {
        const v = getIndexFromValue2(m, modifierNames);
        if (v < 0) {
            console.error(`Invalid modifier ${m}`);
            continue;
        }

        bits |= 1 << v;
    }

    return bits;
}

//  1: Ability
//  2: Pet Ability
//  3: Weapon Skill
//  4: Job Trait
//  5: n/a
//  6: Blood Pact: Rage
//  7: n/a
//  8: Corsair's Roll
//  9: Quick Draw
// 10: Blood Pact: Ward
// 11: Samba
// 12: Waltz
// 13: Step
// 14: Flourish
// 15: Strategem
// 16: Jig
// 17: Flourish II
// 18: Ready
// 19: Flourish III
// 20: Monstrosity
// 21: Rune Enchantment
// 22: Ward
// 23: Effusion

const typeNames: Record<number, string> = {
    1: 'ABILITY',
    2: 'PET_ABILITY',
    3: 'WEAPON_SKILL',
    4: 'JOB_TRAIT',
    6: 'BLOOD_PACT_RAGE',
    8: 'CORSAIR_ROLL',
    9: 'QUICK_DRAW',
    10: 'BLOOD_PACT_WARD',
    11: 'SAMBA',
    12: 'WALTZ',
    13: 'STEP',
    14: 'FLOURISH',
    15: 'STRATEGEM',
    16: 'JIG',
    17: 'FLOURISH_II',
    18: 'READY',
    19: 'FLOURISH_III',
    20: 'MONSTROSITY',
    21: 'RUNE_ENCHANTMENT',
    22: 'WARD',
    23: 'EFFUSION',
};

export function getType(type: number): string {
    return typeNames[type] ?? `${type}`;
}

export function getTypeId(s: string): number {
    const typeId = getIndexFromValue2(s, typeNames);
    if (typeId < 0) {
        console.error(`Invalid type ${s}`);
        return 1;
    }

    return typeId;
}

const aoeTypeNames: Record<number, string> = {
    0: 'NONE',
    1: 'TARGET_AOE',
    2: 'SELF_CONAL',
    3: 'SELF_AOE',
};

export function getAoeType(type: number): string {
    return aoeTypeNames[type] ?? `${type}`;
}

export function getAoeId(s: string): number {
    const aoe = getIndexFromValue(s, aoeTypeNames);
    if (aoe < 0) {
        console.error(`Invalid AoE Type ${s}`);
        return 0;
    }

    return aoe;
}

const validTargetsNames: Record<number, string> = {
    0: 'ALL',
    1: 'SELF',
    2: 'SELF_AOE',
    3: 'SELF_AOE2', // teleports, escape
    // 4 - unused
    5: 'MOB_SELFAOE',
    6: 'PARTY',
    7: 'PARTY_AOE',
    8: 'LUOPAN',
    9: 'PET',
    10: 'PC',
    // 11 - unused
    12: 'SELF_PET',
    13: 'MOB',
    14: 'MOB_AOE',
    15: 'DEAD',
};

export function getValidTargets(kind: number): string {
    return validTargetsNames[kind] ?? `${kind}`;
}

export function getValidTargetId(s: string): number {
    const vt = getIndexFromValue2(s, validTargetsNames);
    if (vt < 0) {
        console.error(`Invalid Valid Target Type ${s}`);
        return 0;
    }

    return vt;
}

const magicKinds: Record<number, string> = {
    0: 'BLUE_MAGIC',
    1: 'OFFENSIVE',
    2: 'CURE',
    3: 'STATUS_EFFECT',
    4: 'STATUS_REMOVAL',
    // 5 - unused
    6: 'DEFENSIVE_SONG',
    7: 'OFFENSIVE_SONG',
    8: 'DRAIN',
    9: 'ASPIR',
    // 10 - unused
    11: 'ELEMENTAL_DEBUFF',
    12: 'TELEPORT', // including recall, warp, escape
    13: 'RAISE',
    14: 'FINALE',
    15: 'TRACTOR',
    16: 'SUMMON', // including trusts
    17: 'ABSORB_STAT',
    18: 'DISPEL', // including erase
    19: 'VIRELEI',
    20: 'DEATH',
    // 21 - unused
    // 22 - unused
    // 23 - unused
    // 24 - unused
    // 25 - unused
    // 26 - unused
    // 27 - unused
    28: 'HELIX',
    29: 'COLURE',
    // 30 - unused
    31: 'OTHER', // meteor, aquaveil, sacrifice, esuna, absorb-tp, boost, gain
};

export function getModifiersEx(bits: number): Record<string, string | boolean> {
    const a = bits & 3;
    const b = (bits & 0x78) >> 3;
    const kind = (bits & 0x7fff80) >> 7;

    // same as the other modifier bits
    const isAccession = (bits & 0x800000) !== 0;
    const isManifestation = (bits & 0x1000000) !== 0;
    const isAddendum = (bits & 0x02000000) !== 0;
    const isTabulaRasa = (bits & 0x04000000) !== 0;
    const isElementalSeal = (bits & 0x08000000) !== 0;
    const isGeocolure = (bits & 0x10000000) !== 0;
    const isTheurgicFocus = (bits & 0x20000000) !== 0;
    const isConsumeAllMP = (bits & 0x40000000) !== 0;

    // unknown / unused
    const h = (bits & 0x80000000) !== 0;

    const ret: Record<string, string | boolean> = {};

    // an enum of some sort: 0 (tends to be offensive spells), 1 (tends to be defensive spells), 2 (tends to be defensive blue mage spells, Odin, Atomos)
    // Used by Convergence
    ret['A'] = `${a}`;

    if (b) {
        // Unknown?
        // Used by Convergence
        ret['B'] = `${b}`;
    }
    if (kind) {
        ret['KIND'] = magicKinds[kind] ?? `${kind}`;
    }
    if (isAccession) {
        ret['ACCESSION'] = isAccession;
    }
    if (isManifestation) {
        ret['MANIFESTATION'] = isManifestation;
    }
    if (isAddendum) {
        ret['ADDENDUM'] = isAddendum;
    }
    if (isTabulaRasa) {
        ret['TABULA_RASA'] = isTabulaRasa;
    }
    if (isElementalSeal) {
        ret['ELEMENTAL_SEAL'] = isElementalSeal;
    }
    if (isGeocolure) {
        ret['GEOCOLURE'] = isGeocolure;
    }
    if (isTheurgicFocus) {
        ret['THEURGIC_FOCUS'] = isTheurgicFocus;
    }
    if (isConsumeAllMP) {
        ret['CONSUME_ALL_MP'] = isConsumeAllMP;
    }
    if (h) {
        // unused
        ret['H'] = h;
    }

    return ret;
}

export function getModifierExBits(ex: Record<string, string | boolean>): number {
    let bits = 0;

    /*
    const a =               (bits &          3);
    const b =               (bits &       0x78) >> 3;
    const kind =            (bits &   0x7fff80) >> 7;

    // same as the other modifier bits
    const isAccession =     (bits &   0x800000) !== 0;
    const isManifestation = (bits &  0x1000000) !== 0;
    const isAddendum =      (bits & 0x02000000) !== 0;
    const isTabulaRasa =    (bits & 0x04000000) !== 0;
    const isElementalSeal = (bits & 0x08000000) !== 0;
    const isGeocolure =     (bits & 0x10000000) !== 0;
    const isTheurgicFocus = (bits & 0x20000000) !== 0;
    const isConsumeAllMP =  (bits & 0x40000000) !== 0;

    // unknown / unused
    const h =               (bits & 0x80000000) !== 0;
    */

    for (const [k, v] of Object.entries(ex)) {
        if (k === 'A') {
            const a = parseInt(v as string, 10);
            if (isNaN(a) || a < 0 || a > 3) {
                console.error(`Invalid A value ${v}`);
            } else {
                bits |= a;
            }
        } else if (k === 'B') {
            const b = parseInt(v as string, 10);
            if (isNaN(b) || b < 0 || b > 15) {
                console.error(`Invalid B value ${v}`);
            } else {
                bits |= b << 3;
            }
        } else if (k === 'KIND') {
            const kind = getIndexFromValue2(v as string, magicKinds);
            if (kind < 0 || kind > 65535) {
                console.error(`Invalid maic kind ${v}`);
            } else {
                bits |= kind << 7;
            }
        } else if (k === 'ACCESSION') {
            if (v === true) {
                bits |= 0x800000;
            }
        } else if (k === 'MANIFESTATION') {
            if (v === true) {
                bits |= 0x1000000;
            }
        } else if (k === 'ADDENDUM') {
            if (v === true) {
                bits |= 0x02000000;
            }
        } else if (k === 'TABULA_RASA') {
            if (v === true) {
                bits |= 0x04000000;
            }
        } else if (k === 'ELEMENTAL_SEAL') {
            if (v === true) {
                bits |= 0x08000000;
            }
        } else if (k === 'GEOCOLURE') {
            if (v === true) {
                bits |= 0x10000000;
            }
        } else if (k === 'THEURGIC_FOCUS') {
            if (v === true) {
                bits |= 0x20000000;
            }
        } else if (k === 'CONSUME_ALL_MP') {
            if (v === true) {
                bits |= 0x40000000;
            }
        } else if (k === 'H') {
            if (v === true) {
                bits |= 0x80000000;
            }
        }
    }

    return bits;
}

const jobBits: Record<string, number> = {
    NONE: 0x00000001,
    WAR: 0x00000002,
    MNK: 0x00000004,
    WHM: 0x00000008,
    BLM: 0x00000010,
    RDM: 0x00000020,
    THF: 0x00000040,
    PLD: 0x00000080,
    DRK: 0x00000100,
    BST: 0x00000200,
    BRD: 0x00000400,
    RNG: 0x00000800,
    SAM: 0x00001000,
    NIN: 0x00002000,
    DRG: 0x00004000,
    SMN: 0x00008000,
    BLU: 0x00010000,
    COR: 0x00020000,
    PUP: 0x00040000,
    DNC: 0x00080000,
    SCH: 0x00100000,
    GEO: 0x00200000,
    RUN: 0x00400000,
};

export function jobBitsToArray(bits: number): string[] {
    const jobs: string[] = [];

    for (const [job, bit] of Object.entries(jobBits)) {
        if ((bit & bits) !== 0) {
            jobs.push(job);
        }
    }

    return jobs;
}

export function arrayToJobBits(jobs: string[]): number {
    let bits = 0;

    for (const job of jobs) {
        bits |= jobBits[job];
    }

    return bits;
}

// DSP enum names
const flagBits: Record<string, number> = {
    WALLHANGING: 0x0001,
    UNKNOWN_01: 0x0002,
    MYSTERY_BOX: 0x0004,
    MOG_GARDEN: 0x0008,
    MAIL2ACCOUNT: 0x0010,
    INSCRIBABLE: 0x0020,
    NOAUCTION: 0x0040,
    SCROLL: 0x0080,
    LINKSHELL: 0x0100,
    CANUSE: 0x0200,
    CANTRADENPC: 0x0400,
    CANEQUIP: 0x0800,
    NOSALE: 0x1000,
    NODELIVERY: 0x2000,
    EX: 0x4000,
    RARE: 0x8000,
};

export function flagBitsToArray(bits: number): string[] {
    const flags: string[] = [];

    for (const [flag, bit] of Object.entries(flagBits)) {
        if ((bit & bits) !== 0) {
            flags.push(flag);
        }
    }

    return flags;
}

export function arrayToFlagBits(flags: string[]): number {
    let bits = 0;

    for (const flag of flags) {
        bits |= flagBits[flag];
    }

    return bits;
}

const raceBits: Record<string, number> = {
    NONE: 1,
    HUME_M: 2,
    HUME_F: 4,
    ELVAAN_M: 8,
    ELVAAN_F: 16,
    TARU_M: 32,
    TARU_F: 64,
    MITHRA: 128,
    GALKA: 256,
    VIERA: 512,
};

export function raceBitsToArray(bits: number): string[] {
    const races: string[] = [];

    for (const [race, bit] of Object.entries(raceBits)) {
        if ((bit & bits) !== 0) {
            races.push(race);
        }
    }

    return races;
}

export function arrayToRaceBits(races: string[]): number {
    let bits = 0;

    for (const race of races) {
        bits |= raceBits[race];
    }

    return bits;
}

const slotBits: Record<string, number> = {
    MAIN: 0x0001,
    SUB: 0x0002,
    RANGED: 0x0004,
    AMMO: 0x0008,
    HEAD: 0x0010,
    BODY: 0x0020,
    HANDS: 0x0040,
    LEGS: 0x0080,
    FEET: 0x0100,
    NECK: 0x0200,
    WAIST: 0x0400,
    EAR1: 0x0800,
    EAR2: 0x1000,
    RING1: 0x2000,
    RING2: 0x4000,
    BACK: 0x8000,
};

export function slotBitsToArray(bits: number): string[] {
    const slots: string[] = [];

    for (const [slot, bit] of Object.entries(slotBits)) {
        if ((bit & bits) !== 0) {
            slots.push(slot);
        }
    }

    return slots;
}

export function arrayToSlotBits(slots: string[]): number {
    let bits = 0;

    for (const slot of slots) {
        bits |= slotBits[slot];
    }

    return bits;
}
