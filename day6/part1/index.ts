import fs from 'node:fs';

type IProblem = {
    numbers: number[],
    operation: '+' | '*'
}

type IPuzzleInput = {
    problems: IProblem[]
}

export function solve(input: IPuzzleInput) {
    const individualResults = input.problems.map(problem => {
        return problem.numbers.reduce((acc, curr) => {
            if (problem.operation === '+') {
                return acc + curr;
            } else {
                return acc * curr;
            }
        }, problem.operation === '+' ? 0 : 1)
    })

    return individualResults.reduce((acc, curr) => acc + curr, 0);
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const lines = fileContents.split('\n');
    const rows = lines.map(line => 
        line.split(' ').map(str => str.trim()).filter(l => l !== ' ' && l !== '')
    )

    // assert all same length
    const sizes = rows.reduce((acc, cur) => {
        acc.add(cur.length);
        return acc;
    }, new Set<number>());
    if (sizes.size > 1) throw new Error();

    const puzzleInput: IPuzzleInput = rows.reduce(
        (puzzleInput, row, rowIndex) => {
            row.forEach((str, strIndex) => {
                if (!puzzleInput.problems[strIndex]) {
                    puzzleInput.problems[strIndex] = { numbers: [], operation: '+' }
                }
                if (rowIndex < rows.length - 1) {
                    // parse numbers
                    puzzleInput.problems[strIndex].numbers.push(parseInt(str, 10))
                } else {
                    // parse operations
                    if (!(str === '+' || str === '*')) {
                        throw new Error();
                    }
                    puzzleInput.problems[strIndex].operation = str;

                }
            })
            return puzzleInput;
        }, 
        { problems: [] } as IPuzzleInput
    )
    
    return puzzleInput;
}