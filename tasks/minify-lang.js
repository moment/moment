/*jshint onevar:false*/

var fs = require('fs'),
    uglifyjs = require('uglify-js');


module.exports = function (grunt) {

    var START = [
        "(function(){",
        "    function onload (moment) {",
        ""
    ].join('\n');

    var END = [
        "",
        "    }",
        "    if (typeof define === \"function\" && define.amd) {",
        "        define([\"moment\"], onload);",
        "    }",
        "    if (typeof window !== \"undefined\" && window.moment) {",
        "        onload(window.moment);",
        "    }",
        "})()",
        ""
    ].join('\n');

    // UglifyJS does not support keeping the first line comments unless using the CLI.
    // This multi-task ensures that the first comments are kept.
    grunt.registerMultiTask('minlang', 'Minify lang files with UglifyJS.', function () {
        var files = grunt.file.expandFiles(this.file.src),
            min,
            code,
            comments,
            tok;

        // Concat specified files. This should really be a single, pre-built (and
        // linted) file, but it supports any number of files.
        code = grunt.helper('concat', files, {separator: this.data.separator});

        // Add the first comments
        tok = uglifyjs.parser.tokenizer(code);
        min = showCopyright(tok().comments_before);

        // Add the minified source.
        min += grunt.helper('uglify', wrapFile(code), grunt.config('uglify'));
        grunt.file.write(this.file.dest, min);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message....
        grunt.log.writeln('File "' + this.file.dest + '" created.');

        // ...and report some size information.
        grunt.helper('min_max_info', min, code);
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

    function wrapFile(code) {
        code = code.replace(/require\([\'\"]\.\.\/moment[\'\"]\)/g, "moment");
        return START + code + END;
    }
};
