module.exports = function (grunt) {
    grunt.config('clean.build', [
        'build'
    ]);

    grunt.config('concat.tests', {
        src: 'build/test/**/*.js',
        dest: 'build/min/tests.js'
    });

    grunt.task.registerTask('transpile',
            'builds all es5 files, optinally creating custom locales',
            function (locales) {
        var tasks = [
            'clean:build',
            'build:moment',
            'build:locales',
            'build:tests',
            'concat:tests'
        ];
        grunt.task.run(tasks);
    });
};
