import { getInput, solve, isInvalidId } from './index';
import assert from 'node:assert';

const ranges = getInput('test-input.txt')
const res = solve(ranges);
assert.equal(res, 4174379265);

const invalidIds = [
    12341234,
    123123123,
    1212121212,
    1111111,
    11,
    22,
    99,
    999,
    1010,
    1188511885
]

invalidIds.forEach(id => {
    const isInvalid = isInvalidId(id);
    assert.equal(isInvalid, true);
})