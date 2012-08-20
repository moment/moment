module.exports = function(grunt) {

    grunt.initConfig({
        test : {
            files : ["test/**/*.js"]
        },
        lint : {
            files: [
                'moment.js',
                'lang/**/*.js'
            ]
        },
        watch : {
            test : {
                files : [
                    'moment.js',
                    'test/**/*.js'
                ],
                tasks: 'test'
            },
            lint : {
                files : '<config:lint.files>',
                tasks: 'lint'
            }
        }
    });

    grunt.loadTasks("tasks");

    // Default task.
    grunt.registerTask('default', 'test');
};