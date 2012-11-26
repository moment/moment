var path = require('path'),
    nodeunit = require('nodeunit'),
    moment = require('../moment');


module.exports = function (grunt) {
    // placeholder for an array of timezones
    var ALL_ZONES,
        INITIAL_ZONE,

        failedZones = [],
        failedTests = [],

        logTableWidths = [4, 6, 46, 12, 12],

        failedZoneCount = 0,
        passedZoneCount = 0;

    /******************************
        Grunt task
    ******************************/

    grunt.registerTask('zone', 'Run the unit tests in the current timezone.', function () {
        var done = this.async();
        getCurrentTimezone(function (zone) {
            testZone(zone, function() {
                logFinalOutput();
                done();
            });
        });
    });

    /******************************
        Timezones
    ******************************/

    function getCurrentTimezone(cb) {
        grunt.utils.spawn({
            cmd: "systemsetup",
            args: ["gettimezone"]
        }, function (err, result, code) {
            cb(result.stdout.replace('Time Zone: ', ''));
        });
    }

    /******************************
        Tests
    ******************************/

    function testZone(zone, cb) {
        nodeunit.runFiles([path.join(process.cwd(), "test/moment"), path.join(process.cwd(), "test/lang")], {
            testDone: function (name, assertions) {
                if (assertions.failures()) {
                    failedTests.push([zone, name, assertions]);
                }
            },
            done: function (assertions) {
                logZone(zone, assertions);
                cb();
            }
        });
    }

    /******************************
        Logging
    ******************************/

    function setupLoggingTable() {
        var i,
            longestZone = 0;
        for (i = 0; i < ALL_ZONES.length; i++) {
            longestZone = Math.max(longestZone, ALL_ZONES[i].length + 2);
        }
        logTableWidths[1] = longestZone;
        grunt.log.writetableln(logTableWidths, ['', 'Zone', 'Offset', 'Pass', 'Fail']);
    }

    function logFailedTest(zone, name, assertions) {
        grunt.log.writeln("");
        grunt.log.error(zone + ' failed: ' + name);
        assertions.forEach(function (a) {
            var e = a.error;
            if (a.failed()) {
                if (a.message) {
                    grunt.log.error(a.message);
                }
                if (e && e.actual && e.expected && e.operator) {
                    grunt.log.error([e.actual, e.operator, e.expected].join(' '));
                }
            }
        });
    }

    function logZone(zone, assertions) {
        var failed = assertions.failures(),
            passed = assertions.length - failed,
            status = failed ? "XX".red : "OK".green,
            passMsg = passed + ' passed',
            failMsg = failed ? (failed + ' failed').red : failed + ' failed',
            offset = "" + (-moment().zone() / 60);

        grunt.log.writetableln(logTableWidths, [status, offset, zone, passMsg, failMsg]);

        if (failed) {
            failedZoneCount++;
        } else {
            passedZoneCount++;
        }
    }

    function logFinalOutput() {
        var i;

        if (!failedZoneCount) {
            return;
        }

        grunt.log.writeln(failedZoneCount + " failures");
        for (i = 0; i < failedTests.length; i++) {
            logFailedTest.apply(null, failedTests[i]);
        }
    }
};
