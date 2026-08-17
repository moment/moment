const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        files: ['scripts/**/*.js', 'src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2015,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                Symbol: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
            'no-useless-assignment': 'off',
            'no-useless-escape': 'off',
            'one-var': 'error',
        },
    },
    {
        files: ['scripts/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
        },
        rules: {
            'one-var': 'off',
        },
    },
];
