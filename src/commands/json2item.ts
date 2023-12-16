import { readFileSync, writeFileSync } from 'fs';

import { Item, exportDat } from '../common/resources/item';

import {
    arrayToFlagBits,
    arrayToJobBits,
    arrayToRaceBits,
    arrayToSlotBits,
    stringToSkill,
} from '../common/fields';

if (process.argv.length != 5) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const jsonData: any = readFileSync(process.argv[2]);

const itemsJson = JSON.parse(jsonData);

const eDats: Item[] = [];
const jDats: Item[] = [];

// Backwards compatibility for older field names
const fieldRenames: Record<string, string> = {
    '_unk52': 'aoeModifier',
    '_unk58': 'radius',
    '_unk59': 'aoeType',
    '_unk60': 'validTargets'
};

for (let i = 0; i < itemsJson.length; i++) {

    const item = itemsJson[i];

    let eItem: any = {};
    let jItem: any = {};

    for (let field of Object.keys(item)) {
        const rename = fieldRenames[field];
        if (rename) {
            item[rename] = item[field];
            field = rename;
        }

        if (field === 'englishText') {
            eItem.text = item.englishText;
        } else if (field == 'japaneseText') {
            jItem.text = item.japaneseText;
        } else if (field === 'flags') {
            item.flags = arrayToFlagBits(item.flags!);
        } else if (field === 'races') {
            item.races = arrayToRaceBits(item.races!);
        } else if (field === 'jobs') {
            item.jobs = arrayToJobBits(item.jobs!);
        } else if (field === 'slots') {
            item.slots = arrayToSlotBits(item.slots!);
        } else if (field === 'skill') {
            item.skill = stringToSkill(item.skill!);
        }

    }

    delete item.englishText;
    delete item.japaneseText;

    // delete old field names
    for (const field of Object.keys(fieldRenames)) {
        delete item[field];
    }

    eItem = { ...item, ...eItem };
    jItem = { ...item, ...jItem };

    eDats.push(eItem);
    jDats.push(jItem);
}

const eBin = exportDat(eDats);
const jBin = exportDat(jDats);

writeFileSync(process.argv[3], jBin);
writeFileSync(process.argv[4], eBin);
