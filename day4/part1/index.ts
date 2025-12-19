import fs from "node:fs";

export function solve(input: string[]) {
    const grid = Grid.fromTextInput(input);

    const accessiblePapers = new Set();
    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            const cell = grid.get(x, y);
            // console.log(x, y);
            if (cell?.value === "@") {
                const neighbours = grid.getNeighboursFor(x, y);
                const numberOfAdjacentPaperRolls = neighbours.filter((n) =>
                    n.value === "@"
                ).length;
                if (numberOfAdjacentPaperRolls < 4) {
                    accessiblePapers.add(cell.toString());
                    // console.log(`adding ${x}, ${y}`);
                }
            }
        }
    }

    return accessiblePapers.size;
}

class Cell {
    constructor(
        public x: number,
        public y: number,
        public value: string,
    ) {}

    toString() {
        return `cell-${this.x}-${this.y}`;
    }
}

export class Grid {
    public width;
    public height;

    constructor(
        // y by x: cells[0] = first row, cells[0][1] = x: 1, y: 0
        // for ease of parsing rows from text input
        private rows: Cell[][],
    ) {
        const widths = new Set(rows.map((c) => c.length));
        // We assume rectangular grid (all columns same size)
        if (widths.size !== 1) {
            throw new Error();
        }
        this.rows = rows;
        this.height = rows.length;
        this.width = rows[0]?.length || 0;
    }

    get(x: number, y: number): Cell | undefined {
        if (!this.isInBounds(x, y)) {
            return undefined;
        }

        const maybeCell = this.rows[y]?.[x];
        if (!maybeCell) {
            throw new Error();
        }
        return maybeCell!;
    }

    isInBounds(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return true;
    }

    getNeighboursFor(x: number, y: number) {
        if (!this.isInBounds(x, y)) {
            throw new Error();
        }
        const maybeNeighbours: (Cell | undefined)[] = [
            this.get(x - 1, y - 1),
            this.get(x, y - 1),
            this.get(x + 1, y - 1),
            this.get(x - 1, y),
            this.get(x + 1, y),
            this.get(x - 1, y + 1),
            this.get(x, y + 1),
            this.get(x + 1, y + 1),
        ];

        return maybeNeighbours.filter((n) => n !== undefined);
    }

    toString() {
        const output = this.rows.reduce((acc, curr) => {
            const line = curr.map((c) => c.value).join("");
            // console.log('line', line)
            return `${acc}${line}\n`;
        }, "");
        return output;
    }

    static fromTextInput(input: string[]): Grid {
        const rows: Cell[][] = [];
        input.forEach((rowString, rowIndex) => {
            const symbols = rowString.split("");
            rows.push(
                symbols.map((symbol, colIndex) =>
                    new Cell(colIndex, rowIndex, symbol)
                ),
            );
        });
        const grid = new Grid(rows);
        return grid;
    }
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(`./${filename}`, { encoding: "utf8" });
    const lines = fileContents.split("\n");
    return lines;
}
