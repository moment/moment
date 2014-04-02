module.exports = function (grunt) {

    var embedOption = grunt.option('embedLanguages'),
        embedLanguageDest = embedOption ?
            'min/moment-with-customlangs.js' :
            'min/moment-with-langs.js',
        embedLanguageLangs = 'lang/*.js';

    if (embedOption && embedOption.match(/,/)) {
        embedLanguageLangs = 'lang/{' + embedOption + '}.js';
    }
    else if (embedOption) {
        embedLanguageLangs = 'lang/' + embedOption + '.js';
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            langs: {
                src: 'lang/*.js',
                dest: 'min/langs.js'
            },
            tests: {
                src: [
                    'test/browser-prefix.js',
                    'test/moment/*.js',
                    'test/lang/*.js',
                    'test/browser-suffix.js'
                ],
                dest: 'min/tests.js'
            }
        },
        env : {
            sauceLabs : (grunt.file.exists('.sauce-labs.creds') ?
                    grunt.file.readJSON('.sauce-labs.creds') : {})
        },
        karma : {
            options: {
                frameworks: ['nodeunit'],
                files: [
                    'min/moment-with-langs.js',
                    'min/tests.js',
                    'test/browser.js'
                ],
                sauceLabs: {
                    startConnect: true,
                    testName: 'MomentJS'
                },
                customLaunchers: {
                    slChromeWinXp: {
                        base: 'SauceLabs',
                        browserName: 'chrome',
                        platform: 'Windows XP'
                    },
                    slIe9Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '9'
                    },
                    slIe8Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '8'
                    },
                    slFfLinux: {
                        base: 'SauceLabs',
                        browserName: 'firefox',
                        platform: 'Linux'
                    },
                    slSafariOsx: {
                        base: 'SauceLabs',
                        browserName: 'safari',
                        platform: 'OS X 10.8'
                    }
                }
            },
            server: {
                browsers: []
            },
            chrome: {
                singleRun: true,
                browsers: ['Chrome']
            },
            firefox: {
                singleRun: true,
                browsers: ['Firefox']
            },
            sauce: {
                options: {reporters: ['dots']},
                singleRun: true,
                browsers: [
                    'slChromeWinXp',
                    'slIe9Win7',
                    'slIe8Win7',
                    'slFfLinux',
                    'slSafariOsx'
                ]
            }
        },

        uglify : {
            target: {
                files: {
                    'min/moment-with-langs.min.js'       : 'min/moment-with-langs.js',
                    'min/moment-with-customlangs.min.js' : 'min/moment-with-customlangs.js',
                    'min/langs.min.js'                   : 'min/langs.js',
                    'min/moment.min.js'                  : 'moment.js'
                }
            },
            options: {
                mangle: true,
                compress: {
                    dead_code: false // jshint ignore:line
                },
                output: {
                    ascii_only: true // jshint ignore:line
                },
                report: 'min',
                preserveComments: 'some'
            }
        },
        nodeunit : {
            all : ["test/moment/**/*.js", "test/lang/**/*.js"]
        },
        jshint: {
            all: [
                "Gruntfile.js", "moment.js", "lang/**/*.js", "test/**/*.js",
                "!test/browser*.js"
            ],
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
                "es3"      : true,
                "camelcase" : true,
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
        embedLanguages: {
            moment: 'moment.js',
            dest: embedLanguageDest,
            targetLangs: embedLanguageLangs
        }
    });

    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    //test tasks
    grunt.registerTask('test', ['test:node', 'test:browser']);
    grunt.registerTask('test:node', ['nodeunit']);
    grunt.registerTask('test:server', ['concat', 'embedLanguages', 'karma:server']);
    grunt.registerTask('test:browser', ['concat', 'embedLanguages', 'karma:chrome', 'karma:firefox']);
    grunt.registerTask('test:sauce-browser', ['concat', 'embedLanguages', 'env:sauceLabs', 'karma:sauce']);
    grunt.registerTask('test:travis-sauce-browser', ['concat', 'embedLanguages', 'karma:sauce']);

    // travis build task
    grunt.registerTask('build:travis', [
        'jshint', 'test:node', 'check-sauce-creds',
        'test:travis-sauce-browser'
    ]);

    // Task to be run when releasing a new version
    grunt.registerTask('release', [
        'jshint', 'nodeunit', 'concat', 'embedLanguages',
        'component', 'uglify'
    ]);
};
