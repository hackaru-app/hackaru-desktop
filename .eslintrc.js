module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'vue',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/standard',
    'prettier/vue'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'vue'
  ],
  'rules': {
    camelcase: ["error", { properties: "never" }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
