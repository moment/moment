module.exports = function (grunt) {
    // var esperanto = require('esperanto');
    var rollup = require('rollup').rollup;
    // var babel = require('rollup-plugin-babel');
    var path = require('path');
    var Promise = require('es6-promise').Promise;
    var TMP_DIR = 'build/tmp';

    function moveComments(code, moveType) {
        var comments = [], rest = [], skipId = -1;
        code.split('\n').forEach(function (line, i) {
            var isComment = false;
            if (line.trim().slice(0, 3) === '//!') {
                isComment = true;
            }
            if (isComment && moveType === 'main-only') {
                if (i === skipId + 1 ||
                        line.trim() === '//! moment.js locale configuration') {
                    skipId = i;
                    // continue to next line
                    return;
                }
            }

            if (isComment) {
                comments.push(line.trim());
            } else {
                rest.push(line);
            }
        });

        return comments.concat([''], rest).join('\n');
    }

    var headerCache = {};
    function getHeaderByFile(headerFile) {
        if (headerFile === 'none') {
            return '';
        }
        if (!(headerFile in headerCache)) {
            headerCache[headerFile] = grunt.file.read(headerFile);
        }
        return headerCache[headerFile];
    }

    function rollupBundle(opts) {
        // entry, umdName, skipMoment

        var rollupOpts = {
            input: opts.entry,
            plugins: [
                // babel({})
            ]
        }, bundleOpts = {
            format: 'umd',
            name: opts.umdName != null ? opts.umdName : 'not_used'
        };

        if (opts.skipMoment) {
            // And this is what people call progress?
            rollupOpts.external = [
                './moment',
                '../moment',
                '../../moment',
                path.resolve('src/moment'),
                path.resolve('build/tmp/moment')
            ];
            bundleOpts.globals = {};
            bundleOpts.globals[path.resolve('src/moment')] = 'moment';
            bundleOpts.globals[path.resolve('build/tmp/moment')] = 'moment';
        }

        return rollup(rollupOpts).then(function (bundle) {
            return bundle.generate(bundleOpts);
        }).then(function (result) {
            return result.code;
        });
    }

    function transpile(opts) {
        // base, entry, skipMoment, headerFile, skipLines, target
        var umdName = opts.headerFile != null && opts.headerFile !== 'none' ? 'not_used' : opts.umdName,
            headerFile = opts.headerFile ? opts.headerFile : 'templates/default.js',
            header = getHeaderByFile(headerFile),
            skipLines = opts.skipLines != null ? opts.skipLines : 5;

        return rollupBundle({
            entry: path.join(opts.base, opts.entry),
            skipMoment: opts.skipMoment != null ? opts.skipMoment : false,
            umdName: umdName
        }).then(function (code) {
            var fixed = header + code.split('\n').slice(skipLines).join('\n');
            if (opts.moveComments) {
                fixed = moveComments(fixed, opts.moveComments);
            }
            grunt.file.write(opts.target, fixed);
        });
    }

    function transpileMany(opts) {
        var batchSize = 50,
            promise = Promise.resolve(null),
            files = grunt.file.expand({cwd: opts.base}, opts.pattern),
            i,
            transpileOne = function (i) {
                promise = promise.then(function () {
                    return Promise.all(files.slice(i, i + batchSize).map(function (file) {
                        return transpile({
                            base: opts.base,
                            entry: file,
                            headerFile: opts.headerFile,
                            skipMoment: opts.skipMoment,
                            skipLines: opts.skipLines,
                            moveComments: opts.moveComments,
                            target: path.join(opts.targetDir, file)
                        });
                    }));
                });
            };

        for (i = 0; i < files.length; i += batchSize) {
            transpileOne(i);
        }

        return promise;
    }

    function prepareTemp(base) {
        var files = grunt.file.expand({cwd: base}, '**/*.js'),
            tmpDir = TMP_DIR;
        if (grunt.file.exists(tmpDir)) {
            return;
        }
        files.forEach(function (file) {
            grunt.file.copy(path.join(base, file), path.join(tmpDir, file));
        });
    }

    function transpileCode(opts) {
        var entry = opts.entry || path.basename(opts.target);
        prepareTemp(opts.base);
        grunt.file.write(path.join(TMP_DIR, entry), opts.code);
        return transpile({
            base: TMP_DIR,
            entry: entry,
            umdName: opts.umdName || 'not_used',
            headerFile: opts.headerFile,
            skipLines: opts.skipLines,
            moveComments: opts.moveComments,
            target: opts.target,
            skipMoment: opts.skipMoment
        });
    }

    function generateLocales(target, localeFiles, opts) {
        var files = localeFiles,
            code = [
                'import moment from "./moment";',
                'export default moment;'
            ].concat(files.map(function (file) {
                var identifier = path.basename(file, '.js').replace('-', '_');
                return 'import ' + identifier + ' from "./' + file + '";';
            })).concat([
                // Reset the language back to 'en', because every defineLocale
                // also sets it.
                'moment.locale(\'en\');'
            ]).join('\n');
        return transpileCode({
            base: 'src',
            code: code,
            target: target,
            skipMoment: opts.skipMoment,
            headerFile: opts.skipMoment === true ? 'templates/locale-header.js' : 'templates/default.js',
            skipLines: opts.skipMoment === true ? 7 : 5
        });
    }

    grunt.task.registerTask('transpile-raw', 'convert es6 to umd', function () {
        var done = this.async();

        transpile({
            base: 'src',
            entry: 'moment.js',
            umdName: 'moment',
            target: 'build/umd/moment.js',
            skipLines: 5,
            moveComments: true
        }).then(function () {
            grunt.log.ok('build/umd/moment.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'locale/*.js',
                headerFile: 'templates/locale-header.js',
                skipLines: 7,
                moveComments: true,
                targetDir: 'build/umd',
                skipMoment: true
            });
        }).then(function () {
            grunt.log.ok('build/umd/locale/*.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'test/moment/*.js',
                headerFile: 'templates/test-header.js',
                skipLines: 7,
                moveComments: true,
                targetDir: 'build/umd',
                skipMoment: true
            });
        }).then(function () {
            grunt.log.ok('build/umd/test/moment/*.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'test/locale/*.js',
                headerFile: 'templates/test-header.js',
                skipLines: 7,
                moveComments: true,
                targetDir: 'build/umd',
                skipMoment: true
            });
        }).then(function () {
            grunt.log.ok('build/umd/test/locale/*.js');
        }).then(function () {
            return generateLocales(
                'build/umd/min/locales.js',
                grunt.file.expand({cwd: 'src'}, 'locale/*.js'),
                {skipMoment: true}
            );
        }).then(function () {
            grunt.log.ok('build/umd/min/locales.js');
        }).then(function () {
            return generateLocales(
                'build/umd/min/moment-with-locales.js',
                grunt.file.expand({cwd: 'src'}, 'locale/*.js'),
                {skipMoment: false}
            );
        }).then(function () {
            grunt.log.ok('build/umd/min/moment-with-locales.js');
        }).then(done, function (e) {
            grunt.log.error('error transpiling', e);
            done(e);
        });
    });

    grunt.task.registerTask('transpile-custom-raw',
            'build just custom language bundles',
            function (locales) {
        var done = this.async();

        var localeFiles = locales.split(',').map(function (locale) {
            var file = grunt.file.expand({cwd: 'src'}, 'locale/' + locale + '.js');
            if (file.length !== 1) {
                // we failed to find a locale
                done(new Error('could not find locale: ' + locale));
                done = null;
            } else {
                return file[0];
            }
        });

        // There was an issue with a locale
        if (done == null) {
            return;
        }

        return generateLocales(
            'build/umd/min/locales.custom.js',
            localeFiles,
            {skipMoment: true}
        ).then(function () {
            grunt.log.ok('build/umd/min/locales.custom.js');
        }).then(function () {
            return generateLocales(
                'build/umd/min/moment-with-locales.custom.js',
                localeFiles,
                {skipMoment: false});
        }).then(function () {
            grunt.log.ok('build/umd/min/moment-with-locales.custom.js');
        }).then(function () {
            var moment = require('../build/umd/min/moment-with-locales.custom.js');
            if (moment.locales().filter(function (locale) {
                return locale !== 'en';
            }).length !== localeFiles.length) {
                throw new Error(
                    'You probably specified locales requiring ' +
                    'parent locale, but didn\'t specify parent');
            }
        }).then(done, function (e) {
            grunt.log.error('error transpiling-custom', e);
            done(e);
        });
    });

    grunt.config('clean.build', [
        'build'
    ]);

    grunt.config('concat.tests', {
        src: 'build/umd/test/**/*.js',
        dest: 'build/umd/min/tests.js'
    });

    grunt.task.registerTask('transpile',
            'builds all es5 files, optinally creating custom locales',
            function (locales) {
        var tasks = [
            'clean:build',
            'transpile-raw',
            'concat:tests'
        ];

        if (locales) {
            tasks.push('transpile-custom-raw:' + locales);
        }

        grunt.task.run(tasks);
    });
};
