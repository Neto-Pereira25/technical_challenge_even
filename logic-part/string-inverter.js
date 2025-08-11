function reverseString(receivedString) {
    if (receivedString === undefined || receivedString === null) {
        throw new TypeError('O argumento vazio ou ausente');
    }

    if (typeof receivedString !== 'string') {
        throw new TypeError('O argumento deve ser uma string');
    }

    return receivedString.split('').reverse().join('');
}

const testValues = [
    'exemplo', 'Olá mundo!', undefined, null, {}, 123, []
];

console.log('\n=================\n');

testValues.forEach(value => {
    try {
        const result = reverseString(value);

        console.log(`${result}\n`);
    } catch (error) {
        console.error(`Erro para ${value}: ${error.message}`);
    }
});

console.log('\n=================\n');
