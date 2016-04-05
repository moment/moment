var path = require('path');
var babelPlugin = require('rollup-plugin-babel');

module.exports = function (grunt) {
    grunt.config('rollup', {
        options: {
            format: 'umd',
            plugins: [babelPlugin({
                babelrc: false,
                compact: false,
                presets: ['es2015-loose-rollup']
            })]
        },
        moment: {
            options: {
                moduleName: 'moment',
            },
            files: [{
                src: 'src/moment.js',
                dest: 'build/umd/moment.js'
            }]
        },
        locales: {
            options: {
                exports: 'none',
                external: [
                    path.resolve(__dirname, '../src/moment.js')
                ],
                globals: {
                    '../moment': 'moment'
                }
            },
            files: [{
                expand: true,
                cwd: 'src/locale',
                src: '*.js',
                dest: 'build/umd/locale'
            }, {
                src: 'src/locales.js',
                dest: 'build/umd/locales.js'
            }]
        },
        tests: {
            options: {
                format: 'iife'
            },
            files: [{
                src: 'src/test/all.js',
                dest: 'build/umd/test/all.js'
            }]
        }
    });
};
