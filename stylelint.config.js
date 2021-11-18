module.exports = {
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    'alpha-value-notation': 'number',
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
