import fs from "node:fs";
import { Circuit, type IVec3, JunctionBox } from "./src.ts";

type IPuzzleInput = {
    junctionBoxes: JunctionBox[];
};

type IPair = {
    a: JunctionBox;
    b: JunctionBox;
    distance: number;
};

export function getSortedPairs(input: IPuzzleInput) {
    const pairs: Set<IPair> = new Set();
    // keep track of added pairs to prevent duplicates
    const added: Set<string> = new Set();

    for (const a of input.junctionBoxes) {
        // n^2
        for (const b of input.junctionBoxes) {
            if (a === b) {
                continue;
            }

            const pairString = a.x < b.x ? `${a}-${b}` : `${b}-${a}`;

            if (added.has(pairString)) {
                // console.log(`skipping duplicated ${pairString}`)
            } else {
                const d = getDistance(a, b);
                pairs.add({ a: a, b: b, distance: d });
                added.add(pairString);
            }
        }
    }

    const sortedPairs = Array.from(pairs).sort((a, b) =>
        a.distance - b.distance
    );

    return sortedPairs;
}

export function solve(input: IPuzzleInput) {
    const sortedPairs = getSortedPairs(input);
    const circuits: Set<Circuit> = new Set();
    
    let lastA: JunctionBox | undefined;
    let lastB: JunctionBox | undefined;
    
    for (let i = 0; i < sortedPairs.length; i++) {
        const { a, b } = sortedPairs[i]!;

        const c = a.connect(b);
        circuits.add(c);

        if (c!.size() === input.junctionBoxes.length) {
            lastA = a;
            lastB = b;
            break;
        }
    }

    if (!lastA || !lastB) {
        throw new Error('handle me');
    }
    
    return lastA.x * lastB.x;
}

export function getDistance(pos1: IVec3, pos2: IVec3) {
    return Math.sqrt(
        Math.pow(pos2.x - pos1.x, 2) +
            Math.pow(pos2.y - pos1.y, 2) +
            Math.pow(pos2.z - pos1.z, 2),
    );
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: "utf8" });
    const lines = fileContents.split("\n");
    const input: IPuzzleInput = {
        junctionBoxes: lines.map((line) => {
            const parts = line.split(",").map((p) => p.trim()).map((p) =>
                parseInt(p, 10)
            );
            if (parts.length !== 3) throw new Error();
            return new JunctionBox(parts);
        }),
    };

    return input;
}
