var moment = require("../../moment");

exports.getters_setters = {
    "getters" : function (test) {
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

    "getters programmatic" : function (test) {
        var a = moment([2011, 9, 12, 6, 7, 8, 9]);
        test.equal(a.get('year'), 2011, 'year');
        test.equal(a.get('month'), 9, 'month');
        test.equal(a.get('date'), 12, 'date');
        test.equal(a.get('day'), 3, 'day');
        test.equal(a.get('hour'), 6, 'hour');
        test.equal(a.get('minute'), 7, 'minute');
        test.equal(a.get('second'), 8, 'second');
        test.equal(a.get('milliseconds'), 9, 'milliseconds');

        //actual getters tested elsewhere
        test.equal(a.get('weekday'), a.weekday(), 'weekday');
        test.equal(a.get('isoWeekday'), a.isoWeekday(), 'isoWeekday');
        test.equal(a.get('week'), a.week(), 'week');
        test.equal(a.get('isoWeek'), a.isoWeek(), 'isoWeek');
        test.equal(a.get('dayOfYear'), a.dayOfYear(), 'dayOfYear');
        test.done();
    },

    "setters plural" : function (test) {
        test.expect(8);

        var a = moment();
        a.years(2011);
        a.months(9);
        a.dates(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(9);
        test.equal(a.years(), 2011, 'years');
        test.equal(a.months(), 9, 'months');
        test.equal(a.dates(), 12, 'dates');
        test.equal(a.days(), 3, 'days');
        test.equal(a.hours(), 6, 'hours');
        test.equal(a.minutes(), 7, 'minutes');
        test.equal(a.seconds(), 8, 'seconds');
        test.equal(a.milliseconds(), 9, 'milliseconds');
        test.done();
    },

    "setters singular" : function (test) {
        test.expect(8);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hour(6);
        a.minute(7);
        a.second(8);
        a.millisecond(9);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hour(), 6, 'hour');
        test.equal(a.minute(), 7, 'minute');
        test.equal(a.second(), 8, 'second');
        test.equal(a.millisecond(), 9, 'milliseconds');
        test.done();
    },

    "setters" : function (test) {
        test.expect(9);

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

        // Test month() behavior. See https://github.com/timrwood/moment/pull/822
        a = moment('20130531', 'YYYYMMDD');
        a.month(3);
        test.equal(a.month(), 3, 'month edge case');

        test.done();
    },

    "setter programmatic" : function (test) {
        var a = moment();
        a.set('year', 2011);
        a.set('month', 9);
        a.set('date', 12);
        a.set('hours', 6);
        a.set('minutes', 7);
        a.set('seconds', 8);
        a.set('milliseconds', 9);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');

        // Test month() behavior. See https://github.com/timrwood/moment/pull/822
        a = moment('20130531', 'YYYYMMDD');
        a.month(3);
        test.equal(a.month(), 3, 'month edge case');

        test.done();
    },

    "setters programatic with weeks" : function (test) {
        var a = moment();
        a.set('weekYear', 2001);
        a.set('week', 49);
        a.set('day', 4);
        test.equals(a.weekYear(), 2001);
        test.equals(a.week(), 49);
        test.equals(a.day(), 4);

        a.set('weekday', 1);
        test.equals(a.weekday(), 1);

        test.done();
    },

    "setters programatic with weeks ISO" : function (test) {
        var a = moment();
        a.set('isoWeekYear', 2001);
        a.set('isoWeek', 49);
        a.set('isoWeekday', 4);

        test.equals(a.weekYear(), 2001);
        test.equals(a.week(), 49);
        test.equals(a.day(), 4);

        test.done();
    },

    "setters strings" : function (test) {
        test.expect(7);

        var a = moment([2012]).lang('en');
        test.equal(a.clone().day(0).day('Wednesday').day(), 3, 'day full name');
        test.equal(a.clone().day(0).day('Wed').day(), 3, 'day short name');
        test.equal(a.clone().day(0).day('We').day(), 3, 'day minimal name');
        test.equal(a.clone().day(0).day('invalid').day(), 0, 'invalid day name');
        test.equal(a.clone().month(0).month('April').month(), 3, 'month full name');
        test.equal(a.clone().month(0).month('Apr').month(), 3, 'month short name');
        test.equal(a.clone().month(0).month('invalid').month(), 0, 'invalid month name');
        test.done();
    },

    "setters - falsey values" : function (test) {
        test.expect(1);

        var a = moment();
        // ensure minutes wasn't coincidentally 0 already
        a.minutes(1);
        a.minutes(0);
        test.equal(a.minutes(), 0, 'falsey value');
        test.done();
    },

    "chaining setters" : function (test) {
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

    "day setter" : function (test) {
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
