import fs from 'node:fs';

export type IRange = {
    from: number,
    to: number
}

export function solve(ranges: IRange[]) {
    const sumOfInvalidIds = ranges.reduce((acc, curr) => {
        const invalidIds = getInvalidIdsInRange(curr)
        console.log(invalidIds)
        const sum = invalidIds.reduce((acc, curr) => {return acc + curr}, 0)
        return sum + acc
    }, 0);
    console.log('sumOfInvalidIds', sumOfInvalidIds)
}

function getInvalidIdsInRange(range: IRange) {
    const { from, to } = range;
    const invalidIds = [];
    // console.log(`There are ${to - from} IDs in range [${from}, ${to}]`);
    const shouldInspectRange = canRangeContainInvalidIds(range);
    if (shouldInspectRange) {
        const startAt = getIterationStart(range);
        // console.log(`Skipping ${startAt - from} IDs and starting at ${startAt}`);
        for (let i = 0; i <= to - startAt; i++) {
            const curr = startAt + i;
            if (isInvalidId(curr)) {
                invalidIds.push(curr)
            }
        }
    }

    return invalidIds;
}

function isInvalidId(id: number) {
    const fromNumberOfDigits = id.toString().length;
    if (fromNumberOfDigits % 2 !== 0) {
        return false;
    }
    const firstPart = id.toString().substring(0, fromNumberOfDigits / 2);
    const secondPart = id.toString().substring(fromNumberOfDigits / 2);

    return firstPart === secondPart;
}

function canRangeContainInvalidIds(range: IRange) {
    // An invalid ID is a 'sequence of digits' repeated twice
    // e.g. '11', '1212', '321312'
    const { from, to } = range;

    // A number with odd amount of digits cannot be an invalid ID
    const fromNumberOfDigits = from.toString().length;
    const toNumberOfDigits = to.toString().length;
    if (fromNumberOfDigits % 2 !== 0 && toNumberOfDigits === fromNumberOfDigits) {
        console.log(`[${from}, ${to}] cannot contain invalid IDs`);
        return false;
    }

    return true;
}

function getIterationStart(range: IRange) {
    // We can skip ahead from the lower bound of a range
    // to the first number with repeated pattern, preventing unnecessary iterations.
    // e.g. range [5500, 6000] - we can skip to 5555 because numbers between [5500, 5554]
    // will by definition not contain invalid IDs.
    const { from, to } = range;
    const fromNumberOfDigits = from.toString().length;
    if (fromNumberOfDigits % 2 !== 0) {
        // Our skip-ahead trick only works for lower bound with even number of digits
        // If we have an odd number of digits, just return it as iteration start
        return from;
    }
    const firstPart = from.toString().substring(0, fromNumberOfDigits / 2);
    const firstInvalidId = parseInt(`${firstPart}${firstPart}`, 10);

    if (firstInvalidId <= range.to && firstInvalidId >= range.from) {
        // make sure we stay in bounds
        return firstInvalidId
    } else {
        return range.from
    }

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