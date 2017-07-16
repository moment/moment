const {rollup} = require('rollup');
const path = require('path');

//const babel  = require('build-plugin-babel');

function localeName(localeFile) {
    return path.basename(localeFile).match(/([-a-z]+)\.js/)[1];
}


/// When this is active, consider:
/// - imports of 'src/moment' to represent the 'moment' library
/// - imports of 'src/locale/<name>' to represent the library 'moment.locale.<name>'
/// If this file is included as a global, the locale is then accessible via moment.locale['<name>']
function externalMomentAndLocales(id) {
    if (id === path.resolve('src/moment.js')) {
        return 'moment';
    }
    if (path.dirname(id) === path.resolve('src/locale')) {
        let name = localeName(id);
        return `moment.locale.${name}`;
    }
    return null;
}

function rollupBundle({entry, name, external}) {
    return rollup({
        entry: entry,
        //plugins: [babel({})],
        external: (id) => !!external(id)
    }).then(function (bundle) {
        return bundle.generate({
            format: 'umd',
            moduleName: name != null ? name: 'not_used',
            globals: external
        });
    }).then(({code, map}) => code);
}

module.exports = {
    rollupBundle,
    externalMomentAndLocales,
    localeName
};


