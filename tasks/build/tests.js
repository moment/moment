const path = require('path');
const {rollupBundle, localeName, relativePathRewriter} = require('./utils');

module.exports = function (grunt) {
    const momentTests = grunt.file.expand({cwd: 'src'}, 'test/moment/*.js');
    const localeTests = grunt.file.expand({cwd: 'src'}, 'test/locale/*.js');

    function buildTestFile(testFile) {
        return rollupBundle({
            entry: path.join('src', testFile),
            external: function (id) {
                if (id === path.resolve('src/moment.js')) {
                    return 'moment';
                }
                if (path.dirname(id) === path.resolve('src/locale')) {
                    return `moment.locales.${localeName(id)}`;
                }
                return null;
            }
        }).then(function (code) {
            grunt.file.write(path.join('build', testFile), code);
        });
    }

    function buildTestFiles() {
        return Promise.all([
          ...momentTests,
          ...localeTests
        ].map(buildTestFile))
    }


    /// Generates a test file.
    ///
    /// Options:
    /// --only Compile only the given tests
    grunt.task.registerTask('build:tests', 'build test files', function () {
        var done = this.async();
        return buildTestFiles().then(done);
    });
};
