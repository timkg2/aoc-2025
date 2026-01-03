import fs from 'node:fs';
import { getInput, solve, type IPuzzleInput, type IVec2 } from "./index.ts";

const html = (gridStr: string, rectStr: string) => `
<html>
<body>
    <svg viewBox="0 0 100000 100000" xmlns="http://www.w3.org/2000/svg">
    <polygon points="${gridStr}" fill="red" stroke="black" />
    <polygon points="${rectStr}" fill="blue" stroke="black" opacity="50%"/>
    </svg>
</body>
</html>
`

export function debug(input: IPuzzleInput) {
    // max ~ 100.000
    const rect = solve(input)!;
    
    const gridStr = input.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

    const rectStr = rect.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

    fs.writeFileSync('./index.html', html(gridStr, rectStr))
}

const input = getInput('../puzzle-input.txt')
debug(input)