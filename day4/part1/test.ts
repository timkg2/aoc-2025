/// <reference lib="deno.ns" />
import { solve, getInput, Grid } from './index';
import assert from 'node:assert';

Deno.test('day 4', () => {
    const lines = getInput('../puzzle-input.txt')
    const res = solve(lines);
    assert.equal(res, 1435)
    console.log(res)
})