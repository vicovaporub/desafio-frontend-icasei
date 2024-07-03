module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {'\\.[jt]sx?$': ['ts-jest', { useESM: true }] },
  transformIgnorePatterns: [
      "node_modules/(?!variables/.*)"
    ],
    moduleNameMapper: {
      '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
};
