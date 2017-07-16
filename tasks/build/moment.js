const path = require('path');

const {rollupBundle} = require('./utils');

module.exports = function (grunt) {
    function buildMoment() {
        return rollupBundle({
            entry: 'src/moment.js',
            name: 'moment',
            external: function (id) {
                //include everything
                return null;
            }
        }).then(function (code) {
            return grunt.file.write('build/moment.js', code);
        });
    }

    grunt.registerTask('build:moment', function () {
        var done = this.async();
        buildMoment().then(done);
    });

};
