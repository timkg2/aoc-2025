import fs from 'node:fs';

type IPuzzleInput = {
    tiles: IVec2[]
};

type IVec2 = {
    x: number,
    y: number,
}

function getArea(a: IVec2, b: IVec2) {
    return Math.abs((b.x - a.x) + 1) * Math.abs((b.y - a.y) + 1);
}

export function solve(input: IPuzzleInput) {
    const areas: number[] = [];
    for (const a of input.tiles) {
        for (const b of input.tiles) {
            if (a.x === b.x && a.y === b.y) {
                continue;
            }

            const area = getArea(a, b);
            areas.push(area);
        }
    }

    const areasSorted = areas.sort((a, b) => b - a);
    return areasSorted[0]!;
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const input: IPuzzleInput = {
        tiles: lines.map((line) => {
            const parts = line.split(",").map((p) => p.trim()).map((p) =>
                parseInt(p, 10)
            );
            if (parts.length !== 2) throw new Error();
            return { x: parts[0]!, y: parts[1]! }
        }),
    };

    return input;
}