function uniqueNumbers(numbers) {
    if (numbers === undefined || numbers === null) {
        throw new TypeError('O argumento está vazio ou ausente');
    }

    if (!Array.isArray(numbers)) {
        throw new TypeError('O argumento deve ser um array');
    }

    const filteredNumbers = numbers.filter(num => typeof num === 'number' && !isNaN(num));

    const counter = filteredNumbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});

    return filteredNumbers.filter(num => counter[num] === 1);
}

const testValues = [
    [1, 2, 2, 2, 'texto', true, false, null, undefined, 3, 4, 4, 4, 5],
    {},
    null,
    undefined,
    123,
    "texto",
    true,
    []
];

console.log('\n=====================\n');

testValues.forEach(value => {
    try {
        const result = uniqueNumbers(value);

        console.log(`\n${result}\n`);
    } catch (error) {
        console.error(`Erro para ${value}: ${error.message}`);
    }
});

console.log('\n=====================\n');
