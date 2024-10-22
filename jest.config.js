module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts$1',
    '^@components(.*)$': '<rootDir>/src/components$1'
  }
  // Остальные настройки...
};
