module.exports = function (grunt) {
    grunt.config('copy.index-files', {
        expand: true,
        cwd: 'build/umd/',
        src: [
            'moment.js',
            'locale/*.js',
            'min/locales.js',
            'min/moment-with-locales.js',
            'min/tests.js',
        ],
        dest: '.',
    });
    grunt.config('copy.esm', {
        expand: true,
        cwd: 'build/esm',
        src: ['moment.js'],
        dest: 'dist',
    });
    grunt.config('copy.esm-locales', {
        expand: true,
        cwd: 'src',
        src: ['locale/*.js'],
        dest: 'dist',
    });

    grunt.registerTask('update-index', [
        'copy:index-files',
        'copy:esm',
        'copy:esm-locales',
    ]);
};
