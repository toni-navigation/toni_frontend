module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.unit.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
