export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}; 