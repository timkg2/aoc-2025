import fs from 'node:fs';
import { getInput, solve, type IPuzzleInput, type IVec2 } from "./index.ts";

export function debugTestInput() {
    const input = getInput('./test-input.txt')
    const rect = solve(input)!;
    
    const gridStr = input.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

    const rectStr = rect.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

    const html = (gridStr: string, rectStr: string) => `
<html>
<body>
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <polygon points="${gridStr}" fill="red" stroke="red" />
    <polygon points="${rectStr}" fill="blue" stroke="blue" opacity="50%"/>
    </svg>
</body>
</html>
`

    fs.writeFileSync('./debug-test.html', html(gridStr, rectStr))
}

export function debugPuzzleInput() {
    const input = getInput('../puzzle-input.txt')
    // max ~ 100.000
    const rect = solve(input)!;
    
    const gridStr = input.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

    const rectStr = rect.vertices.reduce((acc, curr) => {
        return `${acc} ${curr.x},${curr.y}`
    }, '')

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

    fs.writeFileSync('./debug-puzzle.html', html(gridStr, rectStr))
}


debugTestInput()
debugPuzzleInput()