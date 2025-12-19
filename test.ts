import { solve } from './index'
import fs from 'node:fs';
import assert from 'node:assert'

const fileContents = fs.readFileSync('./input.txt', {encoding: 'utf8'});
const lines = fileContents.split('\n');

const res = solve(lines);
assert.equal(3, res);
