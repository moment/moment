const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        files: ['Gruntfile.js', 'tasks/**/*.js', 'src/**/*.js'],
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
];
