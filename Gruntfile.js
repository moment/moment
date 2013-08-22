module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            langs: {
                src: 'lang/*.js',
                dest: 'min/langs.js'
            }
        },
        uglify : {
            target: {
                files: {
                    'min/langs.min.js'  : 'min/langs.js',
                    'min/moment.min.js' : 'moment.js'
                }
            },
            options: {
                mangle: true,
                compress: {
                    dead_code: false
                },
                output: {
                    ascii_only: true
                },
                report: 'min',
                preserveComments: 'some'
            }
        },
        nodeunit : {
            all : ["test/**/*.js"]
        },
        jshint: {
            all: ["Gruntfile.js", "moment.js", "lang/**/*.js", "test/**/*.js"],
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
                "white"    : true,
                "globals": {
                    "define": false
                }
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
    grunt.registerTask('test', ['nodeunit']);

    // Task to be run when releasing a new version
    grunt.registerTask('release', ['jshint', 'nodeunit', 'concat', 'uglify']);
};
