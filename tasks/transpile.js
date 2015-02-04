module.exports = function (grunt) {
    var esperanto = require('esperanto');
    var Promise = require('es6-promise').Promise;

    function moveComments(code) {
        var comments = code.split('\n')
            .map(function(line) {
                return line.trim();
            })
            .filter(function(line) {
                return line.slice(0, 3) === '//!';
            });

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

    grunt.task.registerTask('transpile', 'convert es6 to umd', function () {
        var done = this.async();

        grunt.file.delete("build");

        esperanto.bundle({
            base: 'src',
            entry: 'moment.js'
        }).then(function(bundle) {
            var umd = bundle.toUmd({name: 'moment'});
            grunt.file.write('build/umd/moment.js', moveComments(umd.code));
        }).then(function() {
            var files = grunt.file.expand({cwd: 'src'}, "locale/*.js");
            var header = grunt.file.read('templates/locale-header.js');

            return Promise.all(files.map(function (file) {
                return esperanto.bundle({
                    base: 'src',
                    entry: file,
                    skip: ['moment']
                }).then(function (bundle) {
                    var umd = bundle.toUmd({name: 'not_used'});
                    var fixed = header + umd.code.split('\n').slice(5).join('\n');
                    grunt.file.write('build/umd/' + file, moveComments(fixed));
                });
            }));
        }).then(function() {
            var files = grunt.file.expand({cwd: 'src'}, "test/moment/*.js");
            var header = grunt.file.read('templates/test-header.js');

            return Promise.all(files.map(function (file) {
                return esperanto.bundle({
                    base: 'src',
                    entry: file,
                    skip: ['moment']
                }).then(function (bundle) {
                    var umd = bundle.toUmd({name: 'not_used'});
                    var fixed = header + umd.code.split('\n').slice(5).join('\n');
                    grunt.file.write('build/umd/' + file, fixed);
                });
            }));
        }).then(function () {
            var files = grunt.file.expand({cwd: 'src'}, "test/locale/*.js");
            var header = grunt.file.read('templates/test-header.js');

            return Promise.all(files.map(function (file) {
                return esperanto.bundle({
                    base: 'src',
                    entry: file,
                    skip: ['moment']
                }).then(function (bundle) {
                    var umd = bundle.toUmd({name: 'not_used'});
                    var fixed = header + umd.code.split('\n').slice(5).join('\n');
                    grunt.file.write('build/umd/' + file, fixed);
                });
            }));
        }).then(done, function(e) {
            grunt.log.error("error transpiling", e);
            done(e);
        });
    });
};
