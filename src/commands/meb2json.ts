import { readFileSync } from 'node:fs';
import process from 'node:process';

import { ChunkedResource, ChunkedResourceType } from '../common/resources';

if (process.argv.length !== 4) {
    console.error('Incorrect command line arguments!');
    process.exit(1);
}

const resBin = readFileSync(process.argv[2]);

const resource = new ChunkedResource(resBin);

for (let i = 0; i < resource.resources.length; i++) {
    const res = resource.resources[i];

    if (res.type == ChunkedResourceType.Meb) {
        false
    }
}
