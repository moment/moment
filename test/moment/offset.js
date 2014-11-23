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
    }
};
