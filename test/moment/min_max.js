var moment = require('../../moment');

exports.minMax = {
    setUp : function (cb) {
        moment.locale('en');
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    'min' : function (test) {
        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

        test.equal(moment.min(now, future, past), past, 'min(now, future, past)');
        test.equal(moment.min(future, now, past), past, 'min(future, now, past)');
        test.equal(moment.min(future, past, now), past, 'min(future, past, now)');
        test.equal(moment.min(past, future, now), past, 'min(past, future, now)');
        test.equal(moment.min(now, past), past, 'min(now, past)');
        test.equal(moment.min(past, now), past, 'min(past, now)');
        test.equal(moment.min(now), now, 'min(now, past)');

        test.equal(moment.min([now, future, past]), past, 'min([now, future, past])');
        test.equal(moment.min([now, past]), past, 'min(now, past)');
        test.equal(moment.min([now]), now, 'min(now)');

        test.done();
    },

    'max' : function (test) {
        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

        test.equal(moment.max(now, future, past), future, 'max(now, future, past)');
        test.equal(moment.max(future, now, past), future, 'max(future, now, past)');
        test.equal(moment.max(future, past, now), future, 'max(future, past, now)');
        test.equal(moment.max(past, future, now), future, 'max(past, future, now)');
        test.equal(moment.max(now, past), now, 'max(now, past)');
        test.equal(moment.max(past, now), now, 'max(past, now)');
        test.equal(moment.max(now), now, 'max(now, past)');

        test.equal(moment.max([now, future, past]), future, 'max([now, future, past])');
        test.equal(moment.max([now, past]), now, 'max(now, past)');
        test.equal(moment.max([now]), now, 'max(now)');

        test.done();
    }

};
