/// <reference lib="deno.ns" />
import { solve, getInput, Grid } from './index.ts';
import assert from 'node:assert';

Deno.test('day 4 - test input', () => {
    const lines = getInput('./test-input.txt')
    const res = solve(lines);
    assert.equal(res, 43)
    // console.log(res)
})

Deno.test('day 4 - puzzle input', () => {
    const lines = getInput('../puzzle-input.txt')
    const res = solve(lines);
    assert.equal(res, 8623)
    // console.log(res)
})