import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

import {
    arrayToJobBits,
} from '../common/fields';

if (process.argv.length !== 4) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const jsonData: any = readFileSync(process.argv[2]);

const meritJson = JSON.parse(jsonData);

const merit: any[] = [];

for (let i = 0; i < meritJson.length; i++) {
    const mObj = meritJson[i];

    const meritBuf = Buffer.alloc(12);

    //  word id; byte category; byte index; byte maxMerits; byte dontknow0; byte dontknow1; byte dontknow2; dword jobMask

    meritBuf.writeUInt16LE(mObj.id, 0x00);
    meritBuf.writeUInt8(mObj.category, 0x02);
    meritBuf.writeUInt8(mObj.index, 0x03);
    meritBuf.writeUInt8(mObj.maxMerits, 0x04);
    meritBuf.writeUInt8(mObj._05, 0x05);
    meritBuf.writeUInt8(mObj._06, 0x06);
    meritBuf.writeUInt8(mObj._07, 0x07);
    meritBuf.writeUInt32LE(arrayToJobBits(mObj.jobs), 0x08);

    merit.push(meritBuf);
}

const outBin = Buffer.concat(merit);
writeFileSync(process.argv[3], outBin);
