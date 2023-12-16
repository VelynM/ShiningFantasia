import { readFileSync, writeFileSync } from 'fs';

import { lsb32 } from '../common/bytes';
import { encode as encodeMgc_ } from '../common/mgc-decode';
import { decodeString } from '../common/string';
import { ChunkedResourceType } from '../common/resources/chunked-resource';

import {
    arrayToJobBits,
    getAoeId,
    getElementId,
    getJobId,
    getMagicTypeId,
    getModifierBits,
    getModifierExBits,
    getTargetBits,
    getValidTargetId,
    stringToSkill,
} from '../common/fields';

function getLevelBuffer(jobs: Record<string, number>): Buffer {
    const b = Buffer.alloc(24 * 2);

    // auto-fill with -1
    b.fill(0xFF);

    for (const [job, level] of Object.entries(jobs)) {
        const jobId = getJobId(job);
        if (jobId < 0) {
            console.error(`Invalid job ${job}`);
            continue;
        }

        b.writeInt16LE(level, jobId * 2);
    }

    return b;
}

if (process.argv.length !== 4 && process.argv.length !== 5) {
    console.error('Incorrect command line arguments!');
    console.error(`usage: ${process.argv[1]} <mgc.json> <BASE 114.DAT> <NEW 114.DAT>`);
    console.error(`OR: ${process.argv[1]} <mgc.json> <RAW MGC BIN OUTPUT>`);
    console.error(`NOTE: DAT splicing support may be deprecated in the future!`);
    process.exit(1);
}

const jsonData: any = readFileSync(process.argv[2]);

const mgcJson = JSON.parse(jsonData);

const mgc = Buffer.alloc(100 * mgcJson.length);

for (let i = 0; i < mgcJson.length; i++) {
    const b = mgc.subarray(i * 100);

    for (const [k, v] of Object.entries(mgcJson[i])) {
        switch (k) {
            case 'id': {
                b.writeUInt16LE(v as number, 0x00);
            }
            break;

            case 'magicType': {
                b.writeUInt16LE(getMagicTypeId(v as string), 0x02);
            }
            break;

            case 'element': {
                b.writeUInt16LE(getElementId(v as string), 0x04);
            }
            break;

            case 'targets': {
                b.writeUInt16LE(getTargetBits(v as string[]), 0x06);
            }
            break;

            case 'skill': {
                b.writeUInt16LE(stringToSkill(v as string), 0x08);
            }
            break;

            case 'mpCost': {
                b.writeUInt16LE(v as number, 0x0A);
            }
            break;

            case 'castTime': {
                b.writeUInt8(v as number, 0x0C);
            }
            break;

            case 'recastTime': {
                b.writeUInt8(v as number, 0x0D);
            }
            break;

            case 'levels': {
                b.fill(getLevelBuffer(v as Record<string, number>), 0x0E, 0x3E);
            }
            break;

            case 'iconId': {
                b.writeInt16LE(v as number, 0x40);
            }
            break;

            case 'icon2Id': {
                b.writeInt16LE(v as number, 0x42);
            }
            break;

            case 'modifiers': {
                b.writeUInt8(getModifierBits(v as string[]), 0x44);
            }
            break;

            case 'range': {
                b.writeInt8(v as number, 0x45);
            }
            break;

            case 'radius': {
                b.writeInt8(v as number, 0x46);
            }
            break;

            case 'aoeType': {
                b.writeUInt16LE(getAoeId(v as string), 0x47);
            }
            break;

            case 'validTargets': {
                b.writeUInt32LE(getValidTargetId(v as string), 0x48);
            }
            break;

            case 'modifiersEx': {
                b.writeUInt32LE(getModifierExBits(v as Record<string, string|boolean>), 0x4C);
            }
            break;

            case 'giftsRequired': {
                b.writeUInt32LE(arrayToJobBits(v as string[]), 0x5C);
            }
            break;

            case '_3E': {
                b.writeUInt16LE(v as number, 0x3E);
            }
            break;

            case '_50': {
                b.writeUInt32LE(parseInt(v as string, 16), 0x50);
            }
            break;

            case '_54': {
                b.writeUInt32LE(parseInt(v as string, 16), 0x54);
            }
            break;

            case '_58': {
                b.writeUInt32LE(parseInt(v as string, 16), 0x58);
            }
            break;

            case '_60': {
                b.writeUInt32LE(parseInt(v as string, 16), 0x60);
            }
            break;

            default: {
                console.error(`entry ${i} has unsupported field ${k}, ignoring...`);
            }
            break;
        }
    }
}

encodeMgc_(mgc, 100);

if (process.argv.length === 4) {
    writeFileSync(process.argv[3], mgc);
} else {
    const menuDat = readFileSync(process.argv[3]);

    const chunks: Buffer[] = [];

    let offset = 0;
    const b = menuDat;

    while (offset <= b.length - 16) {
        const name = decodeString(b.subarray(offset, offset + 4));

        const header0 = lsb32(b, offset + 4);
        const header1 = lsb32(b, offset + 8);
        const header2 = lsb32(b, offset + 12);

        const type = header0 & 0x7f;
        const length = (((header0 & 0xfffffff) >> 7) << 4) - 16;
        const flags = (header0 >> 28);

        if (b.length - offset < length + 16) {
            throw new Error('Corrupt Resource DAT');
        }

        const resBuf = b.subarray(offset, offset + length + 16);
        offset += 16;
        offset += length;

        if (type === ChunkedResourceType.Mgb && name === 'mgc_') {
            const header = Buffer.alloc(16);

            header[0] = 109;
            header[1] = 103;
            header[2] = 99;
            header[3] = 95;

            header.writeUInt32LE((ChunkedResourceType.Mgb) | (((mgc.length + 16) >> 4) << 7) | (flags << 28), 4);
            chunks.push(header);
            chunks.push(mgc);
        } else {
            chunks.push(resBuf);
        }
    }

    const outBin = Buffer.concat(chunks);
    writeFileSync(process.argv[4], outBin);
}
