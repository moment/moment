const path = require('path');
const utils = require('./utils');
const Promise = require('es6-promise').Promise;

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand({cwd: 'src'}, 'locale/*.js');

    function buildLocale(file) {
        var name = utils.localeName(file);
        return utils.rollupBundle(path.join('src', file), {
            name: 'moment.locale.' + name,
            external: utils.externalMomentAndLocales
        }).then(function (code) {
            return grunt.file.write(path.join('build', file), code);
        });
    }

    function buildLocales() {
        return Promise.all(localeFiles.map(buildLocale));
    }

    grunt.registerTask('build:locales', 'build locales', function () {
        var done = this.async();
        buildLocales().then(done);
    });
};
