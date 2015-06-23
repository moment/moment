module.exports = function (grunt) {
    var esperanto = require('esperanto');
    var path = require('path');
    var Promise = require('es6-promise').Promise;
    var TMP_DIR = 'build/tmp';

    function moveComments(code) {
        var comments = [], rest = [];
        code.split('\n').forEach(function (line) {
            if (line.trim().slice(0, 3) === '//!') {
                comments.push(line.trim());
            } else {
                rest.push(line);
            }
        });

        return comments.concat([''], rest).join('\n');
    }

    var headerCache = {};
    function getHeaderByFile(headerFile) {
        if (!(headerFile in headerCache)) {
            headerCache[headerFile] = grunt.file.read(headerFile);
        }
        return headerCache[headerFile];
    }

    function transpile(opts) {
        // base, entry, skip, headerFile, skipLines, target
        var umdName = opts.headerFile ? 'not_used' : opts.umdName,
            header = opts.headerFile ? getHeaderByFile(opts.headerFile) : '',
            skipLines = opts.skipLines ? opts.skipLines : 0;

        return esperanto.bundle({
            base: opts.base,
            entry: opts.entry,
            skip: opts.skip || []
        }).then(function (bundle) {
            var umd = bundle.toUmd({name: umdName}),
                fixed = header + umd.code.split('\n').slice(skipLines).join('\n');
            if (opts.moveComments) {
                fixed = moveComments(fixed);
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
                            skip: opts.skip,
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
            skip: opts.skip
        });
    }

    function generateLocales(target, localeFiles) {
        var files = localeFiles,
            code = files.map(function (file) {
                var identifier = path.basename(file, '.js').replace('-', '_');
                return 'import ' + identifier + ' from "./' + file + '";';
            }).join('\n');
        return transpileCode({
            base: 'src',
            code: code,
            target: target,
            skip: ['moment'],
            headerFile: 'templates/locale-header.js',
            skipLines: 5
        });
    }

    function generateMomentWithLocales(target, localeFiles) {
        var files = localeFiles,
            importCode = files.map(function (file) {
                var identifier = path.basename(file, '.js').replace('-', '_');
                var fileNoExt = file.replace('.js', '');
                return 'import ' + identifier + ' from "./' + fileNoExt + '";';
            }).join('\n'),
            code = 'import * as moment_export from "./moment";\n\n' +
                importCode + '\n\n' +
                'export default moment_export;';

        return transpileCode({
            base: 'src',
            code: code,
            umdName: 'moment',
            target: target
        }).then(function () {
            var code = grunt.file.read(target);
            var getDefaultRegExp = new RegExp('var ([a-z$_]+) =\\s+{[^]\\s+get default \\(\\) { return ([a-z$_]+); }[^]\\s+}', '');
            var crap = code.match(getDefaultRegExp);
            if (crap.length !== 3) {
                grunt.file.write('/tmp/crap.js', code);
                throw new Error('Failed to detect get default crap, check /tmp/crap.js');
            }
            code = code.replace(getDefaultRegExp, '');

            var buildExportVars = ['moment_with_locales', 'moment_with_locales_custom'];
            buildExportVars.forEach(function (buildExportVar) {
                var languageReset = buildExportVar  + '.locale(\'en\');';
                code = code.replace('var ' + buildExportVar + ' = ' + crap[1] + ';',
                                    'var ' + buildExportVar + ' = ' + crap[2] + ';\n' +
                                    '    ' + languageReset);
            });

            if (code.match('get default')) {
                grunt.file.write('/tmp/crap.js', code);
                throw new Error('Stupid shit es6 get default plaguing the code, check /tmp/crap.js');
            }
            grunt.file.write(target, code);
        });
    }

    grunt.task.registerTask('transpile-raw', 'convert es6 to umd', function () {
        var done = this.async();

        transpile({
            base: 'src',
            entry: 'moment.js',
            umdName: 'moment',
            target: 'build/umd/moment.js',
            moveComments: true
        }).then(function () {
            grunt.log.ok('build/umd/moment.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'locale/*.js',
                headerFile: 'templates/locale-header.js',
                skipLines: 5,
                moveComments: true,
                targetDir: 'build/umd',
                skip: ['moment']
            });
        }).then(function () {
            grunt.log.ok('build/umd/locale/*.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'test/moment/*.js',
                headerFile: 'templates/test-header.js',
                skipLines: 5,
                moveComments: true,
                targetDir: 'build/umd',
                skip: ['moment']
            });
        }).then(function () {
            grunt.log.ok('build/umd/test/moment/*.js');
        }).then(function () {
            return transpileMany({
                base: 'src',
                pattern: 'test/locale/*.js',
                headerFile: 'templates/test-header.js',
                skipLines: 5,
                moveComments: true,
                targetDir: 'build/umd',
                skip: ['moment']
            });
        }).then(function () {
            grunt.log.ok('build/umd/test/locale/*.js');
        }).then(function () {
            return generateLocales('build/umd/min/locales.js',
                grunt.file.expand({cwd: 'src'}, 'locale/*.js'));
        }).then(function () {
            grunt.log.ok('build/umd/min/locales.js');
        }).then(function () {
            return generateMomentWithLocales('build/umd/min/moment-with-locales.js',
                grunt.file.expand({cwd: 'src'}, 'locale/*.js'));
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
            'build/umd/min/locales.custom.js', localeFiles
        ).then(function () {
            grunt.log.ok('build/umd/min/locales.custom.js');
        }).then(function () {
            return generateMomentWithLocales('build/umd/min/moment-with-locales.custom.js',
                localeFiles);
        }).then(function () {
            grunt.log.ok('build/umd/min/moment-with-locales.custom.js');
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
