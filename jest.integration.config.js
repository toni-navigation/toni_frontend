module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.integration.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
