const fs = require('fs');

const version = process.argv[2];

if (!/^\d+\.\d+\.\d+$/.test(version || '')) {
    throw new Error('Usage: pnpm release:bump-version 1.2.3');
}

function replace(file, pattern, replacement) {
    const source = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, source.replace(pattern, replacement));
}

function updateJson(file) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    json.version = version;
    fs.writeFileSync(file, JSON.stringify(json, null, 4) + '\n');
}

replace('src/moment.js', /\/\/! version : .*/, '//! version : ' + version);
replace(
    'src/moment.js',
    /moment\.version = '.*'/,
    "moment.version = '" + version + "'"
);

['package.json', 'component.json'].forEach(updateJson);
replace('meteor/package.js', /version: .*/, "version: '" + version + "',");
