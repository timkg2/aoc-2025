/// <reference lib="deno.ns" />
import { solve, getInput, type IVec2, type IPolygon } from './index.ts';
import assert from 'node:assert';
import { isInside, segmentsIntersect } from './intersection.ts';

Deno.test('segmentsIntersect()', () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 5, y: 5 };
    
    const q1: IVec2 = { x: 5, y: 0 };
    const q2: IVec2 = { x: 0, y: 5 };
    
    const res = segmentsIntersect(p1, p2, q1, q2)
    assert.equal(res, true)
})

Deno.test('segmentsIntersect()', () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 5, y: 0 };
    
    const q1: IVec2 = { x: 0, y: 5 };
    const q2: IVec2 = { x: 5, y: 5 };
    
    const res = segmentsIntersect(p1, p2, q1, q2)
    assert.equal(res, false)
})

// Deno.test('isInside()', () => {

//     const rect: IPolygon = {
//         vertices: [
//             { x: 1, y: 1},
//             { x: 5, y: 1},
//             { x: 5, y: 5},
//             { x: 1, y: 5}
//         ]
//     }

//     assert.equal(isInside({ x: 3, y: 3 }, rect), true)
//     assert.equal(isInside({ x: 1, y: 1 }, rect), true)
//     assert.equal(isInside({ x: 5, y: 1 }, rect), true)
//     assert.equal(isInside({ x: 5, y: 5 }, rect), true)
//     assert.equal(isInside({ x: 1, y: 5 }, rect), true)

//     assert.equal(isInside({ x: 3, y: 6 }, rect), false)
//     assert.equal(isInside({ x: 0, y: 6 }, rect), false)
//     assert.equal(isInside({ x: 6, y: 3 }, rect), false)
//     assert.equal(isInside({ x: 0, y: 0 }, rect), false)
// })

Deno.test('day x, part 2 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res, 24)
})

Deno.test('day x, part 2 - solve puzzle input', () => {
    const input = getInput('../puzzle-input.txt')
    const res = solve(input);
    assert.equal(res, 0)
})