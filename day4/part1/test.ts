import { solve, getInput, Grid } from './index';
import assert from 'node:assert';

const lines = getInput('../puzzle-input.txt')
const res = solve(lines);
console.log(res)