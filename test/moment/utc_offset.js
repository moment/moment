/*global require, exports */

var moment = require('../../moment');

exports.offset = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'setter / getter blackbox' : function (test) {
        var m = moment([2010]);

        test.equal(m.clone().utcOffset(0).utcOffset(), 0, 'utcOffset 0');

        test.equal(m.clone().utcOffset(1).utcOffset(), 60, 'utcOffset 1 is 60');
        test.equal(m.clone().utcOffset(60).utcOffset(), 60, 'utcOffset 60');
        test.equal(m.clone().utcOffset('+01:00').utcOffset(), 60, 'utcOffset +01:00 is 60');
        test.equal(m.clone().utcOffset('+0100').utcOffset(), 60, 'utcOffset +0100 is 60');

        test.equal(m.clone().utcOffset(-1).utcOffset(), -60, 'utcOffset -1 is -60');
        test.equal(m.clone().utcOffset(-60).utcOffset(), -60, 'utcOffset -60');
        test.equal(m.clone().utcOffset('-01:00').utcOffset(), -60, 'utcOffset -01:00 is -60');
        test.equal(m.clone().utcOffset('-0100').utcOffset(), -60, 'utcOffset -0100 is -60');

        test.equal(m.clone().utcOffset(1.5).utcOffset(), 90, 'utcOffset 1.5 is 90');
        test.equal(m.clone().utcOffset(90).utcOffset(), 90, 'utcOffset 1.5 is 90');
        test.equal(m.clone().utcOffset('+01:30').utcOffset(), 90, 'utcOffset +01:30 is 90');
        test.equal(m.clone().utcOffset('+0130').utcOffset(), 90, 'utcOffset +0130 is 90');

        test.equal(m.clone().utcOffset(-1.5).utcOffset(), -90, 'utcOffset -1.5');
        test.equal(m.clone().utcOffset(-90).utcOffset(), -90, 'utcOffset -90');
        test.equal(m.clone().utcOffset('-01:30').utcOffset(), -90, 'utcOffset +01:30 is 90');
        test.equal(m.clone().utcOffset('-0130').utcOffset(), -90, 'utcOffset +0130 is 90');

        test.done();
    },

    'isLocal, isUtc, isUtcOffset' : function (test) {
        test.ok(moment().isLocal(), 'moment() creates objects in local time');
        test.ok(!moment.utc().isLocal(), 'moment.utc creates objects NOT in local time');
        test.ok(moment.utc().local().isLocal(), 'moment.fn.local() converts to local time');
        test.ok(!moment().utcOffset(5).isLocal(), 'moment.fn.utcOffset(N) puts objects NOT in local time');
        test.ok(moment().utcOffset(5).local().isLocal(), 'moment.fn.local() converts to local time');

        test.ok(moment.utc().isUtc(), 'moment.utc() creates objects in utc time');
        test.ok(moment().utcOffset(0).isUtc(), 'utcOffset(0) is equivalent to utc mode');
        test.ok(!moment().utcOffset(1).isUtc(), 'utcOffset(1) is NOT equivalent to utc mode');

        test.ok(!moment().isUtcOffset(), 'moment() creates objects NOT in utc-offset mode');
        test.ok(moment.utc().isUtcOffset(), 'moment.utc() creates objects in utc-offset mode');
        test.ok(moment().utcOffset(3).isUtcOffset(), 'utcOffset(N != 0) creates objects in utc-offset mode');
        test.ok(moment().utcOffset(0).isUtcOffset(), 'utcOffset(0) creates objects in utc-offset mode');

        test.done();
    },

    'isUTC' : function (test) {
        test.ok(moment.utc().isUTC(), 'moment.utc() creates objects in utc time');
        test.ok(moment().utcOffset(0).isUTC(), 'utcOffset(0) is equivalent to utc mode');
        test.ok(!moment().utcOffset(1).isUTC(), 'utcOffset(1) is NOT equivalent to utc mode');

        test.done();
    }
};
