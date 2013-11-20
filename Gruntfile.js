module.exports = function (grunt) {

    var embedOption = grunt.option('embed_locales'),
        embedLocaleDest = embedOption ?
            'min/moment-with-customlocales.js' :
            'min/moment-with-locales.js',
        embedLocales = 'locale/*.js';

    if (embedOption && embedOption.match(/,/)) {
        embedLocales = 'locale/{' + embedOption + '}.js';
    }
    else if (embedOption) {
        embedLocales = 'locale/' + embedOption + '.js';
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            locales: {
                src: 'locale/*.js',
                dest: 'min/locales.js'
            }
        },
        uglify : {
            target: {
                files: {
                    'min/moment-with-locales.min.js'       : 'min/moment-with-locales.js',
                    'min/moment-with-customlocales.min.js' : 'min/moment-with-customlocales.js',
                    'min/locales.min.js'                   : 'min/locales.js',
                    'min/moment.min.js'                  : 'moment.js'
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
            all: ["Gruntfile.js", "moment.js", "locale/**/*.js", "test/**/*.js"],
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
                    'locale/*.js',
                    'test/**/*.js'
                ],
                tasks: ['nodeunit']
            },
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        },
        embed_locales: {
            moment: 'moment.js',
            dest: embedLocaleDest,
            targetLocales: embedLocales
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
    grunt.registerTask('release', ['jshint', 'nodeunit', 'concat',
            'embed_locales', 'component', 'uglify']);
};
