import { readFileSync, writeFileSync } from 'fs';

import { ChunkedResourceType, ChunkedResource } from '../common/resources/chunked-resource';

import {
    getTargets,
    getType,
    getValidTargets,
} from '../common/fields';

if (process.argv.length !== 4) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const menuDat = readFileSync(process.argv[2]);

const menuRes = new ChunkedResource(menuDat);

const comm: any = [];

for (let i = 0; i < menuRes.resources.length; i++) {
    const res = menuRes.resources[i];

    if (res.type == ChunkedResourceType.Acb && res.name === 'comm') {
        
        const numComm = Math.floor(res.temp.length / 48);

        for (let s = 0; s < numComm; s++) {
            const b = res.temp.subarray(s * 48, (s + 1) * 48);

            const obj: any = {};

            obj.id = b.readInt16LE(0x00);
            obj.type = getType(b.readUInt8(0x02));
            obj.iconId = b.readInt8(0x03);
            obj.icon2Id = b.readInt16LE(0x04);
            obj.chargesRequired = b.readInt16LE(0x06);
            obj.targets = getTargets(b.readUInt16LE(0x0A));
            obj.tpCost = b.readInt16LE(0x0C);
            obj.level = b.readInt8(0x0F);
            obj.range = b.readInt8(0x10);
            obj.radius = b.readInt8(0x11);
            obj.aoeType = b.readInt8(0x12);
            obj.validTargets = getValidTargets(b.readUInt16LE(0x13));
            obj.tpModifier = b.readInt8(0x15);
            obj.tpModifierValues = [];
            for (let l = 0; l < 3; l++) {
                obj.tpModifierValues[l] = b.readInt16LE(0x16 + l * 2);
            }

            // old: _08
            obj.recastId = b.readInt16LE(0x08);

            obj._0E = b.readInt8(0x0E);
            obj._14 = b.readInt8(0x14);
            obj._1C = b.readInt16LE(0x1C);
            obj._1E = b.readInt16LE(0x1E);
            obj._20 = b.readInt8(0x20);
            obj._21 = b.readInt8(0x21);
            obj._22 = b.readInt16LE(0x22);
            obj._24 = b.readInt8(0x24);
            obj._25 = b.readInt8(0x25);
            obj._26 = b.readInt8(0x26);
            obj._27 = b.readInt8(0x27);
            obj._28 = b.readInt8(0x28);
            obj._29 = b.readInt8(0x29);
            obj._2A = b.readInt8(0x2A);
            obj._2B = b.readInt8(0x2B);
            obj._2C = b.readInt8(0x2C);
            obj._2D = b.readInt8(0x2D);
            obj._2E = b.readInt8(0x2E);
            obj._2F = b.readInt8(0x2F);

            comm.push(obj);
        }
    }
}

writeFileSync(process.argv[3], JSON.stringify(comm, null, 4));
