import fs from 'node:fs';
import { Rectangle } from './rect.ts';

export type IVec2 = {
    x: number,
    y: number,
}

export type IPolygon = {
    vertices: IVec2[]
}

export type IPuzzleInput = IPolygon;

export function solve(input: IPuzzleInput) {
    const rects: Rectangle[] = [];
    const discardedRects: Rectangle[] = [];
    for (const a of input.vertices) {
        for (const b of input.vertices) {
            if (a.x === b.x && a.y === b.y) {
                continue;
            }

            const rect = Rectangle.fromCorners(a, b);
            if (rect.isInside(input)) {
                rects.push(rect);
            } else {
                discardedRects.push(rect)
            }
        }
    }

    const rectsSorted = rects.sort((a, b) => b.getArea() - a.getArea());
    return rectsSorted[0];
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const input: IPuzzleInput = {
        vertices: lines.map((line) => {
            const parts = line.split(",").map((p) => p.trim()).map((p) =>
                parseInt(p, 10)
            );
            if (parts.length !== 2) throw new Error();
            return { x: parts[0]!, y: parts[1]! }
        }),
    };

    return input;
}