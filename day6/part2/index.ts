import fs from "node:fs";

type IProblem = {
    numbers: number[];
    operation: "+" | "*";
};

type IPuzzleInput = {
    problems: IProblem[];
};

export function solve(input: IPuzzleInput) {
    const individualResults = input.problems.map((problem) => {
        return problem.numbers.reduce((acc, curr) => {
            if (problem.operation === "+") {
                return acc + curr;
            } else {
                return acc * curr;
            }
        }, problem.operation === "+" ? 0 : 1);
    });

    return individualResults.reduce((acc, curr) => acc + curr, 0);
}

export function getInput(filename: string): IPuzzleInput {
    const fileContents = fs.readFileSync(filename, { encoding: "utf8" });
    const rows = fileContents.split("\n");

    // assert all same length
    const sizes = rows.reduce((acc, cur) => {
        acc.add(cur.length);
        return acc;
    }, new Set<number>());
    if (sizes.size > 1) throw new Error();
    const rowLength = rows[0]!.length;
    const numberOfRows = rows.length;

    const puzzleInput: IPuzzleInput = {
        problems: [],
    };

    // initialize problemCounter = 0
    // iterate left from lastX to 0
        // iterate down from [x, 0] to [x, lastY]
            // keep track of number
            // if last row
                // keep track of operation
        // if number but no operation
            // push number to problem at problemCounter
        // if number and operation
            // push number and operation to problem at problemCounter
        // if no number and no operation
            // increment problemCounter

    puzzleInput.problems.push({
        numbers: [],
        operation: "+",
    });

    for (let x = rowLength - 1; x >= 0; x--) {
        let currentProblemIndex = puzzleInput.problems.length - 1;

        let numberChars: string[] = [];
        let operation = "";
        for (let y = 0; y <= numberOfRows - 1; y++) {
            const char = rows[y]![x]!;
            if (y < numberOfRows - 1) {
                // not last row - still parsing number
                if (char !== " ") {
                    numberChars.push(char);
                }
            } else {
                // last row - parsing operation
                if (char !== " ") {
                    operation = char;
                }
            }
        }

        if (numberChars.length) {
            const number = parseInt(numberChars.join(""), 10);
            puzzleInput.problems[currentProblemIndex]!.numbers.push(number);
        }
        if (operation === "+" || operation === "*") {
            puzzleInput.problems[currentProblemIndex]!.operation = operation;
        }
        if (numberChars.length === 0 && operation === "") {
            // moving to next problem
            puzzleInput.problems.push({
                numbers: [],
                operation: "+",
            });
        }
    }

    return puzzleInput;
}
