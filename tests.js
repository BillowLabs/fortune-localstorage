const Mocha = require('mocha')
const glob = require('glob')
const path = require('path')

// Instantiate a Mocha instance.
const mocha = new Mocha()

// Add paths to ignore when finding tests
var options =
  { ignore: ['node_modules/**/*.js', 'bin/**/*.js']
  , reporter: 'list'
  }

// Create the eslint engine for linting our source files
var Eslint = require('eslint').CLIEngine
var eslint = new Eslint(require(path.join(__dirname, '.eslintrc.js')))

// Search for javascript files in this application
glob('**/tests.js', options, (error, files) => {
  /* istanbul ignore next */
  if (error) throw error

  // Add only the system and unit test files
  files.forEach(file => mocha.addFile(file))

  // Run the tests
  mocha.run(failures => {

    // lint myfile.js and all files in lib/
    var report = eslint.executeOnFiles(['src/.'])

    // get the default formatter
    var formatter = eslint.getFormatter()

    // output to console
    /* eslint-disable no-console */
    console.log(formatter(report.results))
    /* eslint-enable no-console */

    /* istanbul ignore next */
    process.on('exit', function () {
      // exit with non-zero status if there were failures
      process.exit(failures)
    })

  })

})
