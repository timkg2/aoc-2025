/// <reference lib="deno.ns" />
import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day 6, part 1 - get input', () => {
    const puzzleInput = getInput('./test-input.txt')
    const expected = {
        problems: [
            { numbers: [123, 45, 6], operation: '*' },
            { numbers: [328, 64, 98], operation: '+' },
            { numbers: [51, 387, 215], operation: '*' },
            { numbers: [64, 23, 314], operation: '+' }
        ]
    }
    assert.deepStrictEqual(puzzleInput, expected)
})

Deno.test('day 6, part 1 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 4277556)
})

Deno.test('day 6, part 1 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 4583860641327)
})