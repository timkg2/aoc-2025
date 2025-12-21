import fs from 'node:fs';

type IRow = {
    splitterIndexes: number[]
}

type IPuzzleInput = {
    startAtIndex: number,
    rows: IRow[],
    width: number
};

export function solve(input: IPuzzleInput) {
    const beamBits = new Array(input.width).fill(false);
    beamBits[input.startAtIndex] = true;

    return iterate(input, 0, beamBits, 0);
}

function iterate(input: IPuzzleInput, rowIndex: number, beamBits: boolean[], splitsAcc: number = 0) {
    if (rowIndex >= input.rows.length) {
        return splitsAcc;
    }

    const splitters = input.rows[rowIndex]?.splitterIndexes;
    let splits = 0;

    const symbols: string[] = beamBits.map(b => b === true ? '|' : '.' );
    
    if (splitters?.length) {
        splitters.forEach(splitterIndex => {
            if (beamBits[splitterIndex]) {
                // active beam is hitting splitter
                splits += 1;
                beamBits[splitterIndex] = false;
                beamBits[splitterIndex - 1] = true;
                beamBits[splitterIndex + 1] = true;
                
                symbols[splitterIndex - 1]! = '|';
                symbols[splitterIndex + 1]! = '|';
            }
            symbols[splitterIndex] = '^'
        })
    }

    // console.log(symbols.join(''));
    
    return iterate(input, rowIndex + 1, beamBits, splitsAcc + splits);
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
            splitterIndexes
        })
    }

    return {
        startAtIndex: startIndexInFirstRow,
        rows,
        width: lines[0]!.length
    };
}