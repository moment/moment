module.exports = function (grunt) {
    var esperanto = require('esperanto');
    var Promise = require('es6-promise').Promise;

    grunt.task.registerTask('transpile', 'convert es6 to umd', function () {
        var done = this.async();

        grunt.file.delete("build");

        esperanto.bundle({
            base: 'src', // optional, defaults to current dir
            entry: 'moment.js' // the '.js' is optional
        }).then(function(bundle) {
            var umd = bundle.toUmd({name: 'moment'});
            grunt.file.write('build/umd/moment.js', umd.code);
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

        }).catch(function() {
        }).then(done);

    });
};
