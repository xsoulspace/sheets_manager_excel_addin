const pack = require('./package')

module.exports = {
  displayName: pack.name,
  name: pack.name,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(/src/.*.(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(src/.*.mock).(jsx?|tsx?)$'],
  verbose: true
}
