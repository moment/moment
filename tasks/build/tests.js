const path = require('path');
const {TMP_DIR, rollupBundle} = require('./shared');

module.exports = function (grunt) {
    const momentTests = grunt.file.expand({cwd: 'src'}, 'test/moment/*.js');
    const localeTests = grunt.file.expand({cwd: 'src'}, 'test/locale/*.js');

    function buildTestFile(testFile) {
      console.log('Test file', testFile);
        return rollupBundle({
            entry: path.join('src', testFile),
            external: function (id) {
              if (id === path.resolve('src/moment.js')) {
                return true;
              }
              if (path.dirname(id) === path.resolve('src/locale')) {
                  return true;
              }
              return false;
            }
        }).then(function (code) {
          grunt.file.write(path.join('build', testFile), code);
        });

    }

  /// Generates a test file.
  ///
  /// Options:
  /// --only Compile only the given tests
  grunt.task.registerTask('build:tests', 'build test files', function () {
    var done = this.async();
    Promise.all([
      ...momentTests.map(buildTestFile),
      ...localeTests.map(buildTestFile)
    ]).then(done);

  });
};
