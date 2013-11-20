
module.exports = function (grunt) {

    grunt.registerTask('embed_locales', function () {
        var config = grunt.config('embed_locales');

        var files = grunt.file.expand(config.targetLangs);
        var embeddedContents = determineEmbeddedContent(files);

        var momentContents = grunt.file.read(config.moment);
        var modifiedContents = momentContents.replace('/* EMBED_LANGUAGES */', function () {
            // If we don't do this, $ symbols in locale files may get interpreted in
            // the regex replacement
            return embeddedContents;
        });

        grunt.file.write(config.dest, modifiedContents);
    });

    var localeReset = 'moment.locale(\'en\');';

    function determineEmbeddedContent(files) {
        var embeddedContent = '';
        files.forEach(function (file) {
            embeddedContent += transformFile(file);
        });
        embeddedContent += '\n    ' + localeReset + '\n';
        return embeddedContent;
    }

    var reTransform = /function \(factory\) \{[^]*\}(?=\(function \(moment\) \{)/gm;
    var replaceWith =
        'function (factory) {\n' +
        '    factory(moment);\n' +
        '}';

    function transformFile(file) {
        var fileContents = grunt.file.read(file);

        if (!fileContents.match(reTransform)) {
            grunt.warn('Warning: all locale files must use the common UMD wrapper pattern.  Failed locale file: ' + file);
            return '';
        }

        return fileContents.replace(reTransform, replaceWith);
    }

};

