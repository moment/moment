var path = require('path'),
    nodeunit = require('nodeunit'),
    moment = require('../moment');


module.exports = function (grunt) {
    // placeholder for an array of timezones
    var ALL_ZONES,
        INITIAL_ZONE,

        done;

    /******************************
        Grunt task
    ******************************/

    grunt.registerTask('zones', 'Run the unit tests in different timezones.', function () {
        done = this.async();
        getCurrentTimezone(function (zone) {
            // save the initial timezone so we dont break our computers
            INITIAL_ZONE = zone;
            getAllTimezones(function (zones) {
                // store all the timezones
                ALL_ZONES = zones;
                // start running the tests
                nextTest(function () {
                    // reset the timezone like nothing ever happened
                    resetTimezone();
                });
            });
        });
    });

    /******************************
        Timezones
    ******************************/

    function resetTimezone() {
        setTimezone(INITIAL_ZONE, function () {
            grunt.log.writeln("Resetting timezone back to " + INITIAL_ZONE);
            done();
        });
    }

    function getCurrentTimezone(cb) {
        grunt.util.spawn({
            cmd: "systemsetup",
            args: ["gettimezone"]
        }, function (err, result, code) {
            cb(result.stdout.replace('Time Zone: ', ''));
        });
    }

    function getAllTimezones(cb) {
        grunt.util.spawn({
            cmd: "systemsetup",
            args: ["listtimezones"]
        }, function (err, result, code) {
            var zones = result.stdout.replace('Time Zones:', '');
            zones = zones.match(/\S+/g);
            cb(zones);
        });
    }

    function setTimezone(zone, cb) {
        grunt.util.spawn({
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
        grunt.util.spawn({
            cmd: "grunt",
            args: ["zone"]
        }, function (err, result, code) {
            if (err) {
                resetTimezone();
                throw err;
            }
            console.log(result.stdout);
            cb();
        });
    }
};
