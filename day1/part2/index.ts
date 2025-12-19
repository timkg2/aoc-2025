import fs from 'node:fs';

const fileContents = fs.readFileSync('../input.txt', {encoding: 'utf8'});
const lines = fileContents.split('\n');
const res = solve(lines);
console.log(res)

export function solve(input: string[]) {
    // dial goes from 0 to 99
    // 0 - 1 = 99
    // 99 + 1 = 0
    let dialValue = 50;
    let timesZero = 0;
    input.forEach(i => {
        const res = applyRotation(dialValue, i);
        dialValue = res.newValue;
        timesZero += res.crossedZero;
        console.log(`Via ${i} to ${dialValue}. with zero crossed ${res.crossedZero} times`);
        if (dialValue === 0) {
            timesZero++;
        }
    })
    return timesZero;
}

function applyRotation(dialValue: number, rotation: string): { crossedZero: number, newValue: number } {
    let crossedZero = 0;
    const direction = rotation[0];
    const amountStr = rotation.substring(1);
    const match = amountStr.match(/\d+/);
    if (!match?.length) {
        throw new Error(`Unable to parse amount from rotation ${rotation}`);
    }
    const fullAmount = parseInt(amountStr, 10);
    // console.log(direction, fullAmount);

    // A rotation of 100 leaves dial unchanged
    const amount = fullAmount % 100;
    crossedZero += Math.floor(fullAmount / 100);

    // console.log(direction, amount);
    let newValue: number;
    if (direction === 'L') {
        if (amount > dialValue) {
            const excess = amount - dialValue;
            if (dialValue !== 0) {
                crossedZero++;
            }
            newValue = 100 - excess;
            
        } else {
            newValue = dialValue - amount;
        }

        return {
            crossedZero,
            newValue
        }
    }

    if (direction === 'R') {
        if (dialValue + amount > 99) {
            const excess = (dialValue + amount) - 100;
            newValue = excess;
            if (newValue > 0) {
                crossedZero++;
            }
        } else {
            newValue = dialValue + amount;
        }

        return {
            crossedZero,
            newValue
        }
    }

    throw new Error(`Unable to parse direction from rotation ${rotation}`);
}
