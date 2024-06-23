module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.unit.spec.ts', '**/*.unit.spec.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-css-interop)/)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
