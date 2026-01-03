import type { IPolygon, IVec2 } from "./index.ts";

function crossProduct(a: IVec2, b: IVec2) {
    return a.x * b.y - a.y * b.x;
}

type IOrientation = 'straight' | 'left' | 'right';

// After going from a to b, how do we get to c? straight ahead? turning left? turning right?
function orientation(a: IVec2, b: IVec2, c: IVec2): IOrientation {
    const val = crossProduct({x: b.x - a.x, y: b.y - a.y}, {x: c.x - b.x, y: c.y - b.y});
    if (val === 0) return 'straight';
    return val > 0 ? 'right' : 'left';
}

// [p1,p2] intersects [q1,q2]
export function segmentsIntersect(
    p1: IVec2,
    p2: IVec2,
    q1: IVec2,
    q2: IVec2,
): boolean {
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

    // return orientations.filter(o => o === 'straight').length === 0;
    const straights = orientations.filter(o => o === 'straight');
    const isPerpendicular = straights.length >= 1 && straights.length <= 3;
    const isColinear = straights.length === 4;

    if (isColinear) {
        // make sure candidate segment [p1,p2] is contained in target segment [q1, q2]
        return !onSegment(q1, q2, p1) || !onSegment(q1, q2, p2);
    }
    
    // P1 and P2 are on different sides of segment [Q1, Q2] AND
    // Q1 and Q2 are on different sides of segment [P1, P2]
    if (orientationP1 !== orientationP2 && orientationQ1 !== orientationQ2) {
        if (!isPerpendicular || (isPerpendicular && !onSegment(p1, p2, q1) && !onSegment(p1, p2, q2) && !onSegment(q1, q2, p1) && !onSegment(q1, q2, p2)))
        return true;
    }

    return false;
}

export function onSegment(segmentP1: IVec2, segmentP2: IVec2, point: IVec2): boolean {
  return (
    point.x <= Math.max(segmentP1.x, segmentP2.x) &&
    point.x >= Math.min(segmentP1.x, segmentP2.x) &&
    point.y <= Math.max(segmentP1.y, segmentP2.y) &&
    point.y >= Math.min(segmentP1.y, segmentP2.y)
  );
}

export function segmentIsInsidePolygon(segmentA: IVec2, segmentB: IVec2, polygon: IPolygon) {
    let intersects = false;
    for (let i = 0; i < polygon.vertices.length; i++) {
        const q1 = polygon.vertices[i]!;
        const q2 = i === (polygon.vertices.length - 1) 
        ? polygon.vertices[0]! // wrap around
        : polygon.vertices[i + 1]!
        
        intersects = segmentsIntersect(segmentA, segmentB, q1, q2);
        if (intersects) {
            break;
        }
    }

    return !intersects;
}

export function isInside(point: IVec2, polygon: IPolygon, endX = 1000000) {
    // ray casting - given line segment [point,infinity/end],
    // check intersections with polygon line segments.
    // if number of intersections = 0 or an even number, it's outisde
    // if number of intersections = an odd number, it's inside
    let intersections = 0;
    for (let i = 0; i < polygon.vertices.length; i++) {
        const q1 = polygon.vertices[i]!;
        const q2 = i === (polygon.vertices.length - 1) 
        ? polygon.vertices[0]! // wrap around
        : polygon.vertices[i + 1]!
        
        if (onSegment(q1, q2, point)) {
            // if Point lies on line segment, consider it being inside and early return.
            return true;
        }

        const p2 = { x: endX, y: point.y };
        
        const intersects = segmentsIntersect(point, p2, q1, q2);
        if (intersects) {
            intersections += 1;
        }
    }

    if (intersections === 0 || intersections % 2 === 0) {
        return false;
    }

    return true;
}
