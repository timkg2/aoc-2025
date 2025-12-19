import { solve, getInput, getHighestJoltage } from './index';
import assert from 'node:assert';

const joltages = getInput('test-input.ts')
const res = joltages.map(getHighestJoltage)
const expected = [98, 89, 78, 92]
assert.deepStrictEqual(res, expected)