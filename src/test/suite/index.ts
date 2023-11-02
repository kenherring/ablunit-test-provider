import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';
import { NYC } from 'nyc';

function setupNyc() {
	// create an nyc instance, config here is the same as your package.json
	const nyc = new NYC({
		cache: false,
		cwd: path.join(__dirname, "..", "..", ".."),
		exclude: [
			"**/**.test.js",
		],
		extension: [
			".ts",
			".tsx",
		],
		hookRequire: true,
		hookRunInContext: true,
		hookRunInThisContext: true,
		instrument: true,
		reporter: ["text", "html", "cobertura"],
		require: [
			"ts-node/register",
		],
		sourceMap: true,
	});
	nyc.reset();
	nyc.wrap();
	return nyc;
}

export function run(): Promise<void> {

  const nyc = setupNyc();

  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
    reporter: 'mocha-circleci-reporter',
    timeout: 20000,
    require: [
      // 'ts-node/register',
      'ts-node/register/transpile-only',
      'source-map-support/register'
    ]
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run(failures => {
          if (failures > 0) {
            console.error(`${failures} tests failed.`);
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        e(err);
      }
    });
  });
}
