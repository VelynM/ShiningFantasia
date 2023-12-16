import { readFileSync, writeFileSync } from 'fs';

import { jobBitsToArray } from '../common/fields';

if (process.argv.length !== 4) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const meritBuf = readFileSync(process.argv[2]);

if ((meritBuf.length % 12) !== 0) {
    console.error('Invalid merit dat!');
    process.exit(1);
}

const merit: any[] = [];

for (let i = 0; i < meritBuf.length; i += 12) {
    //  word id; byte category; byte index; byte maxMerits; byte dontknow0; byte dontknow1; byte dontknow2; dword jobMask

    merit.push({
        id: meritBuf.readUInt16LE(i + 0x00),
        category: meritBuf.readUInt8(i + 0x02),
        index: meritBuf.readUInt8(i + 0x03),
        maxMerits: meritBuf.readUInt8(i + 0x04),
        _05: meritBuf.readUInt8(i + 0x05),
        _06: meritBuf.readUInt8(i + 0x06),
        _07: meritBuf.readUInt8(i + 0x07),
        jobs: jobBitsToArray(meritBuf.readUInt32LE(i + 0x08))
    });
}

writeFileSync(process.argv[3], JSON.stringify(merit, null, 4));
