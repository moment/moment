const path = require('path');

const utils = require('./utils');

module.exports = function (grunt) {
    function buildMoment() {
        return utils.rollupBundle('src/moment.js', {
            name: 'moment',
            external: null /* include everything */
        }).then(function (code) {
            return grunt.file.write('build/moment.js', code);
        });
    }

    grunt.registerTask('build:moment', function () {
        var done = this.async();
        buildMoment().then(done);
    });

};
