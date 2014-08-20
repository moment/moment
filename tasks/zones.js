var fs = require('fs');


module.exports = function (grunt) {
    var ZONE_TAB = '/usr/share/zoneinfo/zone.tab';

    grunt.registerTask('zones', 'Run the unit tests in different timezones.', function () {
        var done = this.async();

        getAllTimezones(function (err, zones) {
            if (err != null) {
                throw err;
            }
            (function iterator(i) {
                if (i >= zones.length) {
                    return done();
                }
                runTestsInZone(zones[i], function (err) {
                    if (err != null) {
                        throw err;
                    }
                    iterator(i+1);
                });
            }(0));
        });
    });

    function getAllTimezones (callback) {
        fs.readFile(ZONE_TAB, 'ascii', function (err, content) {
            if (err != null) {
                callback(err);
            }
            callback(null, content.split(/\r\n|\r|\n/)
                // remove empty and commented lines
                .filter(function (line) { return line && !/^#/.test(line); })
                // country code TAB coordinates TAB timezone
                .map(function (line) { return line.split('\t')[2]; }));
        });
    };

    function runTestsInZone (zone, next) {
        grunt.log.ok('Running tests in zone ' + zone);
        grunt.util.spawn({
            cmd: 'grunt',
            opts: { env: {
                'PATH': process.env.PATH,
                'TZ': zone
            } },
            args: ['--no-color', 'nodeunit']
        }, function (err, result, code) {
            if (code !== 0) {
                grunt.log.error(result.stdout.split(/\r\n|\r|\n/)
                    .filter(function (line) { return /^(>>|Warning:|$)/.test(line) })
                    .map(function (line) { return (line.substr(0, 3) === '>> ' ? line.substr(3) : line); })
                    .join('\n'));
            }
            next();
        });
    };
};
