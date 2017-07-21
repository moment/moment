const path = require('path');
const utils = require('./utils');

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand('src/locale/*.js');

    function buildMoment() {
        grunt.file.copy('build/moment.js', 'build/min/moment.js');
        return Promise.resolve();
    }

    function localeImport(file) {
        return 'import "../../src/locale/' + utils.localeName(file) + '";';
    }

    const localeManifest = ['import moment from "../../src/moment";']
        .concat(localeFiles.map(localeImport))
        .concat('moment.locale(\'en\');')
        .join('\n');

    function buildMomentWithLocales() {
        const manifestFile = 'build/min/moment-with-locales.js';
        grunt.file.write(manifestFile, localeManifest);
        return utils.rollupBundle(manifestFile, {
            name: 'moment',
            external: null /* include everything */
        }).then(function (code) {
            grunt.file.write(manifestFile, code);
        });

    }

    function buildLocales() {
        const manifestFile = 'build/min/locales.js';
        grunt.file.write(manifestFile, localeManifest);
        utils.rollupBundle(manifestFile, {
            name: 'moment.locale',
            external: utils.externalMoment
        }).then(function (code) {
            // The moment dependency will still point to the '../../src/moment' file.
            // Rewrite imports so that they point to './moment';
            code = code.replace(/\.\.\/\.\.\/src\//g, './');
            return grunt.file.write(manifestFile, code);
        });
    }

    const testFiles = grunt.file.expand('src/test/**/*.js');
    function testImport(file) {
        return 'import "../../' + file + '";';
    }
    const testManifest = testFiles.map(testImport).join('\n');

    function buildTests() {
        const manifestFile = 'build/min/tests.js';
        grunt.file.write(manifestFile, testManifest);
        return utils.rollupBundle(manifestFile, {
            external: null /* include everything */
        }).then(function (code) {
            return grunt.file.write(manifestFile, code);
        })
    }

    grunt.registerTask('build:package', 'Generate sources of the \'min\' folder', function () {
        var done = this.async();

        Promise.resolve()
            .then(buildMoment)
            .then(buildMomentWithLocales)
            .then(buildLocales)
            .then(buildTests)
            .then(done);
    });
};

