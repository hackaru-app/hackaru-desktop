module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  rules: {
    'scss/no-global-function-names': null,
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
