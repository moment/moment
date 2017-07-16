const path = require('path');
const {localeName, rollupBundle} = require('./utils');

module.exports = function (grunt) {
    const localeFiles = grunt.file.expand('src/locale/*.js');

    grunt.registerTask('build:min:moment', function () {
        grunt.file.copy('build/moment.js', 'build/min/moment.js');
    });

    const localeManifest = [
        'import moment from "../../src/moment";',
        ...localeFiles.map(file => `import "../../src/locale/${localeName(file)}";`),
        'moment.locale(\'en\');'
    ].join('\n');

    grunt.registerTask('build:min:moment-with-locales', function () {
        var done = this.async();
        grunt.file.write('build/min/moment-with-locales.js', localeManifest);

        rollupBundle({
            entry: 'build/min/moment-with-locales.js',
            name: 'moment',
            external: function () { /* include everything */ }
        }).then(code => {
            return grunt.file.write('build/min/moment-with-locales.js', code);
        }).then(done);
    });

    // min/locales is just the concatenation of all locales
    // It doesn't have any exports, it just statically declares all the locales at once.
    grunt.registerTask('build:min:locales', 'Generates min/locales.js', function () {
        var done = this.async();
        grunt.file.write('build/min/locales.js', localeManifest);

        rollupBundle({
            entry: 'build/min/locales.js',
            name: null /* no exports */,
            external: function (id) {
                if (id === path.resolve('src/moment.js'))
                    return 'moment';
                return null;
            }
        }).then((code) => {
            // The requires are still pointing to src/moment. Instead point them to min/moment
            code = code.replace(/(\.\.\/)+src\/moment.js/g, './moment.js');
            grunt.file.write('build/min/locales.js', code);
        });
    });

    const testFiles = grunt.file.expand('src/test/**/*.js');

    const testManifest = testFiles.map(file => `import "../../${file}";`).join('\n');

    grunt.registerTask('build:min:tests', 'Generates min/tests.js', function () {
        var done = this.async();
        grunt.file.write('build/min/tests.js', testManifest);

        rollupBundle({
            entry: 'build/min/tests.js',
            name: null /* no exports */,
            external: function (id) { /* include everything */ }
        }).then((code) => {
            grunt.file.write('build/min/tests.js');
        }).then(done);
    });

    grunt.registerTask('build:min', 'Generate sources of the \'min\' folder', [
      'build:moment',
      'build:locales',
      'build:tests',
      'build:min:moment',
      'build:min:moment-with-locales',
      'build:min:locales',
      'build:min:tests'
    ]);
};

