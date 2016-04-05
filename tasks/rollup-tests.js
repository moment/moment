var rollup = require('rollup');
var babelPlugin = require('rollup-plugin-babel');
var multiEntry = require('rollup-plugin-multi-entry').default;

function testFiles(grunt) {
    var only = grunt.option('only') || '{moment,locale}/*';
    return grunt.file.expand({
        filter: 'isFile'
    }, 'src/test/**/' + only + '{,.js,**/*.js}');
}

module.exports = function (grunt) {
    grunt.task.registerTask('rollup-tests', 'bundle tests', function () {
        var done = this.async();
        var files = testFiles(grunt);

        if (grunt.option('only')) {
            console.log('Only testing files ' + files.join(', '));
        }

        rollup.rollup({
            entry: files,
            plugins: [
                multiEntry(),
                babelPlugin({
                    babelrc: false,
                    compact: false,
                    presets: ['es2015-loose-rollup']
                })
            ]
        }).then(function (bundle) {
            return bundle.write({
                format: 'iife',
                moduleName: 'momentTests',
                dest: 'build/tests.js'
            });
        }).then(done, done);
    });
};
