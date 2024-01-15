/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        node: true,
    },
    overrides: [
        {
            "files": [
                "**/*.test.js",
                "**/*.test.ts"
            ],
            "env": {
                "jest": true
            }
        }
    ],
    ignorePatterns: [
        'node_modules/',
        '**/node_modules/',
        '/**/node_modules/*',
        'dist/',
    ]

};