module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@dbclient/(.*)$': '<rootDir>/prisma/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};
