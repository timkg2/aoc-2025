/// <reference lib="deno.ns" />
import { getInput, type IPoligonLineSegment, type IPolygon, type IVec2, solve, Vec2 } from "./index.ts";
import assert from "node:assert";
import { segmentIsInsidePolygon, segmentsIntersect } from "./intersection.ts";
import { Rectangle } from "./rect.ts";

// Deno.test('getInput()', () => {
//     const input = getInput('../puzzle-input.txt')
//     assert.equal(input, true)
// })

// Deno.test("segmentsIntersect()", () => {
//     const p1: IVec2 = Vec2.from({ x: 0, y: 0 });
//     const p2: IVec2 = Vec2.from({ x: 10, y: 0 });

//     const poligonSegment: IPoligonLineSegment = {
//         a: Vec2.from({ x: 5, y: 0 }),
//         b: Vec2.from({ x: 5, y: 5 }),
//         fillDirection: 'Right'
//     }

//     const res = segmentsIntersect(p1, p2, poligonSegment);
//     assert.equal(res, true);
// });

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = Vec2.from({ x: 0, y: 0 });
    const p2: IVec2 = Vec2.from({ x: 10, y: 0 });

    const poligonSegment: IPoligonLineSegment = {
        a: Vec2.from({ x: 0, y: 0 }),
        b: Vec2.from({ x: 5, y: 0 }),
        fillDirection: 'Right'
    }

    const res = segmentsIntersect(p1, p2, poligonSegment);
    assert.equal(res, true);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = Vec2.from({ x: 13448, y: 18223 })
    const p2: IVec2 = Vec2.from({ x: 13448, y: 17312 })

    const poligonSegment: IPoligonLineSegment = {
        a: Vec2.from({ x: 13448, y: 17312 }),
        b: Vec2.from({ x: 84783, y: 17312 }),
        fillDirection: 'Right'
    }

    const res = segmentsIntersect(p1, p2, poligonSegment);
    assert.equal(res, false);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = Vec2.from({
        x: 14270,
        y: 17312,
    })
    const p2: IVec2 = Vec2.from({
        x: 14270,
        y: 16962,
    })

    const poligonSegment: IPoligonLineSegment = {
        a: Vec2.from({ x: 13448, y: 17312 }),
        b: Vec2.from({ x: 84783, y: 17312 }),
        fillDirection: 'Right'
    }

    const res = segmentsIntersect(p1, p2, poligonSegment);
    assert.equal(res, false);
});

// Deno.test("segmentIsInsidePolygon()", () => {
//     const rect: IPolygon = {
//         vertices: [
//             { x: 13448, y: 17312 },
//             { x: 84783, y: 17312 },
//             { x: 84783, y: 84348 },
//             { x: 13448, y: 84348 },
//         ],
//     };

//     const input = getInput("../puzzle-input.txt");
//     assert.equal(segmentIsInsidePolygon(rect.vertices[0]!, rect.vertices[1]!, input), true);

//     assert.equal(segmentIsInsidePolygon(rect.vertices[1]!, rect.vertices[2]!, input), false);
//     assert.equal(segmentIsInsidePolygon(rect.vertices[2]!, rect.vertices[3]!, input), false);
//     assert.equal(segmentIsInsidePolygon(rect.vertices[3]!, rect.vertices[0]!, input), false);
// });

Deno.test.only('day x, part 2 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res?.getArea(), 24)
})

Deno.test('day x, part 2 - solve test input', () => {
    const rect = Rectangle.fromCorners(Vec2.from({x: 9, y: 5}), Vec2.from({x: 2, y: 3}))
    const input = getInput('./test-input.txt')
    const res = rect.isInside(input)
    assert.equal(res, true)
})

Deno.test('segmentIsInsidePoligon', () => {
    const input = getInput('./test-input.txt')
    const res = segmentIsInsidePolygon(Vec2.from({x: 9, y: 3}), Vec2.from({x: 9, y: 5}), input);
    assert.equal(res, true)
})

// Deno.test("day x, part 2 - solve puzzle input", () => {
//     const input = getInput("../puzzle-input.txt");
//     const rect = solve(input);
//     assert.equal(rect?.getArea(), 4782151432 - 1);
// });
