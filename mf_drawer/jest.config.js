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
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./setupTests.js'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
