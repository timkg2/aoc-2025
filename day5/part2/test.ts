import { getInput, isOverlapping, mergeRanges, solve } from "./index.ts";
import assert from "node:assert";

Deno.test("day 5, part 2 - test input", () => {
    const input = getInput("./test-input.txt");
    const res = solve(input);
    // console.log(res)
    assert.equal(res, 14);
});

Deno.test("mergeRanges - test input", () => {
    const input = getInput("./test-input.txt");
    const res = mergeRanges(input.ranges);
    const expected = [
        { lower: 3, upper: 5 },
        { lower: 10, upper: 20 },
    ];
    assert.deepStrictEqual(res.map((r) => r.toJSON()), expected);
});

Deno.test("mergeRanges - puzzle input", () => {
    const input = getInput("../puzzle-input.txt");
    const res = mergeRanges(input.ranges).sort((a, b) => a.lower - b.lower);

    const overlaps = res.filter((r, i1) => {
        let hasOverlap = false;
        res.forEach((r2, i2) => {
            if (i1 !== i2 && isOverlapping(r, r2)) {
                console.log`${i1} overlaps with ${i2}: ${r}, ${r2}`;
                hasOverlap = true;
            }
        });
        return hasOverlap;
    });
    assert.equal(overlaps.length, 0)
});

Deno.test('day 5, part 2 - puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 347338785050515)
})
