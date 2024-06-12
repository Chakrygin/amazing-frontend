/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/core/src/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
