module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.integration.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-css-interop)/)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
