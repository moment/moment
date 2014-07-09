module.exports = function (grunt) {

    // Pull Requests do not have secure variables enabled for security reasons.
    // Use this task before launching travis-sauce-browser task, so it would
    // exit early and won't try connecting to saucelabs without credentials.
    grunt.registerTask('check-sauce-creds', function () {
        if (process.env.SAUCE_USERNAME === undefined) {
            grunt.log.writeln('No sauce credentials found');
            grunt.task.clearQueue();
        } else {
            grunt.log.writeln('Sauce credentials found');
        }
    });
};
