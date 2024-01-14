export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'js'],
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};