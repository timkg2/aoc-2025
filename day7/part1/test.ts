/// <reference lib="deno.ns" />
import { getInput, solve } from "./index.ts";
import assert from "node:assert";

Deno.test("day 7, part 1 - get input", () => {
    const input = getInput("./test-input.txt");
    const expected = {
        rows: [
            { splitterIndexes: [] },
            { splitterIndexes: [7] },
            { splitterIndexes: [] },
            { splitterIndexes: [6, 8] },
            { splitterIndexes: [] },
            { splitterIndexes: [5, 7, 9] },
            { splitterIndexes: [] },
            { splitterIndexes: [4, 6, 10] },
            { splitterIndexes: [] },
            { splitterIndexes: [3, 5, 9, 11] },
            { splitterIndexes: [] },
            { splitterIndexes: [2, 6, 12] },
            { splitterIndexes: [] },
            { splitterIndexes: [1, 3, 5, 7, 9, 13] },
            { splitterIndexes: [] }
        ],
        startAtIndex: 7,
        width: 15,
    };
    assert.deepStrictEqual(input, expected);
});

Deno.test("day 7, part 1 - solve test input", () => {
    const input = getInput("./test-input.txt");
    const res = solve(input);
    assert.equal(res, 21);
});

Deno.test('day 7, part 1 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 1698)
})
