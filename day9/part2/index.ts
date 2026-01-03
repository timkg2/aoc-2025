import fs from 'node:fs';
import { isInside } from './intersection.ts';

export type IVec2 = {
    x: number,
    y: number,
}

export type IPolygon = {
    vertices: IVec2[]
}

type IPuzzleInput = IPolygon;

class Rectangle implements IPolygon {

    vertices: IVec2[];

    constructor(
        public topLeft: IVec2,
        public topRight: IVec2,
        public bottomRight: IVec2,
        public bottomLeft: IVec2
    ) {
        if (
            (topLeft.y !== topRight.y)
            || (topLeft.x !== bottomLeft.x)
            || (bottomLeft.y !== bottomRight.y)
            || (bottomRight.x !== topRight.x)
        ) {
            throw new Error('');
        }

        this.vertices = [topLeft, topRight, bottomRight, bottomLeft];
    }

    getArea() {
        return getArea(this.topLeft, this.bottomRight);
    }

    static fromCorners(a: IVec2, b: IVec2) {
        if (a.y <= b.y) {
            // a is top row
            if (a.x <= b.x) {
                // a is top left, b is bottom right
                return new Rectangle(a, {x: b.x, y: a.y}, b, {x: a.x, y: b.y})
            } else {
                // a is top right, b is bottom left
                return new Rectangle({x: b.x, y: a.y}, a, {x: a.x, y: b.y}, b)
            }
        } else {
            // b is top row
            if (a.x <= b.x) {
                // a is bottom left, b is top right
                return new Rectangle({x: a.x, y: b.y}, b, {x: b.x, y: a.y}, a);
            } else {
                // a is bottom right, b is top left
                return new Rectangle(b, {x: a.x, y: b.y}, a, {x: b.x, y: a.y })
            }
        }
    }

    isInside(polygon: IPolygon) {
        return isInside(this.topLeft, polygon)
               && isInside(this.topRight, polygon)
               && isInside(this.bottomRight, polygon)
               && isInside(this.bottomLeft, polygon);
    }
}

function getArea(a: IVec2, b: IVec2) {
    return Math.abs((b.x - a.x) + 1) * Math.abs((b.y - a.y) + 1);
}

export function solve(input: IPuzzleInput) {
    const xs = input.vertices.map(v => v.x).sort((a, b) => b - a)
    const ys = input.vertices.map(v => v.y).sort((a, b) => b - a)

    console.log(xs[0])
    console.log(ys[0])
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
    return rectsSorted[0]!.getArea();
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