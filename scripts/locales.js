var fs = require('fs'),
    path = require('path');

var localeDir = path.join('src', 'locale');

var args = process.argv.slice(2);

function help() {
    console.log(process.argv[1], '[list]');
    console.log();
    console.log("    list      show all authors in all locales");
    console.log("    mention   show all authors in all locales, ready to copy-paste in github issue");
}

function extract() {
    var authors = {};
    fs.readdirSync(localeDir).forEach(function (locale) {
        var content = fs.readFileSync(path.join(localeDir, locale), {encoding: 'utf-8'}),
            localeCode = locale.split('.')[0],
            localeAuthors = [];
        content.split('\n').forEach(function (line) {
            var match = line.match(/^\/\/! author.*github[.]com\/(.*)$/);
            if (match !== null) {
                // console.log("  ", line);
                localeAuthors.push(match[1]);
            }
        });
        if (localeAuthors.length === 0) {
            // use to debug
            content.split('\n').forEach(function (line) {
                var match = line.match(/^\/\/! author(.*)$/);
                if (match !== null) {
                    // console.log("  ", line);
                    localeAuthors.push('---' + match[1]);
                }
            });
            console.log(localeCode, localeAuthors);
        } else {
            authors[localeCode] = localeAuthors;
        }
    });
    return authors;
}

function list() {
    var authors = extract();
    Object.keys(authors).forEach(function (localeCode) {
        console.log(localeCode, authors[localeCode]);
    });
}

function mention() {
    var authors = extract();
    Object.keys(authors).forEach(function (localeCode) {
        console.log('- [ ]', localeCode, authors[localeCode].map(function (author) { return "@" + author; }).join(" "));
    });
}

if (args.length === 0) {
    help();
    process.exit(0);
}

switch (args[0]) {
    case 'list':
        list();
        break;
    case 'mention':
        mention();
        break;
    default:
        console.log("unknown argument", args[0]);
        break;
}
