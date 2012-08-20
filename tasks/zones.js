var terminal = require('child_process').spawn('bash'),
    path = require('path'),
    util = require('util'),
    nodeunit = require('nodeunit');


module.exports = function (grunt) {
    // placeholder for an array of timezones
    var ALL_ZONES,
        INITIAL_ZONE,

        failedZones = [],
        failedTests = [],

        logTableWidths = [4, 0, 12, 12],

        failedZoneCount = 0,
        passedZoneCount = 0;

    /******************************
        Grunt task
    ******************************/

    grunt.registerTask('zones', 'Run the unit tests in different timezones.', function () {
        var done = this.async();
        getCurrentTimezone(function (zone) {
            // save the initial timezone so we dont break our computers
            INITIAL_ZONE = zone;
            getAllTimezones(function (zones) {
                // store all the timezones
                ALL_ZONES = zones;
                setupLoggingTable();

                // start running the tests
                nextTest(function () {
                    // log the total output
                    logFinalOutput();

                    // reset the timezone like nothing ever happened
                    setTimezone(INITIAL_ZONE, function () {
                        done();
                    });
                });
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

    function getAllTimezones(cb) {
        grunt.utils.spawn({
            cmd: "systemsetup",
            args: ["listtimezones"]
        }, function (err, result, code) {
            var zones = result.stdout.replace('Time Zones:', '');
            zones = zones.match(/\S+/g);
            cb(zones);
        });
    }

    function setTimezone(zone, cb) {
        grunt.utils.spawn({
            cmd: "systemsetup",
            args: ["settimezone", zone]
        }, function (err, result, code) {
            cb();
        });
    }

    /******************************
        Tests
    ******************************/

    function nextTest(cb) {
        var zone = ALL_ZONES.pop();
        if (zone) {
            setTimezone(zone, function () {
                testZone(zone, function () {
                    nextTest(cb);
                });
            });
        } else {
            cb();
        }
    }

    function testZone(zone, cb) {
        nodeunit.runFiles([path.join(process.cwd(), "test/moment")], {
            testDone: function (name, assertions) {
                if (assertions.failures()) {
                    logFailedTest(zone, name, assertions);
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
        grunt.log.writetableln(logTableWidths, ['', 'Zone', 'Pass', 'Fail']);
    }

    function logFailedTest(zone, name, assertions) {
        grunt.log.error('\nFAILURE: ' + name);
        assertions.forEach(function (a) {
            if (a.failed()) {
                if (a.error && a.message) {
                    grunt.log.error('Assertion Message: ' + a.message);
                }
                grunt.log.error(a.error.stack);
            }
        });
    }

    function logZone(zone, assertions) {
        var failed = assertions.failures(),
            passed = assertions.length - failed,
            status = failed ? "XX".red : "OK".green,
            passMsg = passed + ' passed',
            failMsg = failed ? (failed + ' failed').red : failed + ' failed';

        grunt.log.writetableln(logTableWidths, [status, zone, passMsg, failMsg]);

        if (failed) {
            failedZoneCount++;
        } else {
            passedZoneCount++;
        }
    }

    function logFinalOutput() {

    }
};