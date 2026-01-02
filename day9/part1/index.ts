import fs from 'node:fs';

type IPuzzleInput = unknown;

export function solve(input: IPuzzleInput) {
    return 0;
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    
    return fileContents;
}