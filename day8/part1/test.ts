/// <reference lib="deno.ns" />
import { getDistance, getInput, solve, } from "./index.ts";
import assert from "node:assert";
import type { IVec3 } from "./src.ts";

Deno.test("getDistance", () => {
    const d1 = getDistance({ x: 1, y: 1, z: 1 }, { x: 2, y: 1, z: 1 });
    assert.equal(d1, 1);

    const d2 = getDistance({ x: 1, y: 1, z: 1 }, { x: 1, y: 2, z: 1 });
    assert.equal(d2, 1);

    const d3 = getDistance({ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 2 });
    assert.equal(d3, 1);
});

Deno.test('day 8, part 1 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 40)
});

Deno.test('day 8, part 1 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input, 1000);
    assert.equal(res, 164475)
})
