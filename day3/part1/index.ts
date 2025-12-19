import fs from 'node:fs';

export function solve(input: string[]) {
    const joltages = input.map(getHighestJoltage);
    const sum = joltages.reduce((acc, curr) => acc + curr, 0)
    return sum;
}

export function getHighestJoltage(joltage: string) {
    // find highest digit for 10-position - consider all digits except very last,
    // since we still need a 1-position digit after the 10-position.
    let index10Pos = 0;
    let highestDigit10Pos = joltage[0]!;
    const secondToLastIndex = joltage.length-2
    for (let i=1; i<=secondToLastIndex; i++) {
        if (joltage[i]! > highestDigit10Pos) {
            highestDigit10Pos = joltage[i]!;
            index10Pos = i;
        }
    }

    // find highest digit for 1-position, after 10-position
    let index1Pos = index10Pos + 1;
    let highestDigit1Pos = joltage[index1Pos]!;
    for (let j=index1Pos+1; j<=joltage.length-1; j++) {
        if (joltage[j]! > highestDigit1Pos) {
            highestDigit1Pos = joltage[j]!;
            index1Pos = j;
        }
    }

    const res = parseInt(`${highestDigit10Pos}${highestDigit1Pos}`, 10);
    // console.log(`highest: ${res}`)

    return res;
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(`./${filename}`, { encoding: 'utf8' });
    const joltages = fileContents.split('\n');
    return joltages;
}

const input = getInput('../puzzle-input.txt');
const res = solve(input)
console.log('res', res)