module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: ['@ravn-dev/eslint-config-ravn/base', '@ravn-dev/eslint-config-ravn/typescript'],
  rules: {
    'no-console': 'OFF',
    '@typescript-eslint/no-unsafe-assignment': 'OFF',
    '@typescript-eslint/no-non-null-assertion': 'ERROR',
    '@typescript-eslint/no-implicit-any-catch': 'ERROR',
  },
}
