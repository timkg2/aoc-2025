import { solve, getInput, getHighestJoltage } from './index';
import assert from 'node:assert';

const batteries = getInput('test-input.ts')
const res = batteries.map(getHighestJoltage)
const expected = [98, 89, 78, 92]
assert.deepStrictEqual(res, expected)