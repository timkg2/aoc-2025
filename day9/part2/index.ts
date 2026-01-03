import fs from 'node:fs';
import { Rectangle } from './rect.ts';
import { orientation, type IOrientation } from './intersection.ts';

export type IPos = {
    x: number,
    y: number,
}

export type IVec2 = {
    x: number,
    y: number,

    equals: (v: IVec2) => boolean
    subtract: (v: IVec2) => IVec2
}

export class Vec2 implements IVec2 {

    constructor(
        public x: number,
        public y: number
    ) {}

    equals(v: IVec2) {
        return this.x === v.x && this.y === v.y;
    }

    subtract(v: IVec2) {
        return new Vec2(v.x - this.x, v.y - this.y)
    }

    static from(p: {x: number, y: number}) {
        return new Vec2(p.x, p.y)
    }
}

export type IPolygon = {
    vertices: IVec2[]
}

export type IPuzzleInput = Polygon;

export type IPoligonLineSegment = {
    a: IVec2,
    b: IVec2,
    fillDirection: IFillDirection
}

type IFillDirection = 'Top' | 'Bottom' | 'Left' | 'Right';

const fillDirectionOnTurnMap: Record<IFillDirection, Record<IOrientation, IFillDirection>> = {
    'Bottom': {
        'right': 'Left',
        'left': 'Right',
        'straight': 'Bottom'
    },
    'Top': {
        'right': 'Right',
        'left': 'Left',
        'straight': 'Top'
    },
    'Left': {
        'right': 'Top',
        'left': 'Bottom',
        'straight': 'Left'
    },
    'Right': {
        'right': 'Bottom',
        'left': 'Top',
        'straight': 'Right'
    }
}

export class Polygon implements IPolygon {

    vertices: IVec2[];
    lineSegments: IPoligonLineSegment[];

    constructor(vertices: IVec2[], topMostIndex: number) {
        this.vertices = vertices;
        this.lineSegments = [];

        let handledVertices = 0;
        let index = topMostIndex;
        let fillDirection: IFillDirection = 'Bottom';
        let a: IVec2;
        let b: IVec2;
        let prevSegment: IPoligonLineSegment;
        while (handledVertices < vertices.length) {
            a = vertices[index]!;
            const nextIndex = index + 1 > vertices.length - 1 ? 0 : index + 1;
            b = vertices[nextIndex]!;
            if (this.lineSegments.length) {
                prevSegment = this.lineSegments[this.lineSegments.length-1]!;
                if (a.x !== prevSegment.b.x || a.y !== prevSegment.b.y) {
                    throw new Error('Consecutive line segments must share point');
                }
                const turn = orientation(prevSegment.a, a, b);
                fillDirection = fillDirectionOnTurnMap[fillDirection][turn];
            }
            handledVertices += 1;
            this.lineSegments.push({ a, b, fillDirection });
            index = nextIndex;
        }
    }
}

export function solve(shape: Polygon) {
    const rects: Rectangle[] = [];
    const discardedRects: Rectangle[] = [];
    for (const ls of shape.lineSegments) {
        for (const v of shape.vertices) {
            if (v.x !== ls.a.x && v.y !== ls.a.y) {
                const rect = Rectangle.fromCorners(ls.a, v);
                if (rect.isInside(shape)) {
                    rects.push(rect);
                } else {
                    discardedRects.push(rect)
                }
            }

            if (v.x !== ls.b.x && v.y !== ls.b.y) {
                const rect = Rectangle.fromCorners(ls.b, v);
                if (rect.isInside(shape)) {
                    rects.push(rect);
                } else {
                    discardedRects.push(rect)
                }
            }
        }
    }

    const rectsSorted = rects.sort((a, b) => b.getArea() - a.getArea());
    return rectsSorted[0];
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    
    let lowestY = Infinity;
    let lowestYIndex = -1;
    const vertices = lines.map((line, index) => {
        const parts = line.split(",").map((p) => p.trim()).map((p) =>
            parseInt(p, 10)
        );
        const [x, y] = parts;
        if (!x || !y) throw new Error();
        if (y < lowestY) {
            lowestY = y;
            lowestYIndex = index;

        }
        return new Vec2(x, y)
    })

    const shape = new Polygon(vertices, lowestYIndex);
    // console.log(shape.lineSegments);

    return shape;
}