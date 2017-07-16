const path = require('path');
const {externalMomentAndLocales, rollupBundle, localeName} = require('./utils');

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand({cwd: 'src'}, 'locale/*.js');

    function buildLocale(file) {
        let name = localeName(file);
        return rollupBundle({
            entry: path.join('src', file),
            name: `moment.locale.${name}`,
            external: externalMomentAndLocales
        }).then(code => {
            return grunt.file.write(path.join('build', file), code);
        });
    }

    function buildLocales() {
        return Promise.all(localeFiles.map(buildLocale));
    }

    grunt.registerTask('build:locales', 'build locales', function () {
        let done = this.async();
        buildLocales().then(done);
    });
};
