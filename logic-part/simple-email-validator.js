function simpleEmailValidator(email) {
    if (email === undefined || email === null) {
        throw new TypeError('O argumento está ausente ou nulo');
    }

    if (typeof email !== 'string') {
        throw new TypeError(`Tipo inválido. O email passado é do tipo "${typeof email}". O email esperado é do tipo "string"`);
    }

    const trimEmail = email.trim();

    if (trimEmail === '') {
        throw new TypeError('O email não pode ficar vazio após a remoção dos espaços');
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(trimEmail);
}

const testValues = [
    'user@example.com', '     user@example.com     ',
    'userexample.com', 'user#example.com',
    'user@example', 'user@.com',
    '', 123, null, undefined, {}, [], '              '
];

console.log('\n=====================\n');

testValues.forEach(value => {
    try {
        const result = simpleEmailValidator(value);

        console.log(`O email: '${value}' é valido? ${result ? 'Sim, é válido!' : 'Não, não é válido!'}\n`)
    } catch (error) {
        console.error(`Erro para ${value}: ${error.message}`);
    }
});

console.log('\n=====================\n');
