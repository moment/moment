const path = require('path');
const {rollupBundle} = require('./shared');

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand({cwd: 'src'}, 'locale/*.js');
    const localeNames = localeFiles.map(file => file.match(/locale\/([-a-z]+)/)[1]);

    function buildLocale(name) {
        return rollupBundle({
            entry: `src/locale/${name}.js`,
            // Just include the module itself, no dependencies
            external: [
                path.resolve('src/moment.js')
            ],
            globals: {
                './moment': path.resolve('src/moment.js'),
                [path.resolve('src/moment.js')]: 'moment'
            }
        }).then(code => {
            return grunt.file.write(`build/locale/${name}.js`, code)
        });
    }

    const batchSize = 10;

    function buildLocaleBatch(batchId) {
        let batchLocales = localeNames.slice(batchId, batchId + batchSize);
        return Promise.all(batchLocales.map(buildLocale)).then(() => {
            const nextBatchId = batchId + batchSize;
            if (nextBatchId > localeNames.length) {
                return;
            }
            return buildLocaleBatch(nextBatchId);
        });
    }

    function buildLocales() {
        return buildLocaleBatch(0);
    }

    function buildLocaleManifest() {
        let manifestSource = localeNames
          .map(name => grunt.file.read(`build/locale/${name}.js`))
          .join('\n');
        grunt.file.write('build/locales.js', manifestSource);
    }

    grunt.registerTask('build:locales', 'build locales', function () {
        let done = this.async();
        return buildLocales().then(() => buildLocaleManifest()).then(done);
    });
};
