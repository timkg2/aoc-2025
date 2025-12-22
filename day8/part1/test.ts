/// <reference lib="deno.ns" />
import { solve, getInput, getDistance } from './index.ts';
import assert from 'node:assert';
import { Octree, Point } from './tree.ts';

Deno.test('getDistance', () => {
    const d1 = getDistance({x: 1, y: 1, z: 1}, {x: 2, y: 1, z: 1});
    assert.equal(d1, 1);
    
    const d2 = getDistance({x: 1, y: 1, z: 1}, {x: 1, y: 2, z: 1});
    assert.equal(d2, 1);
    
    const d3 = getDistance({x: 1, y: 1, z: 1}, {x: 1, y: 1, z: 2});
    assert.equal(d3, 1);
})

Deno.test('scratch', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input)
    console.log(res.sort((a, b) => a.distance - b.distance))

    const tree = new Octree(
        new Point([0,0,0]),
        1000,
        input.boxes.map(b => new Point(b))
    )

    console.log(tree)
})

// Deno.test('day x, part 1 - get input', () => {
//     const input = getInput('./test-input.txt')
//     const expected = {}
//     assert.deepStrictEqual(input, expected)
// })

// Deno.test('day x, part 1 - solve test input', () => {
//     const input = getInput('./test-input.txt')
//     const res = solve(input);
//     assert.equal(res, 0)
// })

// Deno.test('day x, part 1 - solve puzzle input', () => {
//     const input = getInput('../puzzle-input.txt')
//     const res = solve(input);
//     assert.equal(res, 0)
// })