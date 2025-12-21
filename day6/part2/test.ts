/// <reference lib="deno.ns" />
import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day 6, part 1 - get input', () => {
    const puzzleInput = getInput('./test-input.txt')
    const expected = {
        problems: [
            { numbers: [4, 431, 623], operation: '+' },
            { numbers: [175, 581, 32], operation: '*' },
            { numbers: [8, 248, 369], operation: '+' },
            { numbers: [356, 24, 1], operation: '*' }
        ]
    }
    assert.deepStrictEqual(puzzleInput, expected)
})

Deno.test('day 6, part 1 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 3263827)
})

Deno.test('day 6, part 1 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 11602774058280)
})