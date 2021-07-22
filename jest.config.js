module.exports = {
  setupFiles: ['./__tests__/__setups__/config.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  testPathIgnorePatterns: [
    '__tests__/__setups__/',
    '__tests__/__helpers__/',
    'node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/renderer/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/renderer/components/**/*.vue',
    '<rootDir>/src/renderer/pages/**/*.vue',
    '<rootDir>/src/renderer/store/**/*.js',
    '<rootDir>/src/renderer/plugins/**/*.js',
  ],
  clearMocks: true,
  testEnvironment: 'jsdom',
}
