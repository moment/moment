module.exports = function (grunt) {
    grunt.config('babel', {
        options: {
            presets: ['es2015-loose'],
            plugins: ['transform-es2015-modules-commonjs']
        },
        cjs: {
            files: [{
                expand: true,
                cwd: 'src',
                src: '**/*.js',
                dest: 'build/cjs'
            }]
        }
    });
};
