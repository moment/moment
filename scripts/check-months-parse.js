const fs = require('fs');

const counts = new Set(
    fs.readdirSync('src/locale').map(function (file) {
        const source = fs.readFileSync('src/locale/' + file, 'utf8');
        return (source.match(/monthsParse:/gi) || []).length;
    })
);

if (counts.size !== 2 || !counts.has(0) || !counts.has(3)) {
    throw new Error(
        'Months parse issue: each locale must have all three monthsParse settings or none'
    );
}
