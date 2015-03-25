module.exports = function (grunt) {
    grunt.config('copy.index-files', {
        expand: true,
        cwd: 'build/umd/',
        src: [
            'moment.js',
            'locale/*.js',
            'min/locales.js',
            'min/moment-with-locales.js',
            'min/tests.js'
        ],
        dest: '.'
    });

    grunt.registerTask('update-index', ['copy:index-files']);
};
