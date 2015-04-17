var https = require('https'),
    zlib = require('zlib'),
    path = require('path'),
    fs = require('fs');

var count = 0;
var resolved = 0;

var outputs = [];

var done;

function check() {
    if (resolved === count) {
        normalize();
        display();
    }
}

function makeBar(length) {
    var i = '';
    while (i.length < length) {
        i += '=';
    }
    return i;
}

function normalize() {
    var i,
        max = 0,
        max2 = 0;
    for (i = 0; i < count; i++) {
        max = Math.max(max, outputs[i].gzip);
        max2 = Math.max(max2, outputs[i].original);
    }
    for (i = 0; i < count; i++) {
        outputs[i].bargraph = makeBar((outputs[i].gzip / max) * 80);
        outputs[i].bargraph2 = makeBar((outputs[i].original / max2) * 80);
    }
}

function display() {
    var i;
    for (i = 0; i < count; i++) {
        console.log(outputs[i].version + ' ' + outputs[i].gzip + ' ' + outputs[i].original);
        console.log('gzip ' + outputs[i].bargraph);
        console.log('orig ' + outputs[i].bargraph2);
    }
    done();
}

function getSizeAtVersion(version, path) {
    var data = '',
        op = {},

        req = https.request({
        host: 'raw.github.com',
        port: 443,
        path: '/timrwood/moment/' + version + path
    }, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function (e) {
            zlib.gzip(data, function (error, result) {
                op.version = version;
                op.gzip = result.length;
                op.original = data.length;
                resolved++;
                check();
            });
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
    count++;
    outputs.push(op);
}

function getRemote() {
    var oldVersions = '1.0.1 1.1.0 1.1.1 1.1.2 1.2.0 1.3.0 1.4.0'.split(' '),
        newVersions = '1.5.0 1.5.1 1.6.0 1.6.1 1.7.0 1.7.1'.split(' '),
        i;

    for (i = 0; i < oldVersions.length; i++) {
        getSizeAtVersion(oldVersions[i], '/moment.min.js');
    }
    for (i = 0; i < newVersions.length; i++) {
        getSizeAtVersion(newVersions[i], '/min/moment.min.js');
    }
}

function getLocal() {
    count++;
    var op = {};
    outputs.push(op);
    fs.readFile(path.normalize(__dirname + '/../min/moment.min.js'), 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        zlib.gzip(data, function (error, result) {
            op.version = '.next';
            op.gzip = result.length;
            op.original = data.length;
            resolved++;
            check();
        });
    });
}



module.exports = function (grunt) {
    grunt.registerTask('history', 'Check the codebase filesize over different releases.', function () {
        done = this.async();
        getRemote();
        getLocal();
    });
};
