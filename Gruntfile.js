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
                    'min/moment+langs.min.js'       : 'min/moment+langs.js',
                    'min/moment+customlangs.min.js' : 'min/moment+customlangs.js',
                    'min/langs.min.js'              : 'min/langs.js',
                    'min/moment.min.js'             : 'moment.js'
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
        },
        embed_languages: {
            moment: 'moment.js',
            dest: grunt.option('embed_languages') ?
                'min/moment+customlangs.js' :
                'min/moment+langs.js',
            targetLangs: grunt.option('embed_languages') ?
                'lang/{' + grunt.option('embed_languages') + '}.js':
                'lang/*.js'
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
    grunt.registerTask('release', ['jshint', 'nodeunit', 'concat', 'embed_languages', 'uglify']);
};
