var moment = require("../../moment");

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
        test.expect(8);

        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month'),
            eps = 10;

        // we use Math.abs(a.diff(b)) < eps to prevent issues where
        // two moments are off by a millisecond.

        test.ok(Math.abs(past.min(now).diff(now)) < eps,        "A past date with the minimum of now should be now");
        test.ok(Math.abs(past.min().diff(now)) < eps,           "A past date with the minimum of implied now should be now");
        test.ok(Math.abs(past.min(future).diff(future)) < eps,  "A past date with the minimum of the future should be the future date");

        test.ok(Math.abs(future.min(now).diff(future)) < eps,   "A future date with the minimum of now should be the future");
        test.ok(Math.abs(future.min().diff(future)) < eps,      "A future date with the minimum of implied now should be the future");
        test.ok(Math.abs(future.min(past).diff(future)) < eps,  "A future date with the minimum of the past should be the future");

        test.ok(Math.abs(now.min(past).diff(now)) < eps,        "Now with the minimum of the past should be now");
        test.ok(Math.abs(now.min(future).diff(future)) < eps,   "Now with the minimum of the future should be the future");

        test.done();
    },

    "max" : function (test) {
        test.expect(8);

        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month'),
            eps = 10;

        // we use Math.abs(a.diff(b)) < eps to prevent issues where
        // two moments are off by a millisecond.

        test.ok(Math.abs(past.max(now).diff(past)) < eps,    "A past date with the maximum of now should be the past");
        test.ok(Math.abs(past.max().diff(past)) < eps,       "A past date with the maximum of implied now should be the past");
        test.ok(Math.abs(past.max(future).diff(past)) < eps, "A past date with the maximum of the future should be the past");

        test.ok(Math.abs(future.max(now).diff(now)) < eps,   "A future date with the maximum of now should be now");
        test.ok(Math.abs(future.max().diff(now)) < eps,      "A future date with the maximum of implied now should be now");
        test.ok(Math.abs(future.max(past).diff(past)) < eps, "A future date with the maximum of the past should be the past");

        test.ok(Math.abs(now.max(past).diff(past)) < eps,    "Now with the maximum of the past should be the past");
        test.ok(Math.abs(now.max(future).diff(now)) < eps,   "Now with the maximum of the future should be now");

        test.done();
    }

};
