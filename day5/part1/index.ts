 /// <reference lib="deno.ns" />
import fs from 'node:fs';

type IRange = {
    lower: number,
    upper: number
}

type IInput = {
    ranges: IRange[],
    ids: number[],
}

export function solve(input: IInput) {
    const db = new ProductDB(input);
    const freshProducts = input.ids.filter(id => db.isFresh(id));
    return freshProducts.length;
}

class ProductDB {
    constructor(
        public input: IInput
    ) {}

    isFresh(id: number): boolean {
        const isInRanges = this.input.ranges.filter(r => r.lower <= id && r.upper >= id);
        return isInRanges.length > 0;
    }
}

export function getInput(filename: string): IInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const input: IInput = {
        ranges: [],
        ids: [],
    }
    let reading: 'RANGE' | 'ID' = 'RANGE';
    lines.forEach(l => {
        if (l === '') {
            reading = 'ID';
            return;
        }

        if (reading === 'RANGE') {
            const parts = l.split('-');
            if (parts.length !== 2) throw new Error();
            input.ranges.push({
                lower: parseInt(parts[0]!, 10),
                upper: parseInt(parts[1]!, 10)
            });
        }

        if (reading === 'ID') {
            input.ids.push(parseInt(l, 10));
        }
    })
    return input;
}