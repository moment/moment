const rollup = require('rollup').rollup;
const babel  = require('rollup-plugin-babel');

module.exports = {
  TMP_DIR: 'build/tmp',

  rollupBundle: function ({entry, umdName, external, globals}) {
    console.log('globals', globals);
    return rollup({
          entry: entry,
          //plugins: [babel({})],
          external: external,
          globals: globals
      }).then((bundle) => bundle.generate({
          format: 'umd',
          moduleName: umdName != null ? umdName : 'not_used'
      })).then(({code, map}) => code);
  }

};


