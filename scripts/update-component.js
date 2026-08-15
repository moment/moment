const fs = require('fs');

const config = JSON.parse(fs.readFileSync('component.json', 'utf8'));

config.files = fs
    .readdirSync('locale')
    .filter(function (file) {
        return file.endsWith('.js');
    })
    .sort()
    .map(function (file) {
        return 'locale/' + file;
    });
config.files.unshift('moment.js');

fs.writeFileSync('component.json', JSON.stringify(config, null, 4) + '\n');
