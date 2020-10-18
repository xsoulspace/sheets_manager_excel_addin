module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-case-declarations': 'off',
    'no-inner-declarations': 'off',
    'no-fallthrough': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'no-extra-semi': 'off',
    indent: [2, 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
