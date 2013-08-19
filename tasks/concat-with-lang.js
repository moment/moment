/*jshint onevar:false*/

module.exports = function (grunt) {

    var helpers = require('grunt-lib-legacyhelpers').init(grunt);
    var START = "(function(){\n";
    var END   = "})();\n";
    var RESET = "\nmoment.lang('en');\n";

    grunt.registerMultiTask('concatwithlang', 'Concatenate files.', function() {
        var momentFile = grunt.file.read(this.data.moment);

        var files = grunt.file.expand(this.data.src);
        var src = helpers.concat(files, {separator: END + START});
        var languages = wrapFile(src);

        var outputFile = momentFile.replace('/* EMBED_LANGUAGES */', function () {
            // If we don't do this, $ symbols in lang files may get interpreted in
            //  the regex replacement
            return languages;
        });
        grunt.file.write(this.data.dest, outputFile);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message.
        grunt.log.writeln('File "' + this.data.dest + '" created.');
    });

    function wrapFile(code) {
        code = code.replace(/require\([\'\"]\.\.\/moment[\'\"]\)/g, "moment");
        return START + START + code + END + RESET + END;
    }
};
