var moment = require("../../moment");

exports.getters_setters = {
    "getters" : function(test) {
        test.expect(8);

        var a = moment([2011, 9, 12, 6, 7, 8, 9]);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');
        test.done();
    },

    "setters" : function(test) {
        test.expect(8);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(9);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');
        test.done();
    },

    "setters - falsey values" : function(test) {
        test.expect(1);

        var a = moment();
        // ensure minutes wasn't coincidentally 0 already
        a.minutes(1);
        a.minutes(0);
        test.equal(a.minutes(), 0, 'falsey value');
        test.done();
    },

    "chaining setters" : function(test) {
        test.expect(7);

        var a = moment();
        a.year(2011)
         .month(9)
         .date(12)
         .hours(6)
         .minutes(7)
         .seconds(8);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.done();
    },

    "day setter" : function(test) {
        test.expect(18);

        var a = moment([2011, 0, 15]);
        test.equal(moment(a).day(0).date(), 9, 'set from saturday to sunday');
        test.equal(moment(a).day(6).date(), 15, 'set from saturday to saturday');
        test.equal(moment(a).day(3).date(), 12, 'set from saturday to wednesday');

        a = moment([2011, 0, 9]);
        test.equal(moment(a).day(0).date(), 9, 'set from sunday to sunday');
        test.equal(moment(a).day(6).date(), 15, 'set from sunday to saturday');
        test.equal(moment(a).day(3).date(), 12, 'set from sunday to wednesday');

        a = moment([2011, 0, 12]);
        test.equal(moment(a).day(0).date(), 9, 'set from wednesday to sunday');
        test.equal(moment(a).day(6).date(), 15, 'set from wednesday to saturday');
        test.equal(moment(a).day(3).date(), 12, 'set from wednesday to wednesday');

        test.equal(moment(a).day(-7).date(), 2, 'set from wednesday to last sunday');
        test.equal(moment(a).day(-1).date(), 8, 'set from wednesday to last saturday');
        test.equal(moment(a).day(-4).date(), 5, 'set from wednesday to last wednesday');

        test.equal(moment(a).day(7).date(), 16, 'set from wednesday to next sunday');
        test.equal(moment(a).day(13).date(), 22, 'set from wednesday to next saturday');
        test.equal(moment(a).day(10).date(), 19, 'set from wednesday to next wednesday');

        test.equal(moment(a).day(14).date(), 23, 'set from wednesday to second next sunday');
        test.equal(moment(a).day(20).date(), 29, 'set from wednesday to second next saturday');
        test.equal(moment(a).day(17).date(), 26, 'set from wednesday to second next wednesday');
        test.done();
    }
};
