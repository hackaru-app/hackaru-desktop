module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    electron: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.ts'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': [
          'error',
          {
            ignoreRestArgs: true,
          },
        ],
      },
    },
  ],
}
