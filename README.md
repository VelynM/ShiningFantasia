# Shining Fantasia

## How to use the command line utilities (rough sketch)

1. Download and install latest Node.js LTS release, 20.10.0 LTS at the time of writing
2. From a command prompt, in the ShiningFantasia directory, run `npm install`
3. And then run `npm run build`
4. `node ./build/commands/<command>/index.js <parameters>`

## How to use the command line utilities, the vite-node way (rough sketch)

1. Download and install latest Node.js LTS release, 20.10.0 LTS at the time of writing
2. From a command prompt, in the ShiningFantasia directory, run `npm install`
3. `npx vite-node ./src/commands/<command>.ts <parameters>`

## How to use the command line utilities, the deno way (rough sketch, experimental)

1. Download and install [deno](https://deno.com)
2. `deno --unstable-sloppy-imports run --allow-read --allow-write ./src/commands/<command>.ts <parameters>`

## How to use the Electron application

I am undecided whether or not to keep the Electron application, so it may not exist in the future.

## Commands

- `item2json`
- `json2item`
- `dmsg2json`
- `json2dmsg`
- `xistring2json`
- `mgc2json`
- `json2mgc`
- `comm2json`
- `json2comm`
- `merit2json`
- `json2merit`

### The future

- `meb2json`
- `msb2json`
- `json2xistring`, if requested
