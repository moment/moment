const fs = require('fs');
const path = require('path');

function copy(source, target) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
}

function copyDirectory(source, target) {
    fs.cpSync(source, target, { recursive: true });
}

copy('build/umd/moment.js', 'moment.js');
copyDirectory('build/umd/locale', 'locale');
copy('build/umd/min/locales.js', 'min/locales.js');
copy('build/umd/min/moment-with-locales.js', 'min/moment-with-locales.js');
copy('build/esm/moment.js', 'dist/moment.js');
copyDirectory('src/locale', 'dist/locale');
