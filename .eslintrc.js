module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
  }
}
