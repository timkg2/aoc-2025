// assuming [[0,0,0], [worldX, worldY, worldZ]]
// assuming cubes
// assuming cube start vertex
// assuming cube side length/size
// root cube start: [0,0,0], size: MAX
// root.children[0] = start: [0,0,0], size: MAX/2
// root.children[1] = start: [MAX/2,0,0], size: MAX/2
// root.children[2] = start: [0,MAX/2,0], size: MAX/2
// root.children[3] = start: [MAX/2,MAX/2,0], size: MAX/2
// root.children[4] = start: [0,0,MAX/2], size: MAX/2
// root.children[5] = start: [MAX/2,0,MAX/2], size: MAX/2
// root.children[6] = start: [0,MAX/2,MAX/2], size: MAX/2
// root.children[7] = start: [MAX/2,MAX/2,MAX/2], size: MAX/2

export type IPoint = {
    x: number,
    y: number,
    z: number,
}

export class Point implements IPoint {
    x: number;
    y: number;
    z: number;

    constructor(p: number[] | IPoint) { 
        if (Array.isArray(p)) {
            this.x = p[0]!;
            this.y = p[1]!;
            this.z = p[2]!;
        } else {
            this.x = p.x;
            this.y = p.y;
            this.z = p.z;
        }
    }
}

const MAX_OBJECTS = 10;


// maybe not necessary, one-off problem...
export class Octree<Obj extends IPoint> {
    origin: IPoint;
    size: number;

    childNodes: (Octree<Obj>|undefined)[];
    objects: Obj[];

    isPartitioned: boolean;

    constructor(
        origin: IPoint,
        size: number,
        objects: Obj[] = []
    ) {
        this.origin = origin;
        this.size = size;
        this.isPartitioned = false;
        this.childNodes = [];
        this.objects = objects;

        if (objects.length > MAX_OBJECTS) {
            this.partition();
            this.objects = [];
            objects.forEach(o => {
                this.getChildNodeFor(o)?.add(o);
            })
        }
    }

    add(o: Obj) {
        this.objects.push(o);
        // TODO handle partitioning
    }

    getChildNodeFor(p: IPoint) {
        if (!this.isInBounds(p)) throw new Error();
        if (!this.isPartitioned) throw new Error();
        
        const logicalCoords: number[] = []
        logicalCoords[0] = p.x < this.origin.x + this.size / 2 ? 0 : 1;
        logicalCoords[1] = p.y < this.origin.y + this.size / 2 ? 0 : 1;
        logicalCoords[2] = p.z < this.origin.z + this.size / 2 ? 0 : 1;

        switch(logicalCoords.join(',')) {
            case '0,0,0': return this.childNodes[0];
            case '1,0,0': return this.childNodes[1];
            case '0,1,0': return this.childNodes[2];
            case '1,1,0': return this.childNodes[3];
            case '0,0,1': return this.childNodes[4];
            case '1,0,1': return this.childNodes[5];
            case '0,1,1': return this.childNodes[6];
            case '1,1,1': return this.childNodes[7];
        }
        
    }

    getObjects(): Obj[] {
        if (this.isPartitioned) {
            const objs = [];
            for (let i = 0; i < 8; i++) {
                objs.push(this.childNodes[i]!.getObjects());
            }
            return objs.flat() as Obj[];
        } else {
            return this.objects;
        }
    }

    isInBounds(p: IPoint) {
        const {x, y, z} = p;
        
        // inclusive/exclusive edge?
        if ((x < this.origin.x || x > this.origin.x + this.size)
         || (y < this.origin.y || y > this.origin.y + this.size)
         || (z < this.origin.z || z > this.origin.z + this.size)
        ) {
            return false;
        } else {
            return true;
        }
    }

    partition() {
        if (this.isPartitioned) throw new Error();
        const childSize = this.size / 2;
        
        this.childNodes[0] = new Octree({x: 0, y: 0, z: 0}, childSize);
        this.childNodes[1] = new Octree({x: childSize, y: 0, z: 0}, childSize);
        this.childNodes[2] = new Octree({x: 0, y: childSize, z: 0}, childSize);
        this.childNodes[3] = new Octree({x: childSize, y: childSize, z: 0}, childSize);
        this.childNodes[4] = new Octree({x: 0, y: 0, z: childSize}, childSize);
        this.childNodes[5] = new Octree({x: childSize, y: 0, z: childSize}, childSize);
        this.childNodes[6] = new Octree({x: 0, y: childSize, z: childSize}, childSize);
        this.childNodes[7] = new Octree({x: childSize, y: childSize, z: childSize}, childSize);

        this.isPartitioned = true;
    }
}