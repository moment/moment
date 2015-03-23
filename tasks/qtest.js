module.exports = function (grunt) {
    grunt.task.registerTask('qtest', 'run tests locally', function () {
        var done = this.async();

        var testrunner = require('qunit');

        testrunner.options.log.assertions = false;
        testrunner.options.log.tests = false;
        testrunner.options.log.summary = false;
        testrunner.options.log.testing = false;
        testrunner.options.maxBlockDuration = 120000;

        testrunner.run({
            code: 'build/umd/moment.js',
            tests: grunt.file.expand('build/umd/test/moment/*.js',
                    'build/umd/test/locale/*.js')
        }, function (err, report) {
            if (err) {
                console.log('woot', err, report);
                done(err);
                return;
            }
            err = null;
            if (report.failed !== 0) {
                err = new Error(report.failed + ' tests failed');
            }
            done(err);
        });
    });
};
