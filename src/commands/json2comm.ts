import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

import { lsb32 } from '../common/bytes';
import { encode as encodeMgc_ } from '../common/mgc-decode';
import { decodeString } from '../common/string';
import { ChunkedResourceType } from '../common/resources/chunked-resource';

import {
    getTargetBits,
    getTypeId,
    getValidTargetId,
} from '../common/fields';

if (process.argv.length !== 4 && process.argv.length !== 5) {
    console.error('Incorrect command line arguments!');
    console.error(`usage: ${process.argv[1]} <comm.json> <BASE 114.DAT> <NEW 114.DAT>`);
    console.error(`OR: ${process.argv[1]} <comm.json> <RAW COMM BIN OUTPUT>`);
    console.error(`NOTE: DAT splicing support may be deprecated in the future!`);
    process.exit(1);
}

const jsonData: any = readFileSync(process.argv[2]);

const commJson = JSON.parse(jsonData);

const comm = Buffer.alloc(48 * commJson.length);

for (let i = 0; i < commJson.length; i++) {
    const b = comm.subarray(i * 48);

    for (const [k, v] of Object.entries(commJson[i])) {
        switch (k) {
            case 'id': {
                b.writeUInt16LE(v as number, 0x00);
            }
            break;

            case 'type': {
                b.writeUInt8(getTypeId(v as string), 0x02);
            }
            break;

            case 'iconId': {
                b.writeInt8(v as number, 0x03);
            }
            break;

            case 'icon2Id': {
                b.writeInt16LE(v as number, 0x04);
            }
            break;

            case 'chargesRequired': {
                b.writeInt16LE(v as number, 0x06);
            }
            break;

            case 'targets': {
                b.writeUInt16LE(getTargetBits(v as string[]), 0x0A);
            }
            break;

            case 'tpCost': {
                b.writeInt16LE(v as number, 0x0C);
            }
            break;

            case 'level': {
                b.writeInt8(v as number, 0x0F);
            }
            break;

            case 'range': {
                b.writeInt8(v as number, 0x10);
            }
            break;

            case 'radius': {
                b.writeInt8(v as number, 0x11);
            }
            break;

            case 'aoeType': {
                b.writeInt8(v as number, 0x12);
            }
            break;

            case 'validTargets': {
                b.writeUInt16LE(getValidTargetId(v as string), 0x13);
            }
            break;

            case 'tpModifier': {
                b.writeInt8(v as number, 0x15);
            }
            break;

            case 'tpModifierValues': {
                for (let l = 0; l < 3; l++) {
                    const vv = v as number[]
                    b.writeInt16LE(vv[l], 0x16 + l * 2);
                }
            }
            break;

            case 'recastId':
            case '_08': {
                b.writeInt16LE(v as number, 0x08);
            }
            break;

            case '_0E': {
                b.writeInt8(v as number, 0x0E);
            }
            break;

            case '_14': {
                b.writeInt8(v as number, 0x14);
            }
            break;

            case '_1C': {
                b.writeInt16LE(v as number, 0x1C);
            }
            break;

            case '_1E': {
                b.writeInt16LE(v as number, 0x1E);
            }
            break;

            case '_20': {
                b.writeInt8(v as number, 0x20);
            }
            break;

            case '_21': {
                b.writeInt8(v as number, 0x21);
            }
            break;

            case '_22': {
                b.writeInt16LE(v as number, 0x22);
            }
            break;

            case '_24': {
                b.writeInt8(v as number, 0x24);
            }
            break;

            case '_25': {
                b.writeInt8(v as number, 0x25);
            }
            break;

            case '_26': {
                b.writeInt8(v as number, 0x26);
            }
            break;

            case '_27': {
                b.writeInt8(v as number, 0x27);
            }
            break;

            case '_28': {
                b.writeInt8(v as number, 0x28);
            }
            break;

            case '_29': {
                b.writeInt8(v as number, 0x29);
            }
            break;

            case '_2A': {
                b.writeInt8(v as number, 0x2A);
            }
            break;

            case '_2B': {
                b.writeInt8(v as number, 0x2B);
            }
            break;

            case '_2C': {
                b.writeInt8(v as number, 0x2C);
            }
            break;

            case '_2D': {
                b.writeInt8(v as number, 0x2D);
            }
            break;

            case '_2E': {
                b.writeInt8(v as number, 0x2E);
            }
            break;

            case '_2F': {
                b.writeInt8(v as number, 0x2F);
            }
            break;

        }
    }
}

encodeMgc_(comm, 48);

if (process.argv.length === 4) {
    writeFileSync(process.argv[3], comm);
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

        if (type === ChunkedResourceType.Acb && name === 'comm') {
            const header = Buffer.alloc(16);

            // 'comm'
            header[0] = 99;
            header[1] = 111;
            header[2] = 109;
            header[3] = 109;

            header.writeUInt32LE((ChunkedResourceType.Acb) | (((comm.length + 16) >> 4) << 7) | (flags << 28), 4);
            chunks.push(header);
            chunks.push(comm);
        } else {
            chunks.push(resBuf);
        }
    }

    const outBin = Buffer.concat(chunks);
    writeFileSync(process.argv[4], outBin);
}
