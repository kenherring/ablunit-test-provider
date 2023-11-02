// .vscode-test.js
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([
  {
    label: 'unitTests',
    files: 'out/test/**/*.test.js',
    // version: 'insiders',
    workspaceFolder: './test_projects/proj1',
    mocha: {
      ui: 'tdd',
      color: true,
      timeout: 20000,
      // reporter: '@netatwork/mocha-utils/dist/JunitSpecReporter.js'
      // Optional: provide the path for the generated JUnit report
      // reporterOptions: ['mochaFile=../../artifacts/mocha_results.xml']
	  }
  }
  // you can specify additional test configurations, too
]);
