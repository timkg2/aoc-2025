/// <reference lib="deno.ns" />
import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day 8, part 2 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 25272)
})

Deno.test('day 8, part 2 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 169521198)
})