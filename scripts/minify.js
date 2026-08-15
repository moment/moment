const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const files = {
    'min/moment-with-locales.min.js': 'min/moment-with-locales.js',
    'min/locales.min.js': 'min/locales.js',
    'min/moment.min.js': 'moment.js',
};

Object.keys(files).forEach(function (target) {
    const source = files[target];
    const result = UglifyJS.minify(
        {
            [path.relative(path.dirname(target), source)]: fs.readFileSync(
                source,
                'utf8'
            ),
        },
        {
            compress: { dead_code: false },
            mangle: true,
            output: {
                ascii_only: true,
                comments: /^!|@preserve|@license|@cc_on/i,
            },
            sourceMap: {
                filename: path.basename(target),
                url: path.basename(target) + '.map',
            },
        }
    );

    if (result.error) {
        throw result.error;
    }
    fs.writeFileSync(target, result.code);
    fs.writeFileSync(target + '.map', result.map);
    console.log(target);
});
