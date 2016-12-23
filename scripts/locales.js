var fs = require('fs'),
    path = require('path'),
    https = require('https');

var localeDir = path.join('src', 'locale');

var args = process.argv.slice(2);

function help() {
    console.log(process.argv[1], '[list|mention|find-commenters] ARGS');
    console.log();
    console.log('    list      show all authors in all locales');
    console.log('    mention   show all authors in all locales, ready to copy-paste in github issue');
    console.log('    find-commenters #ID  finds all people that participated in a github conversation');
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
        console.log('- [ ]', localeCode, authors[localeCode].map(function (author) { return '@' + author; }).join(' '));
    });
}

function findCommenters(postId) {

    function fetchComments(page, callback) {
        var options = {
                hostname: 'api.github.com',
                port: 443,
                path: '/repos/moment/moment/issues/' + postId + '/comments?page=' + page,
                method: 'GET',
                headers: {
                    'User-Agent': 'node script'
                }
            },
            links = {};
        console.log('fetching', options.path);
        https.get(options, function (res) {
            if ('link' in res.headers) {
                res.headers.link.split(', ').forEach(function(linkStr) {
                    var pieces = linkStr.split('; ');
                    var key = pieces[1].split('=')[1];
                    var link = pieces[0];
                    key = key.substr(1, key.length - 2);
                    link = link.substr(1, link.length - 2);
                    links[key] = link;
                });
            }
            var bodyChunks = [], body;
            res.on('data', function (chunk) {
                bodyChunks.push(chunk);
            });
            res.on('end', function () {
                body = bodyChunks.join('');
                callback(page, JSON.parse(body), links);
            });
        });
    }

    var commenters = {};
    var maxPage = 1;
    fetchComments(1, function (page, body, links) {
        handleBody(body, page);
        if ('last' in links) {
            maxPage = parseInt(links.last.split('=')[1], 10);
        }
        var pagesLeft = maxPage - 1;
        for (var p = 2; p <= maxPage; p += 1) {
            fetchComments(p, function (page, body, links) {
                handleBody(body, page);
                pagesLeft -= 1;
                if (pagesLeft === 0) {
                    handleCommenters(Object.keys(commenters));
                }
            });
        }
    });

    function handleBody(body, page) {
        body.forEach(function (comment) {
            console.log(page, comment.user.login);
            commenters[comment.user.login] = 1;
        });
    }

    function handleCommenters(commenters) {
        console.log('len of commenters', commenters.length);
        console.log(commenters);
    }
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
    case 'find-commenters':
        findCommenters(args[1]);
        break;
    default:
        console.log('unknown argument', args[0]);
        break;
}
