module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.unit.spec.ts', '**/*.unit.spec.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
