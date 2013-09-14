var moment = require("../../moment");

var equalMoment = function (test, a, b, msg) {
    test.equal(a.valueOf(), b.valueOf(), msg);
};

exports.min_max = {
    setUp : function (cb) {
        moment.lang('en');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "min" : function (test) {
        test.expect(6);

        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

        equalMoment(test, past.min(now), now,       "A past date with the minimum of now should be now");
        equalMoment(test, past.min(future), future, "A past date with the minimum of the future should be the future date");

        equalMoment(test, future.min(now), future,  "A future date with the minimum of now should be the future");
        equalMoment(test, future.min(past), future, "A future date with the minimum of the past should be the future");

        equalMoment(test, now.min(past), now,       "Now with the minimum of the past should be now");
        equalMoment(test, now.min(future), future,  "Now with the minimum of the future should be the future");

        test.done();
    },

    "max" : function (test) {
        test.expect(6);

        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

        equalMoment(test, past.max(now), past,    "A past date with the maximum of now should be the past");
        equalMoment(test, past.max(future), past, "A past date with the maximum of the future should be the past");

        equalMoment(test, future.max(now), now,   "A future date with the maximum of now should be now");
        equalMoment(test, future.max(past), past, "A future date with the maximum of the past should be the past");

        equalMoment(test, now.max(past), past,    "Now with the maximum of the past should be the past");
        equalMoment(test, now.max(future), now,   "Now with the maximum of the future should be now");

        test.done();
    }

};
