import fs from 'node:fs';

export function solve(batteries: string[]) {
    const joltages = batteries.map(getHighestJoltage);
    const sum = joltages.reduce((acc, curr) => acc + curr, 0)
    return sum;
}

const batteries = getInput('../puzzle-input.txt')
const sum = solve(batteries)
console.log('res', sum)

export function getHighestJoltage(battery: string) {
    const NUM_DIGITS = 12;

    const digits = [];
    let pos = 0;
    for (let i = 0; i < NUM_DIGITS; i ++) {
        const digit = getHighestDigitInRange(pos, battery.length - (NUM_DIGITS - digits.length), battery);
        digits.push(digit.digit);
        pos = digit.pos + 1;
    }

    const res = parseInt(digits.join(''), 10);
    console.log(`highest: ${res}`)

    return res;
}

function getHighestDigitInRange(fromIndex: number, toIndex: number, battery: string) {
    if (toIndex > battery.length) {
        throw new Error()
    }
    if (fromIndex > toIndex) {
        throw new Error()
    }

    let highestDigit = battery[fromIndex]!;
    let highestDigitPos = fromIndex;
    for (let i = fromIndex + 1; i <= toIndex; i++) {
        if (battery[i]! > highestDigit) {
            highestDigit = battery[i]!;
            highestDigitPos = i;
        }
    }

    return {
        digit: highestDigit,
        pos: highestDigitPos
    }
}

export function getInput(filename: string) {
    const fileContents = fs.readFileSync(filename, { encoding: 'utf8' });
    const joltages = fileContents.split('\n');
    return joltages;
}

