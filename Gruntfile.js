module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            sauceLabs: grunt.file.exists('.sauce-labs.creds')
                ? grunt.file.readJSON('.sauce-labs.creds')
                : {},
        },
        karma: {
            options: {
                browserNoActivityTimeout: 60000,
                browserDisconnectTimeout: 10000,
                browserDisconnectTolerance: 2,
                frameworks: ['qunit'],
                files: ['min/moment-with-locales.js', 'min/tests.js'],
                sauceLabs: {
                    startConnect: true,
                    testName: 'MomentJS',
                },
                customLaunchers: {
                    slChromeWinXp: {
                        base: 'SauceLabs',
                        browserName: 'chrome',
                        platform: 'Windows XP',
                    },
                    slIe10Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '10',
                    },
                    slIe9Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '9',
                    },
                    slIe8Win7: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 7',
                        version: '8',
                    },
                    slIe11Win10: {
                        base: 'SauceLabs',
                        browserName: 'internet explorer',
                        platform: 'Windows 10',
                        version: '11',
                    },
                    slME25Win10: {
                        base: 'SauceLabs',
                        browserName: 'MicrosoftEdge',
                        platform: 'Windows 10',
                        version: '20.10240',
                    },
                    slFfLinux: {
                        base: 'SauceLabs',
                        browserName: 'firefox',
                        platform: 'Linux',
                    },
                    slSafariOsx: {
                        base: 'SauceLabs',
                        browserName: 'safari',
                        platform: 'OS X 10.8',
                    },
                    slSafariOsx11: {
                        base: 'SauceLabs',
                        browserName: 'safari',
                        platform: 'OS X 10.11',
                    },
                },
            },
            server: {
                browsers: [],
            },
            chrome: {
                singleRun: true,
                browsers: ['Chrome'],
            },
            firefox: {
                singleRun: true,
                browsers: ['Firefox'],
            },
            sauce: {
                options: {
                    reporters: ['dots'],
                },
                singleRun: true,
                browsers: [
                    'slChromeWinXp',
                    'slIe10Win7',
                    'slIe9Win7',
                    'slIe8Win7',
                    'slIe11Win10',
                    'slME25Win10',
                    'slFfLinux',
                    'slSafariOsx',
                ],
            },
        },
        uglify: {
            main: {
                files: {
                    'min/moment-with-locales.min.js':
                        'min/moment-with-locales.js',
                    'min/locales.min.js': 'min/locales.js',
                    'min/moment.min.js': 'moment.js',
                },
            },
            options: {
                sourceMap: true,
                mangle: true,
                compress: {
                    dead_code: false,
                },
                output: {
                    ascii_only: true,
                },
                report: 'min',
                preserveComments: /^!|@preserve|@license|@cc_on/i,
            },
        },
        watch: {
            test: {
                files: ['src/**/*.js'],
                tasks: ['test'],
            },
        },
        benchmark: {
            compare: { src: ['benchmarks/compare.js'] },
            startOf: { src: ['benchmarks/startOf.js'] },
            endOf: { src: ['benchmarks/endOf.js'] },
            get: { src: ['benchmarks/get.js'] },
            set: { src: ['benchmarks/set.js'] },
            all: { src: ['benchmarks/*.js'] },
        },
        exec: {
            'meteor-init': {
                // Make sure Meteor is installed, per https://meteor.com/install.
                // The curl'ed script is safe; takes 2 minutes to read source & check.
                command:
                    'type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }',
            },
            'meteor-publish': {
                command: 'cd meteor && meteor publish',
            },
            'typescript-test': {
                command: 'npm run typescript-test',
            },
            'ts3.1-typescript-test': {
                command: 'npm run ts3.1-typescript-test',
            },
            coveralls: {
                command: 'npm run coveralls',
            },
            eslint: {
                command: 'npm run eslint',
            },
            checkMonthsParseIssue: {
                // Each locale should have all (3) or none (0) of monthsParse: configs.
                command:
                    'if [ $(ls src/locale/* | while read -r line; do grep -i "monthsParse:" $line | wc -l; done | sort | uniq | wc -l) -ne 2 ]; then echo "Months parse issue: see https://github.com/moment/moment/issues/2754"; exit 1; fi',
            },
            'prettier-fmt': {
                command: function () {
                    var nodeMajor = parseInt(
                        process.version.slice(1).split('.')[0],
                        10
                    );
                    if (nodeMajor < 10) {
                        return "echo 'NOT running prettier on node < v10'";
                    }
                    return 'npm run prettier-fmt';
                },
            },
            'prettier-check': {
                command: function () {
                    var nodeMajor = parseInt(
                        process.version.slice(1).split('.')[0],
                        10
                    );
                    if (nodeMajor < 10) {
                        return "echo 'NOT running prettier on node < v10'";
                    }
                    return 'npm run prettier-check';
                },
            },
        },
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['lint', 'test']);

    // linting
    grunt.registerTask('lint', [
        'exec:eslint',
        'exec:prettier-check',
        'exec:checkMonthsParseIssue',
    ]);

    // test tasks
    grunt.registerTask('test', [
        'test:node',
        'test:typescript',
        'test:typescript-3.1',
    ]);
    grunt.registerTask('test:node', ['transpile', 'qtest']);
    grunt.registerTask('test:typescript', ['exec:typescript-test']);
    grunt.registerTask('test:typescript-3.1', ['exec:ts3.1-typescript-test']);
    // TODO: For some weird reason karma doesn't like the files in
    // build/umd/min/* but works with min/*, so update-index, then git checkout
    grunt.registerTask('test:server', [
        'transpile',
        'update-index',
        'karma:server',
    ]);
    grunt.registerTask('test:browser', [
        'transpile',
        'update-index',
        'karma:chrome',
        'karma:firefox',
    ]);
    grunt.registerTask('test:sauce-browser', [
        'transpile',
        'update-index',
        'env:sauceLabs',
        'karma:sauce',
    ]);
    grunt.registerTask('test:meteor', [
        'exec:meteor-init',
        'exec:meteor-test',
        'exec:meteor-cleanup',
    ]);

    // travis build task
    grunt.registerTask('build:travis', ['lint', 'exec:coveralls']);
    grunt.registerTask('meteor-publish', [
        'exec:meteor-init',
        'exec:meteor-publish',
        'exec:meteor-cleanup',
    ]);

    // Task to be run when releasing a new version
    grunt.registerTask('release', [
        'default',
        'update-index',
        'component',
        'uglify:main',
    ]);
};
