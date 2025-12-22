/// <reference lib="deno.ns" />
import { getDistance, getInput, solve } from "./index.ts";
import assert from "node:assert";
import { type IPoint, Octree, Point } from "./tree.ts";

Deno.test("getDistance", () => {
    const d1 = getDistance({ x: 1, y: 1, z: 1 }, { x: 2, y: 1, z: 1 });
    assert.equal(d1, 1);

    const d2 = getDistance({ x: 1, y: 1, z: 1 }, { x: 1, y: 2, z: 1 });
    assert.equal(d2, 1);

    const d3 = getDistance({ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 2 });
    assert.equal(d3, 1);
});

function getSmallestDistance(ps: IPoint[]) {
    const middle = Math.floor(ps.length / 2);
    const distances = [];
    for (let x = 0; x < middle; x++) {
        for (let y = middle; y < ps.length; y++) {
            const a = ps[x]!;
            const b = ps[y]!;
            distances.push({
                distance: getDistance(a, b),
                from: `[${a.x},${a.y},${a.z}]`,
                to: `[${b.x},${b.y},${b.z}]`,
            });
        }
    }
    return distances.sort((a, b) => a.distance - b.distance).slice(0, 3)
}

Deno.test("scratch", () => {
    const input = getInput("../puzzle-input.txt");
    // const res = solve(input)
    // console.log(res.sort((a, b) => a.distance - b.distance))
    const points = input.boxes.slice(0, 200);

    const tree = new Octree(
        new Point([0, 0, 0]),
        100000,
        points.map((b) => new Point(b)),
    );

    // console.log(tree)

    // pick random point, e.g. first
    const p = points[0]!;
    // get all distances to "neighbours" - no Octree
    const start = Date.now();
    const distances = getSmallestDistance(points)
    console.log("ms", Date.now() - start);

    // get all distances to neighbours - using Octree
    // TODO search across all partitions, aggregate results
    const start2 = Date.now();
    const objs = tree.getChildNodeFor(p)!.getObjects();
    const distances2 = getSmallestDistance(objs)
    // end TODO
    console.log("ms", Date.now() - start2);

    console.log(distances[1]);
    console.log(distances2[1]);
    console.log(distances.length);
    console.log(distances2.length);
});

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
