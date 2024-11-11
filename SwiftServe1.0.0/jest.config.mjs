export default {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/']
}
