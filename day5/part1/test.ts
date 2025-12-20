import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day 5, part 1 - test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 3)
})

Deno.test('day 5, part 1 - puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 520)
})