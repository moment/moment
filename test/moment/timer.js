var moment = require("../../moment");

var mockTick = function (test) {
    var count = 0;
    return function () {
        test.strictEqual(this.count(), ++count, "timer.count() must === number of times timer.tick() called");
        test.ok(moment().diff(this.tickTime(0)) >= -this.threshold(), "timer.tick() must be called at most timer.threshold() in advance");
        if (count === this.repeat()) { test.done(); } // won't happen if this.repeat() === true
    };
};
var testsPerTick = 2;

var mockDuration = moment.duration(5);
var mockRepeat = 8;
var mockThreshold = moment.duration(2);
var mockAggression = 2;

var mockEventuallyBrokenStart = function (timer, test) {
    var oldStart = timer.start;
    timer.start = function () {
        try {
            return oldStart.apply(this, arguments);
        } catch (e) {
            test.ok(e instanceof TypeError, "non-TypeError thrown");
            test.done();
        }
    };
    return timer;
};
var eventuallyBrokenStartTests = 1;

exports.timer = {
    "empty instantiation" : function (test) {
        var timer = moment.timer();

        test.expect(6);
        test.strictEqual(timer.tick(), undefined, "timer.tick() must be === undefined");
        test.strictEqual(timer.duration(), undefined, "timer.duration() must be === undefined");
        test.strictEqual(timer.repeat(), 1, "timer.repeat() must be === 1");
        test.ok(timer.threshold().isSame(1), "timer.threshold() must be === moment.duration(1)");
        test.strictEqual(timer.aggression(), 1.1, "timer.aggression() must be === 1.1");
        test.throws(timer.start.bind(timer), TypeError, "timer with no duration must not start");
        test.done();
    },

    "empty object instantiation" : function (test) {
        var timer = moment.timer({});

        test.expect(6);
        test.strictEqual(timer.tick(), undefined, "timer.tick() must be === undefined");
        test.strictEqual(timer.duration(), undefined, "timer.duration() must be === undefined");
        test.strictEqual(timer.repeat(), 1, "timer.repeat() must be === 1");
        test.ok(timer.threshold().isSame(1), "timer.threshold() must be === moment.duration(1)");
        test.strictEqual(timer.aggression(), 1.1, "timer.aggression() must be === 1.1");
        test.throws(timer.start.bind(timer), TypeError, "timer with no duration must not start");
        test.done();
    },

    "arguments instantiation with only a duration" : function (test) {
        var timer = moment.timer(mockDuration);

        test.expect(2 + eventuallyBrokenStartTests);
        test.strictEqual(timer.tick(), undefined, "timer.tick() must be === undefined");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        mockEventuallyBrokenStart(timer, test).start(); // calls test.done
    },

    "arguments instantiation with only ms" : function (test) {
        var timer = moment.timer(+mockDuration);

        test.expect(2 + eventuallyBrokenStartTests);
        test.strictEqual(timer.tick(), undefined, "timer.tick() must be === undefined");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        mockEventuallyBrokenStart(timer, test).start(); // calls test.done
    },

    "arguments instantiation with only a duration and bogus tick (faux repeat)" : function (test) {
        var timer = moment.timer(mockDuration, mockRepeat);

        test.expect(3 + eventuallyBrokenStartTests);
        test.strictEqual(timer.tick(), mockRepeat, "timer.tick() must be === passed tick (bogus)");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        test.strictEqual(timer.repeat(), 1, "timer.repeat() must be === 1");
        mockEventuallyBrokenStart(timer, test).start(); // calls test.done
    },

    "arguments instantiation with no repeat" : function (test) {
        var tick = mockTick(test), // calls test.done
            timer = moment.timer(mockDuration, tick);

        test.expect(3 + timer.repeat() * testsPerTick);
        test.strictEqual(timer.tick(), tick, "timer.tick() must be === passed tick");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        test.strictEqual(timer.repeat(), 1, "timer.repeat() must be 1");
        timer.start();
    },

    "arguments instantiation with integer repeat" : function (test) {
        var currentTick = mockTick(test), // calls test.done
            timer = moment.timer(mockDuration, mockRepeat, currentTick);

        test.expect(3 + timer.repeat() * testsPerTick);
        test.strictEqual(timer.tick(), currentTick, "timer.tick() must be === passed tick");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        test.strictEqual(timer.repeat(), mockRepeat, "timer.repeat() must be === passed repeat");
        timer.start();
    },

    "arguments instantiation with repeat = true" : function (test) {
        var currentTick = mockTick(test),
            timer = moment.timer(mockDuration, true, currentTick),
            repeat = mockRepeat;

        test.expect(3 + repeat * testsPerTick);
        test.strictEqual(timer.tick(), currentTick, "timer.tick() must be === passed tick");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        test.strictEqual(timer.repeat(), true, "timer.repeat() must be === true");

        timer.start();
        setTimeout(function () {
            timer.stop();
            test.done();
        }, mockDuration * (repeat + 0.5));
    },

    "object instantiation with all properties" : function (test) {
        var currentTick = mockTick(test), // calls test.done
            timer = moment.timer({
                tick: currentTick,
                duration: mockDuration,
                repeat: mockRepeat,
                threshold: mockThreshold,
                aggression: mockAggression
            });

        test.expect(5 + timer.repeat() * testsPerTick);
        test.strictEqual(timer.tick(), currentTick, "timer.tick() must be === passed tick");
        test.ok(timer.duration().isSame(mockDuration), "timer.duration() must be === moment.duration(passed duration)");
        test.strictEqual(timer.repeat(), mockRepeat, "timer.repeat() must be === passed repeat");
        test.ok(timer.threshold().isSame(mockThreshold), "timer.threshold() must be === moment.duration(passed threshold)");
        test.strictEqual(timer.aggression(), mockAggression, "timer.aggression() must be === passed aggression");
        timer.start();
    },

    "isTimer" : function (test) {
        test.expect(4);
        test.ok(moment.isTimer(moment.timer()), "correctly says true");
        test.ok(!moment.isTimer(moment()), "moment object is not a timer");
        test.ok(!moment.isTimer(moment.duration(12345678)), "duration object is not a timer");
        test.ok(!moment.isTimer({tick: mockTick(test), duration: mockDuration, repeat: mockRepeat}), "plain object is not a timer");
        test.done();
    }
};
