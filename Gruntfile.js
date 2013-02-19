var fs = require('fs'),
    uglifyjs = require('uglify-js');

module.exports = function(grunt) {

    var minLangs = {
        langs: {
            src: ['min/langs.js'],
            dest: 'min/langs.min.js'
        }
    };

    // all the lang files need to be added manually
    fs.readdirSync('./lang').forEach(function (path) {
        if (path.indexOf('.js') > -1) {
            minLangs[path] = {
                src: ['lang/' + path],
                dest: 'min/lang/' + path
            };
        }
    });

    grunt.initConfig({
        concatlang : {
            langs: {
                src: ['lang/*.js'],
                dest: 'min/langs.js'
            }
        },
        minlang : minLangs,
        minwithcomments : {
            moment: {
                src: ['moment.js'],
                dest: 'min/moment.min.js'
            }
        },
        uglify: {
            mangle: {
                toplevel: true
            },
            squeeze: {
                dead_code: false
            },
            codegen: {
                ascii_only: true
            }
        },
        test : {
            files : ["test/**/*.js"]
        },
        lint : {
            files: [
                'moment.js',
                'lang/**/*.js'
            ]
        },
        jshint: {
            options: {
                "node"     : true,
                "es5"      : true,
                "browser"  : true,
                "boss"     : false,
                "curly"    : true,
                "debug"    : false,
                "devel"    : false,
                "eqeqeq"   : true,
                "eqnull"   : true,
                "evil"     : false,
                "forin"    : false,
                "immed"    : false,
                "laxbreak" : false,
                "newcap"   : true,
                "noarg"    : true,
                "noempty"  : false,
                "nonew"    : false,
                "onevar"   : true,
                "plusplus" : false,
                "regexp"   : false,
                "undef"    : true,
                "sub"      : true,
                "strict"   : false,
                "white"    : true
            }
        },
        watch : {
            test : {
                files : [
                    'moment.js',
                    'lang/*.js',
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
    grunt.registerTask('default', 'lint test');

    // Task to be run when releasing a new version
    grunt.registerTask('release', 'lint test minwithcomments concatlang minlang');
};
