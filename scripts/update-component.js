const fs = require('fs');
const { format, resolveConfig } = require('prettier');

async function updateComponent() {
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

    const prettierConfig = (await resolveConfig('component.json')) || {};
    fs.writeFileSync(
        'component.json',
        await format(JSON.stringify(config), {
            ...prettierConfig,
            parser: 'json',
            tabWidth: 4,
        })
    );
}

updateComponent().catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
