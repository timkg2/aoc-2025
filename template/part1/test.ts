import { solve, getInput } from './index.ts';
import assert from 'node:assert';

Deno.test('day x, part y - test input', () => {
    const input = getInput('./test-input.ts')
    const res = solve(input);
    assert.equal(res, 0)
})

Deno.test('day x, part y - puzzle input', () => {
    const input = getInput('../puzzle-input.ts')
    const res = solve(input);
    assert.equal(res, 0)
})