module.exports = function (grunt) {
    grunt.registerTask('component', function () {
        var config = JSON.parse(grunt.file.read('component.json'));

        config.files = grunt.file.expand('locale/*.js');
        config.files.unshift('moment.js');

        grunt.file.write('component.json', JSON.stringify(config, true, 2) + '\n');
    });
};
