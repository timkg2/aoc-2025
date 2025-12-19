import { solve, getInput } from './index';
import assert from 'node:assert';

const input = getInput('test-input.ts')
const res = solve(input);
assert.equal(res, 0)