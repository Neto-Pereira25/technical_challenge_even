/*
A soma dos números de 1 até N pode ser calculada diretamente pela fórmula:

soma = 𝑁 × ( 𝑁 + 1 ) / 2
​
*/

function sumUpToNumber(number) {

    if (number === undefined || number === null) {
        throw new TypeError('O argumento vazio ou ausente');
    }

    if (typeof number !== 'number') {
        throw new TypeError('O argumento deve ser um número');
    }

    if (!Number.isInteger(number)) {
        throw new RangeError('O número deve ser um inteiro.');
    }

    if (number <= 0) {
        throw new RangeError('O número deve ser positivo e maior do que zero.');
    }

    // return number * (number + 1) / 2;

    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }

    return sum;
}

const testValues = [10, -5, 3.5, null, undefined, "teste", true, {}, [], 0];

console.log('\n=====================\n');

testValues.forEach(value => {
    try {
        const result = sumUpToNumber(value);
        console.log(`Soma de 1 até ${value} é igual à: ${result}\n`);
    } catch (error) {
        console.error(`Erro para ${value}: ${error.message}`);
    }
});

console.log('\n=====================\n');