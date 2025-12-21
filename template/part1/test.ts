import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day x, part 1 - get input', () => {
    const input = getInput('./test-input.txt')
    const expected = {}
    assert.deepStrictEqual(input, expected)
})

Deno.test('day x, part 1 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 0)
})

Deno.test('day x, part 1 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 0)
})