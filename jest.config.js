module.exports = {
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.test.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(test|spec)\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
