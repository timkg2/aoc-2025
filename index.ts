export function solve(input: string[]) {
    // dial goes from 0 to 99
    // 0 - 1 = 99
    // 99 + 1 = 0
    let dialValue = 50;
    let timesZero = 0;
    input.forEach(i => {
        dialValue = applyRotation(dialValue, i);
        console.log(`Via ${i} to ${dialValue}`);
        if (dialValue === 0) {
            timesZero++;
        }
    })
    return timesZero;
}

const validDirections = ['L', 'R'];

function applyRotation(dialValue: number, rotation: string) {
    const direction = rotation[0];
    if (!validDirections.includes(direction!)) {
        throw new Error(`Unable to parse direction from rotation ${rotation}`);
    }
    const amountStr = rotation.substring(1);
    const match = amountStr.match(/\d+/);
    if (!match?.length) {
        throw new Error(`Unable to parse amount from rotation ${rotation}`);
    }
    const fullAmount = parseInt(amountStr, 10);
    // console.log(direction, fullAmount);
    
    // A rotation of 100 leaves dial unchanged
    const amount = fullAmount % 100;
    
    // console.log(direction, amount);
    let newValue;
    if (direction === 'L') {
        if (amount > dialValue) {
            const excess = amount - dialValue;
            newValue = 100 - excess;
        } else {
            newValue = dialValue - amount;
        }

        return newValue;
    }

    if (direction === 'R') {
        if (dialValue + amount > 99) {
            const excess = (dialValue + amount) - 100;
            newValue = excess;
        } else {
            newValue = dialValue + amount;
        }

        return newValue;
    }

    throw new Error(`Unable to parse rotation direction: ${rotation}`);
}
