module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', '@tanstack/query'],

  parserOptions: { project: './tsconfig.json' },

  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'id-denylist': ['error', 'cb', 'e', 'err', 'ev', 'i', 'j', 'val'],

    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', '': 'never' },
    ],
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external', 'internal']],
        alphabetize: { order: 'asc', orderImportKind: 'asc' },
      },
    ],
    'import/prefer-default-export': 'off',
    // 'no-restricted-imports': [
    //   'error',
    //   {
    //     patterns: [
    //       {
    //         group: ['./', '../'],
    //         message: "Use '@/...' alias instead.",
    //       },
    //     ],
    //   },
    // ],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    'no-param-reassign': ['error', { props: false }],

    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
  },
};
