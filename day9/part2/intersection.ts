import type { IPoligonLineSegment, IPolygon, IVec2, Polygon, Vec2 } from "./index.ts";

function crossProduct(a: IVec2, b: IVec2) {
    return a.x * b.y - a.y * b.x;
}

export type IOrientation = 'straight' | 'left' | 'right';

// After going from a to b, how do we get to c? straight ahead? turning left? turning right?
export function orientation(a: Vec2, b: Vec2, c: Vec2): IOrientation {
    const val = crossProduct(b.subtract(a), c.subtract(b));
    if (val === 0) return 'straight';
    return val > 0 ? 'right' : 'left';
}

// [p1,p2] intersects [q1,q2]
export function segmentsIntersect(
    p1: Vec2,
    p2: Vec2,
    targetSegment: IPoligonLineSegment
): boolean {
    // TODO cleanup
    const q1 = targetSegment.a;
    const q2 = targetSegment.b;

    const orientations = [
        orientation(q1, q2, p1),
        orientation(q1, q2, p2),
        orientation(p1, p2, q1),
        orientation(p1, p2, q2)
    ]

    const orientationP1 = orientations[0]!;
    const orientationP2 = orientations[1]!;
    const orientationQ1 = orientations[2]!;
    const orientationQ2 = orientations[3]!;

    const straights = orientations.filter(o => o === 'straight');
    const isPerpendicular = straights.length >= 1 && straights.length <= 3;
    const isColinear = straights.length === 4;

    if (isColinear) {
        // if the segments share one point, disregard
        if (p1.equals(q1) || p1.equals(q2) || p2.equals(q1) || p2.equals(q2)) {
            return false;
        }

        // make sure candidate segment [p1,p2] is contained in target segment [q1, q2]
        return !pointIsOnSegment(q1, q2, p1) || !pointIsOnSegment(q1, q2, p2);
    }
    
    // P1 and P2 are on different sides of segment [Q1, Q2] AND
    // Q1 and Q2 are on different sides of segment [P1, P2]
    if (orientationP1 !== orientationP2 && orientationQ1 !== orientationQ2 && straights.length === 0) {
        return true;
    }

    // candidate line starts from target line at 90 degree angle from target, but into filled area
    if (isPerpendicular && p1.equals(targetSegment.b) && p2.x === p1.x && p2.y >= p1.y && targetSegment.fillDirection === 'Top') {
        return false;
    }
    
    // candidate line crosses target line at 90 degree angle, originating from unfilled area
    if (isPerpendicular && (Math.min(p1.x, p2.x) < Math.min(q1.x, q2.x)) && (Math.max(p1.x, p2.x) > Math.max(q1.x, q2.x)) && targetSegment.fillDirection === 'Right') {
        return true;
    }

    return false;
}

export function pointIsOnSegment(segmentP1: IVec2, segmentP2: IVec2, point: IVec2): boolean {
  return (
    point.x <= Math.max(segmentP1.x, segmentP2.x) &&
    point.x >= Math.min(segmentP1.x, segmentP2.x) &&
    point.y <= Math.max(segmentP1.y, segmentP2.y) &&
    point.y >= Math.min(segmentP1.y, segmentP2.y)
  );
}

export function segmentIsInsidePolygon(segmentA: IVec2, segmentB: IVec2, polygon: Polygon) {
    let intersects = false;
    for (const ls of polygon.lineSegments) {
        intersects = segmentsIntersect(segmentA, segmentB, ls);
        if (intersects) {
            break;
        }
    }

    return !intersects;
}

