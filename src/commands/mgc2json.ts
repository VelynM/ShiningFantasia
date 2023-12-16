import { readFileSync, writeFileSync } from 'fs';

import {
    getAoeType,
    getElementName,
    getJobName,
    getMagicTypeName,
    getModifiers,
    getModifiersEx,
    getTargets,
    getValidTargets,
    jobBitsToArray,
    skillToString,
} from '../common/fields';

import { ChunkedResourceType, ChunkedResource } from '../common/resources/chunked-resource';

if (process.argv.length !== 4) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const menuDat = readFileSync(process.argv[2]);

const menuRes = new ChunkedResource(menuDat);

const mgc: any = [];

for (let i = 0; i < menuRes.resources.length; i++) {
    const res = menuRes.resources[i];

    if (res.type == ChunkedResourceType.Mgb && res.name === 'mgc_') {
        
        const numSpells = Math.floor(res.temp.length / 100);

        for (let s = 0; s < numSpells; s++) {
            const b = res.temp.subarray(s * 100, (s + 1) * 100);

            const obj: any = {};

            obj.id = b.readUInt16LE(0x00);
            obj.magicType = getMagicTypeName(b.readUInt16LE(0x02));
            obj.element = getElementName(b.readUInt16LE(0x04));
            obj.targets = getTargets(b.readUInt16LE(0x06));
            obj.skill = skillToString(b.readUInt16LE(0x08));
            obj.mpCost = b.readUInt16LE(0x0A);
            obj.castTime = b.readUInt8(0x0C);
            obj.recastTime = b.readUInt8(0x0D);
            obj.levels = {};
            for (let l = 0; l < 24; l++) {
                const level = b.readInt16LE(0x0E + l * 2);
                if (level > -1) {
                    obj.levels[getJobName(l)] = level;
                }
            }
            obj.iconId = b.readInt16LE(0x40);
            obj.icon2Id = b.readInt16LE(0x42);
            obj.modifiers = getModifiers(b.readUInt8(0x44));
            // 0: 0
            // 1: 1
            // 2: 3
            // 3: 4
            // 4: 5
            // 5: 6
            // 6: 7
            // 7: 8
            // 8: 10
            // 9: 12
            // 10: 14
            // 11: 16
            // 12: 20
            // 13: 23
            // 14: 30
            // 15: 255

            // 0h,     1h,     3h,     4h
            // 5h,     6h,     7h,     8h
            // Ah,     Ch,     Eh,    10h
            // 14h,    19h,    1Eh,    FFh
            obj.range = b.readInt8(0x45);
            obj.radius = b.readInt8(0x46);
            obj.aoeType = getAoeType(b.readUInt8(0x47));
            obj.validTargets = getValidTargets(b.readUInt32LE(0x48));
            obj.modifiersEx = getModifiersEx(b.readUInt32LE(0x4C));
            obj.giftsRequired = jobBitsToArray(b.readUInt32LE(0x5C));

            // some other unique identifier
            obj._3E = b.readUInt16LE(0x3E);

            // magic type / kind-specific data
            obj._50 = b.readUInt32LE(0x50).toString(16).toUpperCase().padStart(8, '0');
            obj._54 = b.readUInt32LE(0x54).toString(16).toUpperCase().padStart(8, '0');
            obj._58 = b.readUInt32LE(0x58).toString(16).toUpperCase().padStart(8, '0');

            // trailer byte ff
            obj._60 = b.readUInt32LE(0x60).toString(16).toUpperCase().padStart(8, '0');

            mgc.push(obj);
        }
    }
}

writeFileSync(process.argv[3], JSON.stringify(mgc, null, 4));
