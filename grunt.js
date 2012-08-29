var fs = require('fs');

module.exports = function(grunt) {

    var min = {
        langs: {
            src: ['min/lang-all.js'],
            dest: 'min/lang-all.min.js'
        }
    };

    // all the lang files need to be added manually
    fs.readdirSync('./lang').forEach(function (path) {
        min[path] = {
            src: ['lang/' + path],
            dest: 'min/lang/' + path
        };
    });

    grunt.initConfig({
        concat : {
            langs: {
                src: ['lang/*.js'],
                dest: 'min/lang-all.js'
            }
        },
        min : min,
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
    grunt.registerTask('release', 'lint test concat ');
};