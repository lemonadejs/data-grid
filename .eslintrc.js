module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: ['eslint:recommended', 'prettier'],
    globals: {
        describe: 'readonly',
        it: 'readonly',
        should: 'readonly',
        xit: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-control-regex': 'off',
        'no-empty': 'off'
    }
};
