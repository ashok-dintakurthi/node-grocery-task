module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: [
      "<rootDir>/src", // This covers all files in the src directory
      "<rootDir>/tests" // This covers all files in the tests directory
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest' // Transformation for TS/TSX
    },
    // ... other Jest options
  };