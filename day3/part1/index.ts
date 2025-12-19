import fs from 'node:fs';

export function solve(batteries: string[]) {
    const joltages = batteries.map(getHighestJoltage);
    const sum = joltages.reduce((acc, curr) => acc + curr, 0)
    return sum;
}

export function getHighestJoltage(battery: string) {
    // find highest digit for 10-position - consider all digits except very last,
    // since we still need a 1-position digit after the 10-position.
    let index10Pos = 0;
    let highestDigit10Pos = battery[0]!;
    const secondToLastIndex = battery.length-2
    for (let i=1; i<=secondToLastIndex; i++) {
        if (battery[i]! > highestDigit10Pos) {
            highestDigit10Pos = battery[i]!;
            index10Pos = i;
        }
    }

    // find highest digit for 1-position, after 10-position
    let index1Pos = index10Pos + 1;
    let highestDigit1Pos = battery[index1Pos]!;
    for (let j=index1Pos+1; j<=battery.length-1; j++) {
        if (battery[j]! > highestDigit1Pos) {
            highestDigit1Pos = battery[j]!;
            index1Pos = j;
        }
    }

    const res = parseInt(`${highestDigit10Pos}${highestDigit1Pos}`, 10);
    // console.log(`highest: ${res}`)

    return res;
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(`./${filename}`, { encoding: 'utf8' });
    const batteries = fileContents.split('\n');
    return batteries;
}

const input = getInput('../puzzle-input.txt');
const res = solve(input)
console.log('res', res)