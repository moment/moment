const path = require('path');
const {rollupBundle, externalMomentAndLocales} = require('./utils');

module.exports = function (grunt) {
    const testFiles = grunt.file.expand({cwd: 'src'}, 'test/**/*.js');

    function buildTestFile(testFile) {
        return rollupBundle({
            entry: path.join('src', testFile),
            external: externalMomentAndLocales
        }).then(function (code) {
            grunt.file.write(path.join('build', testFile), code);
        });
    }

    function buildTestFiles() {
        return Promise.all(testFiles.map(buildTestFile));
    }

    grunt.task.registerTask('build:tests', 'build test files', function () {
        var done = this.async();
        return buildTestFiles().then(done);
    });
};
