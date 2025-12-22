import fs from 'node:fs';

type IPos = { x: number, y: number, z: number }

type IPuzzleInput = {
    boxes: IPos[]
};

export function solve(input: IPuzzleInput) {
    // naive testing
    const ds = input.boxes.slice(1).map(b => {
        return {
            distance: getDistance(input.boxes[0]!, b),
            to: `[${b.x},${b.y},${b.z}]`
        }
    });
    return ds
}

export function getDistance(pos1: IPos, pos2: IPos) {
    return Math.sqrt(
        Math.pow((pos2.x - pos1.x), 2)
        + Math.pow((pos2.y - pos1.y), 2)
        + Math.pow((pos2.z - pos1.z), 2)
    )
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const input: IPuzzleInput = {
        boxes: lines.map(line => {
            const parts = line.split(',').map(p => p.trim()).map(p => parseInt(p, 10));
            if (parts.length !== 3) throw new Error();
            return { x: parts[0]!, y: parts[1]!, z: parts[2]! }
        })
    }
    
    const xs: number[] = [];
    const ys: number[] = [];
    const zs: number[] = [];
    input.boxes.forEach(b => {
        xs.push(b.x)
        ys.push(b.y)
        zs.push(b.z)
    })
    xs.sort((a,b) => a - b)
    ys.sort((a,b) => a - b)
    zs.sort((a,b) => a - b)
    console.log('x', xs[xs.length-1])
    console.log('y', ys[ys.length-1])
    console.log('z', zs[zs.length-1])

    return input;
}