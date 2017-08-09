const path = require('path');
const utils = require('./utils');
const Promise = require('es6-promise');

module.exports = function (grunt) {
    const momentTests = grunt.file.expand({cwd: 'src'}, 'test/moment/*.js');
    const localeTests = grunt.file.expand({cwd: 'src'}, 'test/locale/*.js');

    function buildTestFile(testFile) {
        return utils.rollupBundle(path.join('src', testFile), {
            external: utils.externalMomentAndLocales
        }).then(function (code) {
            grunt.file.write(path.join('build', testFile), code);
        }).catch(function (err) {
            console.log(err);
        })
    }

    function buildTestFiles() {
        return Promise.resolve()
          .then(function () { return Promise.all(momentTests.map(buildTestFile)); })
          .then(function () { return Promise.all(localeTests.map(buildTestFile)); })
    }

    grunt.task.registerTask('build:tests', 'build test files', function () {
        var done = this.async();
        return buildTestFiles().then(done);
    });
};
