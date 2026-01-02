export type IVec3 = {
    x: number,
    y: number,
    z: number,
}

export class JunctionBox implements IVec3 {
    x: number;
    y: number;
    z: number;

    circuit?: Circuit;

    constructor(p: number[] | IVec3) { 
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

    toString() {
        return `[${this.x},${this.y},${this.z}]`
    }

    connect(otherJunctionBox: JunctionBox) {
        if (this.circuit && !otherJunctionBox.circuit) {
            this.circuit.add(otherJunctionBox);
            return this.circuit;
        }

        if (!this.circuit && otherJunctionBox.circuit) {
            otherJunctionBox.circuit.add(this);
            return otherJunctionBox.circuit;
        }

        if (!this.circuit && !otherJunctionBox.circuit) {
            this.circuit = new Circuit(this);
            this.circuit.add(otherJunctionBox);
            return this.circuit;
        }

        if (this.circuit && otherJunctionBox.circuit) {
            // throw new Error('handle me');
            if (this.circuit.size > otherJunctionBox.circuit.size) {
                this.circuit.add(otherJunctionBox);
            } else {
                otherJunctionBox.circuit.add(this);
            }
            
            return this.circuit;
        }
    }

    isConnectedTo(otherJunctionBox: JunctionBox) {
        if (!this.circuit) return false;

        return this.circuit.junctionBoxes.has(otherJunctionBox);
    }

}

export class Circuit {
    junctionBoxes: Set<JunctionBox>;

    // temp solution, need to figure out how to handle unnecessary
    // circuit instances after merging 2 circuits
    STALE = false;
    
    constructor(junctionBox?: JunctionBox) {
        this.junctionBoxes = new Set();
        if (junctionBox) {
            this.junctionBoxes.add(junctionBox);
        }
    }

    add(jb: JunctionBox) {
        if (jb.circuit) {
            // if the JunctionBox to be connected already has a Circuit,
            // merge Circuit into this one
            
            // how do we handle "stale" Circuit instances?
            jb.circuit.STALE = true;

            jb.circuit.junctionBoxes.forEach(jb => {
                this.junctionBoxes.add(jb);
                jb.circuit = this;
            })

        } else {
            this.junctionBoxes.add(jb);
            jb.circuit = this;
        }

        this.STALE = false;
    }

    size() {
        return this.junctionBoxes.size;
    }
}
