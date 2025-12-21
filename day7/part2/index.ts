import fs from 'node:fs';

type IRow = {
    splitterIndexes: number[],
    line: string
}

type IPuzzleInput = {
    startAtIndex: number,
    rows: IRow[],
    width: number
};

export function solve(input: IPuzzleInput) {
    const beamBits = new Array(input.width).fill(0);
    beamBits[input.startAtIndex] = 1;

    const paths = iterate(input, 0, beamBits);
    return paths.reduce((acc, cur) => acc + cur, 0)
}

function iterate(input: IPuzzleInput, rowIndex: number, beamBits: number[]): number[] {
    if (rowIndex >= input.rows.length) {
        return beamBits;
    }

    for (let x = 0; x < input.width - 1; x++) {
        const char = input.rows[rowIndex]?.line.charAt(x);
        if (char === '^') {
            beamBits[x - 1]! += beamBits[x]!;
            beamBits[x + 1]! += beamBits[x]!;
            beamBits[x] = 0;
        }   
    }
    
    return iterate(input, rowIndex + 1, beamBits);
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');

    const startIndexInFirstRow = lines[0]!.indexOf('S');
    if (!startIndexInFirstRow) throw new Error();

    const rows: IRow[] = []
    for (let i = 1; i < lines.length; i++) {
        const splitterIndexes: number[] = []; 
        lines[i]!.matchAll(/\^/g).forEach(match => {
            splitterIndexes.push(match.index)
        });
        
        rows.push({
            splitterIndexes,
            line: lines[i]!
        })
    }

    return {
        startAtIndex: startIndexInFirstRow,
        rows,
        width: lines[0]!.length
    };
}