var path = require('path');

module.exports = function (grunt) {
    grunt.registerTask('component', 'Buld component.json', function () {
        var opts = grunt.config('component');

        // Put all language files
        grunt.file.recurse('lang', function(abspath, rootdir, subdir, filename) {
            if (filename.substr(filename.length - 3) === '.js') {
                opts.scripts.push(path.join(rootdir, subdir, filename));
            }
        });

        // Set version from package.json
        opts.version = grunt.config('pkg.version');

        grunt.file.write("component.json", JSON.stringify(opts, true, 2) + '\n');
        grunt.log.ok("component.json written");
    });
};
