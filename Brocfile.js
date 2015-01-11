var compileModules = require('broccoli-es6-module-transpiler');
var compile6to5 = require('broccoli-6to5-transpiler');
var uglify = require('broccoli-uglify-js');
var merge = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

var testFiles = new Funnel('.', {
    include: [/^test\/(moment|qunit|helpers)/]
});

var libAndTests = merge(['lib', testFiles]);

var tests = compileModules(libAndTests, {
    formatter: 'bundle',
    output: 'test/moment-and-tests.js'
});

function bundle (file) {
    var template = new Funnel('templates', {
        include : [new RegExp(file + ".js")]
    });
    return compileModules(merge(['lib', template]), {
        formatter: 'bundle',
        output: file + '/moment.js'
    });
}

var bundled = merge([
    bundle('amd'),
    bundle('amd-named'),
    bundle('globals')
]);

var minified = uglify(bundled, {
    mangle: true,
    compress: {
        dead_code: false // jshint ignore:line
    },
    output: {
        ascii_only: true // jshint ignore:line
    }
});

var commonjsSource = compile6to5(libAndTests, {
    modules: 'commonInterop'
});

var commonjs = new Funnel(commonjsSource, {
    destDir: "commonjs"
});

var all = merge([minified, tests, commonjs]);

var allWithoutMaps = new Funnel(all, {
    exclude: [/\.map$/]
});

module.exports = allWithoutMaps;
