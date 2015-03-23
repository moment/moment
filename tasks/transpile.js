module.exports = function (grunt) {
    var esperanto = require('esperanto');
    var path = require('path');
    var Promise = require('es6-promise').Promise;
    var TMP_DIR = 'build/tmp';

    grunt.config('concat.tests', {
        src: 'build/umd/test/**/*.js',
        dest: 'build/umd/min/tests.js'
    });

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

    grunt.task.registerTask('transpile-raw', 'convert es6 to umd', function () {
        var done = this.async();

        grunt.file.delete('build');

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
            var files = grunt.file.expand({cwd: 'src'}, 'locale/*.js'),
                code = files.map(function (file) {
                    var identifier = path.basename(file, '.js').replace('-', '_');
                    return 'import ' + identifier + ' from "./' + file + '";';
                }).join('\n');
            return transpileCode({
                base: 'src',
                code: code,
                target: 'build/umd/min/locales.js',
                skip: ['moment'],
                headerFile: 'templates/locale-header.js',
                skipLines: 5
            });
        }).then(function () {
            grunt.log.ok('build/umd/min/locales.js');
        }).then(function () {
            var files = grunt.file.expand({cwd: 'src'}, 'locale/*.js'),
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
                target: 'build/umd/min/moment-with-locales.js'
            }).then(function () {
                var code = grunt.file.read('build/umd/min/moment-with-locales.js');
                code = code.replace('    var moment = {\n        get default () { return moment__default; }\n    };', '');
                code = code.replace('var moment_with_locales = moment', 'var moment_with_locales = moment__default');
                grunt.file.write('build/umd/min/moment-with-locales.js', code);
            });
        }).then(function () {
            grunt.log.ok('build/umd/min/moment-with-locales.js');
        }).then(done, function (e) {
            grunt.log.error('error transpiling', e);
            done(e);
        });
    });

    grunt.registerTask('transpile', ['transpile-raw', 'concat:tests']);
};
