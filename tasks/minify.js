/*jshint onevar:false*/

var fs = require('fs'),
    uglifyjs = require('uglify-js');


module.exports = function (grunt) {

    var helpers = require('grunt-lib-legacyhelpers').init(grunt);

    // UglifyJS does not support keeping the first line comments unless using the CLI.
    // This multi-task ensures that the first comments are kept.
    grunt.registerMultiTask('minwithcomments', 'Minify lang files with UglifyJS.', function () {
        var files = grunt.file.expand(this.data.src),
            min,
            code,
            comments,
            tok,
            result;

        // Concat specified files. This should really be a single, pre-built (and
        // linted) file, but it supports any number of files.
        code = helpers.concat(files, {separator: this.data.separator});

        // Add the first comments
        tok = uglifyjs.parse(code);
        min = showCopyright(tok.start.comments_before);

        // Add the minified source.
        result = uglifyjs.minify(code, grunt.config('uglify.options'));
        min += result.code;
        grunt.file.write(this.data.dest, min);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message....
        grunt.log.writeln('File "' + this.data.dest + '" created.');

        // ...and report some size information.
        helpers.min_max_info(min, code);
    });

    // Helper for the 'mincomment' multitask
    function showCopyright(comments) {
        var ret = "", i, c;
        for (i = 0; i < comments.length; ++i) {
            c = comments[i];
            if (c.type === "comment1") {
                ret += "//" + c.value + "\n";
            } else {
                ret += "/*" + c.value + "*/";
            }
        }
        return ret;
    }
};
