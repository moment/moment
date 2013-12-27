var moment = require("../../moment");

function equal(test, a, b, message) {
    test.ok(Math.abs(a - b) < 0.00000001, "(" + a + " === " + b + ") " + message);
}

function dstForYear(year) {
    var start = moment([year]),
        end = moment([year + 1]),
        current = start.clone(),
        last;

    while (current < end) {
        last = current.clone();
        current.add(24, 'hour');
        if (last.zone() !== current.zone()) {
            end = current.clone();
            current = last.clone();
            break;
        }
    }

    while (current < end) {
        last = current.clone();
        current.add(1, 'hour');
        if (last.zone() !== current.zone()) {
            return {
                moment : last,
                diff : (current.zone() - last.zone()) / 60
            };
        }
    }
}

exports.diff = {
    "diff" : function (test) {
        test.expect(5);

        test.equal(moment(1000).diff(0), 1000, "1 second - 0 = 1000");
        test.equal(moment(1000).diff(500), 500, "1 second - 0.5 seconds = 500");
        test.equal(moment(0).diff(1000), -1000, "0 - 1 second = -1000");
        test.equal(moment(new Date(1000)).diff(1000), 0, "1 second - 1 second = 0");
        var oneHourDate = new Date(),
            nowDate = new Date(+oneHourDate);
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        test.equal(moment(oneHourDate).diff(nowDate), 60 * 60 * 1000, "1 hour from now = 3600000");
        test.done();
    },

    "diff key after" : function (test) {
        test.expect(10);

        test.equal(moment([2010]).diff([2011], 'years'), -1, "year diff");
        test.equal(moment([2010]).diff([2010, 2], 'months'), -2, "month diff");
        test.equal(moment([2010]).diff([2010, 0, 7], 'weeks'), 0, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 8], 'weeks'), -1, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 21], 'weeks'), -2, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 22], 'weeks'), -3, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 4], 'days'), -3, "day diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, "hour diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, "minute diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, "second diff");
        test.done();
    },

    "diff key before" : function (test) {
        test.expect(10);

        test.equal(moment([2011]).diff([2010], 'years'), 1, "year diff");
        test.equal(moment([2010, 2]).diff([2010], 'months'), 2, "month diff");
        test.equal(moment([2010, 0, 4]).diff([2010], 'days'), 3, "day diff");
        test.equal(moment([2010, 0, 7]).diff([2010], 'weeks'), 0, "week diff");
        test.equal(moment([2010, 0, 8]).diff([2010], 'weeks'), 1, "week diff");
        test.equal(moment([2010, 0, 21]).diff([2010], 'weeks'), 2, "week diff");
        test.equal(moment([2010, 0, 22]).diff([2010], 'weeks'), 3, "week diff");
        test.equal(moment([2010, 0, 1, 4]).diff([2010], 'hours'), 4, "hour diff");
        test.equal(moment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'), 5, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'), 6, "second diff");
        test.done();
    },

    "diff key before singular" : function (test) {
        test.expect(10);

        test.equal(moment([2011]).diff([2010], 'year'), 1, "year diff singular");
        test.equal(moment([2010, 2]).diff([2010], 'month'), 2, "month diff singular");
        test.equal(moment([2010, 0, 4]).diff([2010], 'day'), 3, "day diff singular");
        test.equal(moment([2010, 0, 7]).diff([2010], 'week'), 0, "week diff singular");
        test.equal(moment([2010, 0, 8]).diff([2010], 'week'), 1, "week diff singular");
        test.equal(moment([2010, 0, 21]).diff([2010], 'week'), 2, "week diff singular");
        test.equal(moment([2010, 0, 22]).diff([2010], 'week'), 3, "week diff singular");
        test.equal(moment([2010, 0, 1, 4]).diff([2010], 'hour'), 4, "hour diff singular");
        test.equal(moment([2010, 0, 1, 0, 5]).diff([2010], 'minute'), 5, "minute diff singular");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'second'), 6, "second diff singular");
        test.done();
    },

    "diff key before abbreviated" : function (test) {
        test.expect(10);

        test.equal(moment([2011]).diff([2010], 'y'), 1, "year diff abbreviated");
        test.equal(moment([2010, 2]).diff([2010], 'M'), 2, "month diff abbreviated");
        test.equal(moment([2010, 0, 4]).diff([2010], 'd'), 3, "day diff abbreviated");
        test.equal(moment([2010, 0, 7]).diff([2010], 'w'), 0, "week diff abbreviated");
        test.equal(moment([2010, 0, 8]).diff([2010], 'w'), 1, "week diff abbreviated");
        test.equal(moment([2010, 0, 21]).diff([2010], 'w'), 2, "week diff abbreviated");
        test.equal(moment([2010, 0, 22]).diff([2010], 'w'), 3, "week diff abbreviated");
        test.equal(moment([2010, 0, 1, 4]).diff([2010], 'h'), 4, "hour diff abbreviated");
        test.equal(moment([2010, 0, 1, 0, 5]).diff([2010], 'm'), 5, "minute diff abbreviated");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 's'), 6, "second diff abbreviated");
        test.done();
    },

    "diff month" : function (test) {
        test.expect(1);

        test.equal(moment([2011, 0, 31]).diff([2011, 2, 1], 'months'), -1, "month diff");
        test.done();
    },

    "diff across DST" : function (test) {
        var dst = dstForYear(2012), a, b, daysInMonth;
        if (!dst) {
            test.done();
            return;
        }

        test.expect(16);

        a = dst.moment;
        b = a.clone().utc().add(12, 'hours').local();
        daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;
        equal(test, b.diff(a, 'ms', true), 12 * 60 * 60 * 1000,                         "ms diff across DST");
        equal(test, b.diff(a, 's', true),  12 * 60 * 60,                                "second diff across DST");
        equal(test, b.diff(a, 'm', true),  12 * 60,                                     "minute diff across DST");
        equal(test, b.diff(a, 'h', true),  12,                                          "hour diff across DST");
        equal(test, b.diff(a, 'd', true),  (12 - dst.diff) / 24,                        "day diff across DST");
        equal(test, b.diff(a, 'w', true),  (12 - dst.diff) / 24 / 7,                    "week diff across DST");
        equal(test, b.diff(a, 'M', true),  (12 - dst.diff) / 24 / daysInMonth,          "month diff across DST");
        equal(test, b.diff(a, 'y', true),  (12 - dst.diff) / 24 / daysInMonth / 12,     "year diff across DST");


        a = dst.moment;
        b = a.clone().utc().add(12 + dst.diff, 'hours').local();
        daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;

        equal(test, b.diff(a, 'ms', true), (12 + dst.diff) * 60 * 60 * 1000,   "ms diff across DST");
        equal(test, b.diff(a, 's', true),  (12 + dst.diff) * 60 * 60,          "second diff across DST");
        equal(test, b.diff(a, 'm', true),  (12 + dst.diff) * 60,               "minute diff across DST");
        equal(test, b.diff(a, 'h', true),  (12 + dst.diff),                    "hour diff across DST");
        equal(test, b.diff(a, 'd', true),  12 / 24,                            "day diff across DST");
        equal(test, b.diff(a, 'w', true),  12 / 24 / 7,                        "week diff across DST");
        equal(test, b.diff(a, 'M', true),  12 / 24 / daysInMonth,              "month diff across DST");
        equal(test, b.diff(a, 'y', true),  12 / 24 / daysInMonth / 12,         "year diff across DST");

        test.done();
    },

    "diff overflow" : function (test) {
        test.expect(4);

        test.equal(moment([2011]).diff([2010], 'months'), 12, "month diff");
        test.equal(moment([2010, 0, 2]).diff([2010], 'hours'), 24, "hour diff");
        test.equal(moment([2010, 0, 1, 2]).diff([2010], 'minutes'), 120, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'), 240, "second diff");
        test.done();
    },

    "diff between utc and local" : function (test) {
        test.expect(7);

        test.equal(moment([2012]).utc().diff([2011], 'years'), 1, "year diff");
        test.equal(moment([2010, 2, 2]).utc().diff([2010, 0, 2], 'months'), 2, "month diff");
        test.equal(moment([2010, 0, 4]).utc().diff([2010], 'days'), 3, "day diff");
        test.equal(moment([2010, 0, 22]).utc().diff([2010], 'weeks'), 3, "week diff");
        test.equal(moment([2010, 0, 1, 4]).utc().diff([2010], 'hours'), 4, "hour diff");
        test.equal(moment([2010, 0, 1, 0, 5]).utc().diff([2010], 'minutes'), 5, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).utc().diff([2010], 'seconds'), 6, "second diff");

        test.done();
    },

    "diff floored" : function (test) {
        test.expect(7);

        test.equal(moment([2010, 0, 1, 23]).diff([2010], 'day'), 0, "23 hours = 0 days");
        test.equal(moment([2010, 0, 1, 23, 59]).diff([2010], 'day'), 0, "23:59 hours = 0 days");
        test.equal(moment([2010, 0, 1, 24]).diff([2010], 'day'), 1, "24 hours = 1 day");
        test.equal(moment([2010, 0, 2]).diff([2011, 0, 1], 'year'), 0, "year rounded down");
        test.equal(moment([2011, 0, 1]).diff([2010, 0, 2], 'year'), 0, "year rounded down");
        test.equal(moment([2010, 0, 2]).diff([2011, 0, 2], 'year'), -1, "year rounded down");
        test.equal(moment([2011, 0, 2]).diff([2010, 0, 2], 'year'), 1, "year rounded down");

        test.done();
    },

    "year diffs include dates" : function (test) {
        test.expect(1);

        test.ok(moment([2012, 1, 19]).diff(moment([2002, 1, 20]), 'years', true) < 10, "year diff should include date of month");

        test.done();
    },

    "month diffs" : function (test) {
        test.expect(8);

        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        equal(test, moment([2012, 0, 1]).diff([2012, 1, 1], 'months', true), -1, 'Jan 1 to Feb 1 should be 1 month');
        equal(test, moment([2012, 0, 1]).diff([2012, 0, 1, 12], 'months', true), -0.5 / 31, 'Jan 1 to Jan 1 noon should be 0.5 / 31 months');
        equal(test, moment([2012, 0, 15]).diff([2012, 1, 15], 'months', true), -1, 'Jan 15 to Feb 15 should be 1 month');
        equal(test, moment([2012, 0, 28]).diff([2012, 1, 28], 'months', true), -1, 'Jan 28 to Feb 28 should be 1 month');
        equal(test, moment([2012, 0, 31]).diff([2012, 1, 29], 'months', true), -1 + (2 / 30), 'Jan 31 to Feb 29 should be 1 - (2 / 30) months');
        equal(test, moment([2012, 0, 31]).diff([2012, 2, 1], 'months', true), -2 + (30 / 31), 'Jan 31 to Mar 1 should be 2 - (30 / 31) months');
        equal(test, moment([2012, 0, 31]).diff([2012, 2, 1, 12], 'months', true), -2 + (29.5 / 31), 'Jan 31 to Mar 1 should be 2 - (29.5 / 31) months');
        equal(test, moment([2012, 0, 1]).diff([2012, 0, 31], 'months', true), -(30 / 31), 'Jan 1 to Jan 31 should be 30 / 31 months');

        test.done();
    },

    "year diffs" : function (test) {
        test.expect(10);

        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        equal(test, moment([2012, 0, 1]).diff([2013, 0, 1], 'years', true), -1, 'Jan 1 2012 to Jan 1 2013 should be 1 year');
        equal(test, moment([2012, 1, 28]).diff([2013, 1, 28], 'years', true), -1, 'Feb 28 2012 to Feb 28 2013 should be 1 year');
        equal(test, moment([2012, 2, 1]).diff([2013, 2, 1], 'years', true), -1, 'Mar 1 2012 to Mar 1 2013 should be 1 year');
        equal(test, moment([2012, 11, 1]).diff([2013, 11, 1], 'years', true), -1, 'Dec 1 2012 to Dec 1 2013 should be 1 year');
        equal(test, moment([2012, 11, 31]).diff([2013, 11, 31], 'years', true), -1, 'Dec 31 2012 to Dec 31 2013 should be 1 year');
        equal(test, moment([2012, 0, 1]).diff([2013, 6, 1], 'years', true), -1.5, 'Jan 1 2012 to Jul 1 2013 should be 1.5 years');
        equal(test, moment([2012, 0, 31]).diff([2013, 6, 31], 'years', true), -1.5, 'Jan 31 2012 to Jul 31 2013 should be 1.5 years');
        equal(test, moment([2012, 0, 1]).diff([2013, 0, 1, 12], 'years', true), -1 - (0.5 / 31) / 12, 'Jan 1 2012 to Jan 1 2013 noon should be 1+(0.5 / 31) / 12 years');
        equal(test, moment([2012, 0, 1]).diff([2013, 6, 1, 12], 'years', true), -1.5 - (0.5 / 31) / 12, 'Jan 1 2012 to Jul 1 2013 noon should be 1.5+(0.5 / 31) / 12 years');
        equal(test, moment([2012, 1, 29]).diff([2013, 1, 28], 'years', true), -1 + (1 / 28.5) / 12, 'Feb 29 2012 to Feb 28 2013 should be 1-(1 / 28.5) / 12 years');

        test.done();
    }
};
