import type { Config } from "jest";

const config: Config = {
  testTimeout: 60000,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
};

export default config;
