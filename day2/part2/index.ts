import fs from 'node:fs';

export type IRange = {
    from: number,
    to: number
}

export function solve(ranges: IRange[]) {
    const sumOfInvalidIds = ranges.reduce((acc, curr) => {
        const invalidIds = getInvalidIdsInRange(curr)
        console.log(invalidIds)
        const sum = invalidIds.reduce((acc, curr) => { return acc + curr }, 0)
        return sum + acc
    }, 0);
    console.log('sumOfInvalidIds', sumOfInvalidIds)
    return sumOfInvalidIds
}

function getInvalidIdsInRange(range: IRange) {
    const { from, to } = range;
    const invalidIds = [];
    // console.log(`There are ${to - from} IDs in range [${from}, ${to}]`);
    for (let i = 0; i <= to - from; i++) {
        const curr = from + i;
        if (isInvalidId(curr)) {
            invalidIds.push(curr)
        }
    }

    return invalidIds;
}

export function isInvalidId(id: number) {
    const idString = id.toString();
    let isInvalid = false;

    // We'll start looking at first digit, increasing to 2-digit, 3-digit etc patterns.
    for (let i=0; i<Math.floor(idString.length / 2); i++) {
        const sequence = idString.substring(0, i + 1);
        // match strings which start with our 'sequence', allowing repetitions of the sequence,
        // with no other chars until end of string (= nothing else than 1 or more times 'sequence') 
        const pattern = `^(${sequence})+$`
        const regex = new RegExp(pattern)
        const matches = idString.match(regex)
        if (matches?.length) {
            isInvalid = true;
            break;
        }
    }
    
    return isInvalid;
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(`./${filename}`, { encoding: 'utf8' });
    const rangeStrings = fileContents.split(',');

    const ranges: IRange[] = rangeStrings.map(rs => {
        const parts = rs.split('-');
        if (parts.length !== 2) {
            throw new Error("");
        }
        const from = parseInt(parts[0]!, 10);
        const to = parseInt(parts[1]!, 10);

        return {
            from,
            to
        }
    });

    return ranges;
}