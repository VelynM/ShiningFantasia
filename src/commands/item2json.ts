import { readFileSync, writeFileSync } from 'fs';

import { ItemDatabase } from '../common/resources/item';

import {
    flagBitsToArray,
    jobBitsToArray,
    raceBitsToArray,
    skillToString,
    slotBitsToArray,
} from '../common/fields';

if (process.argv.length != 5) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const jDat = readFileSync(process.argv[2]);
const eDat = readFileSync(process.argv[3]);

const jItems = new ItemDatabase(jDat);
const eItems = new ItemDatabase(eDat);

if (jItems.entries.length !== eItems.entries.length) {
    console.error('Item database mismatch between Japanese and English!');
    process.exit(1);
}

for (let i = 0; i < jItems.entries.length; i++) {
    const jItem = jItems.entries[i];
    const eItem = eItems.entries[i];

    if (jItem.id !== eItem.id) {
        console.error(`Item id mismatch between Japanese (${jItem.id}) and English (${eItem.id})!`);
        process.exit(1);
    }

    if (jItem.iconTextureBase64 != eItem.iconTextureBase64) {
        console.error(`Item icon texture mismatch between Japanese (${jItem.id}) and English (${eItem.id})!`);
        process.exit(1);
    }
}

const fieldNames = [
    'id',
    'type',
    'kind',
    'text',
    'flags',
    'stack',
    'targets',
    'level',
    'slots',
    'races',
    'jobs',
    'slvl',
    'skill',
    '_unk15',
    '_unk16',
    'shieldSize',
    'dmg',
    'delay',
    'dps',
    '_unk21',
    '_unk23',
    '_unk24',
    'emote',
    '_unk26',
    '_unk27',
    '_unk28',
    '_unk29',
    '_unk30',
    '_unk31',
    '_unk32',
    '_unk33',
    '_unk34',
    '_unk35',
    '_unk36',
    '_unk37',
    '_unk38',
    'ilvl',
    '_unk40',
    '_unk41',
    '_unk42',
    '_unk43',
    '_unk44',
    '_unk45',
    '_unk46',
    '_unk47',
    '_unk48',
    '_unk49',
    '_unk50',
    '_unk51',
    'aoeModifier',
    '_unk53',
    '_unk54',
    '_unk55',
    '_unk56',
    '_unk57',
    'radius',
    'aoeType',
    'validTargets',
    'iconTextureBase64',
];

// todo
// aoeModifier
// 1: YAGRUSH
// 2: EPEOLATRY
// 3: LUZAFS_RING
// 4: STRING_INSTRUMENT
// 5: YAGYU_DARKBLADE

const itemList: Array<any> = [];

for (let i = 0; i < jItems.entries.length; i++) {
    const jItem = jItems.entries[i];
    const eItem = eItems.entries[i];

    const item = {} as any;

    const _eItem: any = eItem; // Working around TS type-checking.

    for (const field of fieldNames) {
        if (_eItem[field] !== undefined) {
            if (field === 'text') {
                item.englishText = eItem.text;
                item.japaneseText = jItem.text;
            } else if (field === 'flags') {
                item.flags = flagBitsToArray(eItem.flags!);
            } else if (field === 'races') {
                item.races = raceBitsToArray(eItem.races!);
            } else if (field === 'jobs') {
                item.jobs = jobBitsToArray(eItem.jobs!);
            } else if (field === 'slots') {
                item.slots = slotBitsToArray(eItem.slots!);
            } else if (field === 'skill') {
                item.skill = skillToString(eItem.skill!);
            } else {
                item[field] = _eItem[field];
            }
        }
    }

    itemList.push(item);
}

writeFileSync(process.argv[4], JSON.stringify(itemList, null, 4));
