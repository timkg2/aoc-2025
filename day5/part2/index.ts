 /// <reference lib="deno.ns" />
import fs from 'node:fs';

type IRange = {
    lower: number,
    upper: number
}

class Range implements IRange {
    constructor(
        public lower: number,
        public upper: number,
    ) {}

    toString() {
        return `[${this.lower}, ${this.upper}]`
    }

    toJSON() {
        return { lower: this.lower, upper: this.upper }
    }

    static fromJSON(rangeJSON: IRange) {
        return new Range(rangeJSON.lower, rangeJSON.upper);
    }
}

type IInput = {
    ranges: Range[],
    ids: number[],
}

export function solve(input: IInput) {
    const ranges = mergeRanges(input.ranges).sort((a, b) => a.lower - b.lower)
    const numberOfIds = ranges.reduce((acc, curr) => {
        const rangeSize = (curr.upper - curr.lower) + 1;
        // console.log(`[${curr.lower}, ${curr.upper}] has range size ${rangeSize}`)
        return acc + rangeSize;
    }, 0);

    const numberOfIdsUnmerged = input.ranges.reduce((acc, curr) => {
        const rangeSize = (curr.upper - curr.lower) + 1;
        return acc + rangeSize;
    }, 0);

    console.log('merged', numberOfIds, 'unmerged', numberOfIdsUnmerged)
    
    return numberOfIds;
}

export function mergeRanges(unmergedRanges: Range[]): Range[] {
    if (unmergedRanges.length < 2) return unmergedRanges;

    const mergedRanges: Range[] = [];
    const compactedRangeIndexes = new Set<number>();
    let range: Range|undefined;

    for (let i = 0; i < unmergedRanges.length; i++) {
        if (compactedRangeIndexes.has(i)) continue;
        let wasCompacted = false;
        range = unmergedRanges[i]!;
        do {
            wasCompacted = false;
            for (let j = 0; j < unmergedRanges.length; j++) {
                if (compactedRangeIndexes.has(j)) continue;
                if (i === j) continue;
                const overlaps = isOverlapping(range, unmergedRanges[j]!);
                if (overlaps) {
                    range = compactRanges(range, unmergedRanges[j]!)
                    compactedRangeIndexes.add(j)
                    wasCompacted = true;
                }
            }
        } while (wasCompacted);

        mergedRanges.push(range);
    }

    console.log('compacted', compactedRangeIndexes.size, 'from total', unmergedRanges.length, 'leaving', mergedRanges.length)

    return mergedRanges;
}

function compactRanges(first: Range, second: Range): Range {
    let compacted: Range | undefined = undefined;

    // first is subsumed in second
    if (first.lower >= second.lower && first.upper <= second.upper) {
        compacted = second;
    }
     // second is subsumed in first
    if (second.lower >= first.lower && second.upper <= first.upper) {
        compacted = first;
    }
    
    // first extends second lower
    if (first.lower < second.lower && first.upper <= second.upper) {
        compacted = Range.fromJSON({
            lower: first.lower,
            upper: second.upper,
        });
    }
    // second extends first lower
    if (second.lower < first.lower && second.upper <= first.upper) {
        compacted = Range.fromJSON({
            lower: second.lower,
            upper: first.upper,
        });
    }

    // first extends second upper
    if (first.lower > second.lower && first.lower < second.upper && first.upper > second.upper) {
        compacted = Range.fromJSON({
            lower: second.lower,
            upper: first.upper,
        });
    }
    // second extends first upper
    if (second.lower > first.lower && second.lower < first.upper && second.upper > first.upper) {
        compacted = Range.fromJSON({
            lower: first.lower,
            upper: second.upper,
        });
    }

    if (typeof compacted === 'undefined') throw new Error();

    return compacted;
}

export function isOverlapping(range: IRange, other: IRange): boolean {
    return (range.lower >= other.lower && range.lower <= other.upper) 
        || (range.upper >= other.lower && range.upper <= other.upper)
        || (other.lower >= range.lower && other.lower <= range.upper) 
        || (other.upper >= range.lower && other.upper <= range.upper)
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
            input.ranges.push(
                new Range(
                    parseInt(parts[0]!, 10),
                    parseInt(parts[1]!, 10)
                )
            );
        }

        if (reading === 'ID') {
            input.ids.push(parseInt(l, 10));
        }
    })
    return input;
}