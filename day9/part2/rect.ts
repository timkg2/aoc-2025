import type { IPolygon, IVec2 } from "./index.ts";
import { isInside, segmentIsInsidePolygon } from "./intersection.ts";

export class Rectangle implements IPolygon {

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
        return segmentIsInsidePolygon(this.topLeft, this.topRight, polygon)
            && segmentIsInsidePolygon(this.topRight, this.bottomRight, polygon)
            && segmentIsInsidePolygon(this.bottomRight, this.bottomLeft, polygon)
            && segmentIsInsidePolygon(this.bottomLeft, this.topLeft, polygon)
    }
}

function getArea(a: IVec2, b: IVec2) {
    return Math.abs((b.x - a.x) + 1) * Math.abs((b.y - a.y) + 1);
}