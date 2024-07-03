module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: { "\\.[jt]sx?$": ["ts-jest", { useESM: true }] },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  extensionsToTreatAsEsm: [".ts"],
};
