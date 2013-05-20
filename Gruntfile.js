var fs = require('fs');

module.exports = function (grunt) {

    var minifiedFiles = {
            'min/langs.min.js'  : ['min/langs.js'],
            'min/moment.min.js' : ['moment.js']
        },
        minLangs = {
            langs: {
                src: ['min/langs.js'],
                dest: 'min/langs.min.js'
            }
        };

    // all the lang files need to be added manually
    fs.readdirSync('./lang').forEach(function (path) {
        if (path.indexOf('.js') > -1) {
            var dest = 'min/lang/' + path,
                src = ['lang/' + path];

            minifiedFiles[dest] = src;
            minLangs[path] = {src: src, dest: dest};
        }
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            langs: {
                src: ['lang/*.js'],
                dest: 'min/langs.js'
            }
        },
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
        uglify : {
            my_target: {
                files: minifiedFiles
            },
            options: {
                fromString: true,
                mangle: true,
                compress: {
                    dead_code: false
                },
                output: {
                    ascii_only: true
                }
            }
        },
        nodeunit : {
            all : ["test/**/*.js"]
        },
        jshint: {
            all: ["Gruntfile.js", "moment.js", "lang/**/*.js"],
            options: {
                "node"     : true,
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
                tasks: ['nodeunit']
            },
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        }
    });

    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    // Task to be run when releasing a new version
    grunt.registerTask('release', ['jshint', 'nodeunit', 'minwithcomments', 'concatlang', 'minlang']);
};
