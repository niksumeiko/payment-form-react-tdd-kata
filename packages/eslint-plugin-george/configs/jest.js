module.exports = {
    extends: ['plugin:jest/recommended'],
    plugins: ['george', 'jest'],
    rules: {
        'jest/no-mocks-import': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-export': 'warn',
        'jest/no-done-callback': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error',
        'jest/no-conditional-expect': 'warn',
        'jest/expect-expect': [
            'error',
            {
                assertFunctionNames: ['expect', 'expectType'],
            },
        ],

        // Custom rules
        'george/no-vague-titles': 'warn',
        'george/jest-no-all-mocks-methods': 'warn',
        'no-import-assign': 'off',
    },
    overrides: [
        {
            files: ['*.test.*', '**/__mocks__/*'],
            rules: {
                'max-lines': 'off',
            },
        },
        {
            files: ['*.cy.tsx'],
            rules: {
                'jest/valid-expect-in-promise': 'off',
                'jest/expect-expect': 'off',
            },
        },
    ],
    env: {
        'jest/globals': true,
    },
};
