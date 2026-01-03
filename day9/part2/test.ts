/// <reference lib="deno.ns" />
import { getInput, type IPolygon, type IVec2, solve } from "./index.ts";
import assert from "node:assert";
import { isInside, segmentIsInsidePolygon, segmentsIntersect } from "./intersection.ts";

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 5, y: 5 };

    const q1: IVec2 = { x: 5, y: 0 };
    const q2: IVec2 = { x: 0, y: 5 };

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, true);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 5, y: 0 };

    const q1: IVec2 = { x: 0, y: 5 };
    const q2: IVec2 = { x: 5, y: 5 };

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, false);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 10, y: 0 };

    const q1: IVec2 = { x: 5, y: 0 };
    const q2: IVec2 = { x: 5, y: 5 };

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, false);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = { x: 0, y: 0 };
    const p2: IVec2 = { x: 10, y: 0 };

    const q1: IVec2 = { x: 0, y: 0 };
    const q2: IVec2 = { x: 5, y: 0 };

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, false);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = {
        x: 13448,
        y: 18223,
    }
    const p2: IVec2 = {
        x: 13448,
        y: 17312,
    }

    const q1: IVec2 = {
        x: 13448,
        y: 17312,
    }
    const q2: IVec2 = {
        x: 84783,
        y: 17312,
    }

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, false);
});

Deno.test("segmentsIntersect()", () => {
    const p1: IVec2 = {
        x: 14270,
        y: 17312,
    }
    const p2: IVec2 = {
        x: 14270,
        y: 16962,
    }

    const q1: IVec2 = {
        x: 13448,
        y: 17312,
    }
    const q2: IVec2 = {
        x: 84783,
        y: 17312,
    }

    const res = segmentsIntersect(p1, p2, q1, q2);
    assert.equal(res, false);
});

Deno.test("segmentIsInsidePolygon()", () => {
    const rect: IPolygon = {
        vertices: [
            { x: 13448, y: 17312 },
            { x: 84783, y: 17312 },
            { x: 84783, y: 84348 },
            { x: 13448, y: 84348 },
        ],
    };

    const input = getInput("../puzzle-input.txt");
    assert.equal(segmentIsInsidePolygon(rect.vertices[0]!, rect.vertices[1]!, input), true);

    assert.equal(segmentIsInsidePolygon(rect.vertices[1]!, rect.vertices[2]!, input), false);
    assert.equal(segmentIsInsidePolygon(rect.vertices[2]!, rect.vertices[3]!, input), false);
    assert.equal(segmentIsInsidePolygon(rect.vertices[3]!, rect.vertices[0]!, input), false);
});

Deno.test('day x, part 2 - solve test input', () => {
    const input = getInput('./test-input.txt')
    const res = solve(input);
    assert.equal(res?.getArea(), 24)
})

Deno.test("day x, part 2 - solve puzzle input", () => {
    const input = getInput("../puzzle-input.txt");
    const rect = solve(input);
    assert.equal(rect?.getArea(), 4782151432 - 1);
});
