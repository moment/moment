const {rollup} = require('rollup');
const path = require('path');

//const babel  = require('rollup-plugin-babel');

module.exports = {
    localeName(localeFile) {
        return path.basename(localeFile).match(/([-a-z]+).js/)[1];
    },

    rollupBundle: function ({entry, name, resolve}) {
        return rollup({
            entry: entry,
            //plugins: [babel({})],
            external: (id) => !!resolve(id)
        }).then(function (bundle) {
            return bundle.generate({
                format: 'umd',
                moduleName: name != null ? name: 'not_used',
                globals: resolve
            });
        }).then(({code, map}) => code);
    }
};


