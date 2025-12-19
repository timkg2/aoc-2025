import fs from 'node:fs';

export function solve(input: unknown) {
    return 0;
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(`./${filename}`, { encoding: 'utf8' });
    
    return fileContents;
}