import { solve, getInput } from './index.ts';
import assert from 'node:assert';


Deno.test('day x, part 2 - get input', () => {
    const input = getInput('./test-input.txt')
    const expected = {}
    assert.deepStrictEqual(input, expected)
})

Deno.test('day x, part 2 - solve test input', () => {
    const input = getInput('./test-input.ts')
    const res = solve(input);
    assert.equal(res, 0)
})

Deno.test('day x, part 2 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.ts')
    const res = solve(input);
    assert.equal(res, 0)
})