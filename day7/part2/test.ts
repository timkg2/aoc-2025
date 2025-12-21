/// <reference lib="deno.ns" />
import { getInput, solve } from "./index.ts";
import assert from "node:assert";

Deno.test("day 7, part 2 - solve test input", () => {
    const input = getInput("./test-input.txt");
    const res = solve(input);
    assert.equal(res, 40);
});

Deno.test('day 7, part 2 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    // console.log('max', Number.MAX_SAFE_INTEGER)
    assert.equal(res, 95408386769474)
})
