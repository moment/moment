var path = require('path');

module.exports = function (grunt) {
    function importAll(src, dest) {
        var out = grunt.file.expand(src).map(function (file) {
            return "import './" + path.relative(path.dirname(dest), file) + "';";
        }).sort().join('\n');
        grunt.file.write(dest, out);
    }

    grunt.registerTask('import-all', function () {
        importAll('src/locale/*', 'src/locales.js');
        importAll('src/test/{locale,moment}/**/*.js', 'src/test/all.js');
    });
};
