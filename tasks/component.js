module.exports = function (grunt) {
    grunt.registerTask('component', function () {
        var config = JSON.parse(grunt.file.read('component.json'));

        config.scripts = grunt.file.expand('lang/*.js');
        config.scripts.unshift('language-loader.js');
        config.scripts.unshift('moment.js');

        grunt.file.write('component.json', JSON.stringify(config, true, 2));
    });
};
