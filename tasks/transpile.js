module.exports = function (grunt) {
    grunt.config('clean.build', [
        'build'
    ]);


    grunt.task.registerTask('transpile',
            'builds all es5 files, optinally creating custom locales',
            function (locales) {
        var tasks = [
            'clean:build',
            'build:moment',
            'build:locales',
            'build:tests',
            'build:package'
        ];
        grunt.task.run(tasks);
    });
};
