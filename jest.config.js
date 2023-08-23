module.exports = {
    // ... other Jest configuration settings ...
  
    // This transforms your .ts and .tsx files with ts-jest
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // An array of file extensions your modules use
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "scss"],
  
    // Mock the SCSS modules
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "<rootDir>/styleMock.js"
      },
      
    // Specifies the test environment
    testEnvironment: "jsdom",
    
    
    // A list of paths to directories that Jest should use to search for files in
    roots: ["<rootDir>/src/"],
  
    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [],
  
    // The glob patterns Jest uses to detect test files
    // testMatch: [
    //     "<rootDir>/src/tests/unit/**/*.{ts,tsx}",
    // ],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    "testMatch": ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    "testPathIgnorePatterns": ["\\e2e\\.ts$", "\\e2e\\.tsx$"],
  
    // Whether to use watchman for file crawling
    watchman: false,
  
    // The paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: []
  };
  