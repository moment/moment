const path = require('path');
const {rollupBundle, localeName} = require('./shared');

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand({cwd: 'src'}, 'locale/*.js');

    function buildLocale(file) {
        let name = localeName(file);
        return rollupBundle({
            entry: path.join('src', file),
            name: `moment.locale.${name}`,
            resolve: (id) => {
                if (id === path.resolve('src/moment.js'))
                    return 'moment';
                if (path.dirname(id) === path.resolve('src/locale')) {
                    return 'moment.locale.' + localeName(id);
                }
                return null;
            },
        }).then(code => {
            return grunt.file.write(path.join('build', file), code);
        });
    }

    function buildLocales() {
        return Promise.all(localeFiles.map(buildLocale));
    }

    function buildLocaleManifest() {
        let manifestSource = localeFiles
          .map(file => grunt.file.read(path.join('build', file)))
          .join('\n');
        grunt.file.write('build/min/locales.js', manifestSource);
    }

    grunt.registerTask('build:locales', 'build locales', function () {
        let done = this.async();
        Promise.resolve(null)
            .then(() => buildLocales())
            .then(() => buildLocaleManifest())
            .then(done);
    });
};
