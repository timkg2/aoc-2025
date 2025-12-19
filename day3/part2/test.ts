import { solve, getInput, getHighestJoltage } from './index';
import assert from 'node:assert';

const batteries = getInput('./test-input.ts')
const res = batteries.map(getHighestJoltage)
const expected = [
    987654321111,
    811111111119,
    434234234278,
    888911112111
]
assert.deepStrictEqual(res, expected)

const sum = solve(batteries)
assert.equal(sum, 3121910778619)