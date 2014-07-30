module.exports = function (grunt) {
    grunt.registerTask('package_json', function () {
        var config = JSON.parse(grunt.file.read('package.json'));

        config.spm.output = grunt.file.expand('locale/*.js');

        grunt.file.write('package.json', JSON.stringify(config, true, 4) + '\n');
    });
}
