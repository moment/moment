const rollup = require('rollup').rollup;
const path = require('path');

//const babel  = require('build-plugin-babel');

function localeName(localeFile) {
    return path.basename(localeFile).match(/([-a-z]+)\.js/)[1];
}

/// Considers the file 'src/moment.js' to be external to the current module
function externalMoment(id) {
    if (id === path.resolve('src/moment.js')) {
        return 'moment';
    }
}

/// Considers the file 'src/moment.js' and any of the files in 'src/locale' to be external
/// to the current module.
function externalMomentAndLocales(id) {
    if (id === path.resolve('src/moment.js')) {
        return 'moment';
    }
    if (path.dirname(id) === path.resolve('src/locale')) {
        var name = localeName(id);
        return 'moment.locale.' + name;
    }
}

/// Invoke the rollup process with some standard options
///
/// The following assumptions are made:
/// - Every file imported from the entry file (except possibly the entry file itself)
///   will be a resolved path under either 'src' or 'node_modules'
///
/// Options:
///    - entry: string
///      The source file to build.
///    - name: string
///      The name of the object which can be used to access the exports module when it is included as a global.
///    - external: (path: string) => string | void.
///      Given a path to a file, return the global object used to access
///      the module's exports.
///      Note: The path may not match the import as it appears in code,
///            e.g. import './path/to/file' may be requested as either '/path/to/file.js' or '/path/to/file/index.js'
///            depending on where the import was actually resolved by the node resolution algorithm.
///
function rollupBundle(entry, options) {
    return rollup({
        entry: entry,
        //plugins: [babel({})],
        external: options && options.external
    }).then(function (bundle) {
        return bundle.generate({
            format: 'umd',
            moduleName: options && options.name,
            globals: options && options.external
        });
    }).then(function (result) { return result.code; });
}

module.exports = {
    rollupBundle: rollupBundle,
    externalMoment: externalMoment,
    externalMomentAndLocales: externalMomentAndLocales,
    localeName: localeName
};


