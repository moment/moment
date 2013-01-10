/*jshint onevar:false*/

module.exports = function (grunt) {

    var START = "(function(){\n";
    var RESET = "\nrequire('../moment').lang('en');\n"
    var END   = "})();\n";

    grunt.registerMultiTask('concatlang', 'Concatenate files.', function() {
        var files = grunt.file.expandFiles(this.file.src);
        // Concat specified files.
        var src = grunt.helper('concat', files, {separator: END + START});
        grunt.file.write(this.file.dest, START + src + RESET + END);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message.
        grunt.log.writeln('File "' + this.file.dest + '" created.');
    });
};
